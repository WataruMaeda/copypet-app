import React from 'react'
import PropTypes from 'prop-types'
import { styler } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  input: {
    flex: 1,
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    cursor: 'pointer',
  },
})

const compress = file =>
  new Promise((resolve, reject) => {
    const width = 400
    const height = 400
    const reader = new FileReader()
    reader.onload = event => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const cvs = document.createElement('canvas')
        cvs.width = width
        cvs.height = height
        const ctx = cvs.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        ctx.canvas.toBlob(
          blob => {
            const fileCompressed = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(fileCompressed)
          },
          'image/jpeg',
          1,
        )
      }
    }
    try {
      reader.readAsDataURL(file)
    } catch (err) {
      reject(err)
    }
  })

const FilePicker = ({ accept, children, maxSize, onSelect, onError }) => {
  // handler
  const handleSelect = async ({ target: { files } }) => {
    if (!files || (files && files.length === 0)) {
      onError('有効なプロフィール画像を選択してください。')
      return
    }
    if (!maxSize || typeof maxSize !== 'number') {
      onSelect(files[0])
      return
    }
    try {
      if (files[0].size > maxSize) {
        const file = await compress(files[0])
        onSelect(file)
        return
      }
      onSelect(files[0])
      return
    } catch (err) {
      onError(err.message)
    }
  }

  // rendering
  return (
    <div className={styles.root}>
      {children}
      <input
        type="file"
        accept={accept}
        className={styles.input}
        onChange={handleSelect}
      />
    </div>
  )
}

FilePicker.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.node,
  maxSize: PropTypes.number,
  onSelect: PropTypes.func,
  onError: PropTypes.func,
}

FilePicker.defaultProps = {
  accept: 'image/png, image/jpg, image/jpeg',
  children: null,
  maxSize: null,
  onSelect: () => {},
  onError: () => {},
}

export default FilePicker
