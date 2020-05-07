import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'components/Modal'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import { Button } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'

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

const Inquiry = ({ isOpen, onComplete, toggleModal, style }) => {
  // state
  // const [isLoading, setLoading] = useState(false)
  const [isLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
  })

  // handler
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setInputs({ ...inputs, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSendMessage = () => {
    // TODO: send message logic here...

    onComplete()
  }

  return (
    <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={styles.root} style={style}>
        <h3 className={styles.title}>お問い合わせ</h3>
        <Input
          name="title"
          value={inputs.title}
          placeholder="タイトル"
          onChange={handleInputChange}
        />
        <Textarea
          name="desc"
          value={inputs.desc}
          placeholder="本文"
          rows={5}
          onChange={handleInputChange}
        />
        <div className={styles.buttonContainer}>
          <Button
            label="送信"
            className={`btn-yellow ${styles.button}`}
            onClick={handleSendMessage}
            isLoading={isLoading}
          />
          <Button
            label="キャンセル"
            className={`btn-black-outline ${styles.button}`}
            onClick={toggleModal}
          />
        </div>
      </div>
    </Modal>
  )
}

Inquiry.propTypes = {
  isOpen: PropTypes.bool,
  onComplete: PropTypes.func,
  toggleModal: PropTypes.func,
  style: PropTypes.shape({}),
}

Inquiry.defaultProps = {
  isOpen: false,
  onComplete: () => {},
  toggleModal: () => {},
  style: {},
}

export default Inquiry
