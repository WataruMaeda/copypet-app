import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import Input from 'components/Input'
import Modal from 'components/Modal'
import Error from 'components/Error'
import { Button } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'
import { validate, tests } from 'utils/vali'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 30,
    [breakpoints.phone]: {
      padding: '30px 15px',
    },
  },
  title: {
    fontSize: 24,
    color: colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    marginBottom: 40,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 30,
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

const DeleteAccount = ({ actions, isOpen, toggleModal }) => {
  // state
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [resErr, setResErr] = useState('')
  const [isLoading, setLoading] = useState(false)

  // handler
  const handleInputChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value })
    setErrors({ ...errors, [name]: '' })
    setResErr('')
  }
  const handleDeleteAccount = async () => {
    // validation
    const result = validate(inputs, tests)
    setErrors(result.errors)
    if (result.isError) return

    try {
      setLoading(true)
      await actions.deleteMe(inputs.email, inputs.password)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setResErr(err.message)
    }
  }

  // rendering
  return (
    <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={styles.root}>
        <Error label={resErr} />
        <h3 className={styles.title}>アカウント削除</h3>
        <p className={styles.desc}>
          アカウントを削除するためパスワードを再入力してください。一度削除したアカウントは元に戻せません。
        </p>
        <div className={styles.body}>
          <Input
            label="メールアドレス"
            name="email"
            value={inputs.email}
            placeholder="hello@example.com"
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            label="パスワード"
            name="password"
            type="password"
            value={inputs.password}
            placeholder="8文字以上の英数字"
            onChange={handleInputChange}
            error={errors.email}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            label="削除"
            className={`btn-red ${styles.button}`}
            onClick={handleDeleteAccount}
            isLoading={isLoading}
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

DeleteAccount.propTypes = {
  actions: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
}

DeleteAccount.defaultProps = {
  actions: {},
  isOpen: false,
  toggleModal: () => {},
}

export default props => (
  <Connector>
    {({ actions }) => <DeleteAccount actions={actions.app} {...props} />}
  </Connector>
)
