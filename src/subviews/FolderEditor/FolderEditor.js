import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'components/Modal'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Error from 'components/Error'
import { Button } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'
import { validate, tests } from 'utils/vali'
import Connector from 'utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '30px 40px',
    [breakpoints.phone]: {
      padding: '30px 15px',
    },
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: colors.black,
    fontWeight: 'normal',
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    height: 40,
    width: '48%',
  },
})

const customTests = {
  title: {
    test: tests.chars.test,
    error: 'フォルダ名を入力してください。',
  },
}

const defaultInputs = {
  title: '',
  desc: '',
}

const FolderEditor = ({
  actions,
  folder,
  isOpen,
  onComplete,
  toggleModal,
  style,
}) => {
  // state
  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [resErr, setResErr] = useState('')
  const [inputs, setInputs] = useState({
    ...defaultInputs,
  })

  // handler
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setInputs({ ...inputs, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }
  const handleSubmit = async () => {
    try {
      // validation
      const result = validate(inputs, customTests)
      setErrors(result.errors)
      if (result.isError) return

      setLoading(true)

      // edit/add folder -> select the created folder
      const newAll = folder
        ? await actions.editFolder({ ...folder, ...inputs })
        : await actions.addFolder(inputs)
      actions.setDefaultFolder(newAll)

      setLoading(false)
      if (!folder) setInputs({ ...defaultInputs })
      onComplete()
    } catch (err) {
      setResErr(err.message)
      setLoading(false)
    }
  }

  // lifecycle
  useEffect(() => {
    if (folder) setInputs({ title: folder.title, desc: folder.desc })
  }, [folder])

  return (
    <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={styles.root} style={style}>
        <Error label={resErr} />
        <h3 className={styles.title}>
          {folder ? 'フォルダ編集' : 'フォルダ追加'}
        </h3>
        <Input
          name="title"
          value={inputs.title}
          placeholder="タイトル"
          onChange={handleInputChange}
        />
        <Textarea
          name="desc"
          value={inputs.desc}
          placeholder="備考"
          rows={5}
          onChange={handleInputChange}
        />
        <div className={styles.buttonContainer}>
          <Button
            label={folder ? '更新' : '追加'}
            className={`btn-yellow ${styles.button}`}
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <Button
            label="キャンセル"
            className={`btn-black-outline ${styles.button}`}
            onClick={toggleModal}
            disabled={isLoading}
          />
        </div>
      </div>
    </Modal>
  )
}

FolderEditor.propTypes = {
  actions: PropTypes.shape({}),
  folder: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  onComplete: PropTypes.func,
  toggleModal: PropTypes.func,
  style: PropTypes.shape({}),
}

FolderEditor.defaultProps = {
  actions: {},
  folder: null,
  isOpen: false,
  onComplete: () => {},
  toggleModal: () => {},
  style: {},
}

export default props => (
  <Connector>
    {({ actions }) => (
      <FolderEditor
        actions={{ ...actions.data, ...actions.select }}
        {...props}
      />
    )}
  </Connector>
)
