import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import Error from 'components/Error'
import Modal from 'components/Modal'
import FilePicker from 'components/FilePicker'
import Input from 'components/Input'
import { Button } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'
import { storage } from 'utils/firebase'
import { validate, tests } from 'utils/vali'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '30px 40px 60px',
    [breakpoints.phone]: {
      padding: '30px 15px',
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 50,
    textAlign: 'left',
    color: colors.darkGray,
    [breakpoints.phone]: {
      marginBottom: 30,
    },
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    border: `solid 1px ${colors.lightBlueGray}`,
    overflow: 'none',
    objectFit: 'cover',
    background: colors.lightBlueGray,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  changeAvatarText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.blue,
  },
  userName: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    height: 40,
    width: '48%',
  },
})

const customTests = {
  userName: {
    test: tests.name.test,
    error: '有効なユーザー名を入力してください。',
  },
}

const Profile = ({ actions, me, isOpen, toggleModal, className, style }) => {
  // state
  const [inputs, setInputs] = useState({
    file: null,
    userImage: '',
    userName: me.displayName,
  })
  const [errors, setErrors] = useState({})
  const [resErr, setResErr] = useState('')
  const [isLoading, setLoading] = useState(false)

  // handler
  const handleSetProfileImage = async () => {
    try {
      const url = await storage.child(me.photoURL).getDownloadURL()
      setInputs(prev => ({ ...prev, userImage: url }))
    } catch (err) {
      setResErr(err.message)
    }
  }
  const handleInputChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value })
    setErrors({ ...errors, [name]: '' })
    setResErr('')
  }

  const handleSubmit = async () => {
    // validation
    const result = validate(inputs, customTests)
    setErrors(result.errors)
    if (result.isError) return

    try {
      setLoading(true)
      await actions.updateMe(inputs.userName, inputs.file)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setResErr(err.message)
    }
  }

  // lifecycle
  useEffect(() => {
    handleSetProfileImage()
  }, [])

  // props
  const userImagePath = inputs.file
    ? URL.createObjectURL(inputs.file)
    : inputs.userImage

  // rendering
  return (
    <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={`${styles.root} ${className}`} style={style}>
        <Error label={resErr} />
        <h1 className={styles.title}>プロフィール</h1>
        <div className={styles.avatarContainer}>
          <img src={userImagePath} className={styles.profile} alt="avatar" />
          <FilePicker
            maxSize={500000}
            onError={e => setResErr(e)}
            onSelect={f =>
              handleInputChange({ target: { name: 'file', value: f } })
            }
          >
            <p className={styles.changeAvatarText}>変更</p>
          </FilePicker>
        </div>
        <Input
          label="ユーザー名"
          name="userName"
          value={inputs.userName}
          placeholder="ユーザー名"
          onChange={handleInputChange}
          className={styles.userName}
          error={errors.userName}
        />
        <div className={styles.buttonContainer}>
          <Button
            label="更新"
            className={`btn-yellow ${styles.button}`}
            onClick={handleSubmit}
            isLoading={isLoading}
            enabled={isLoading}
          />
          <Button
            label="キャンセル"
            className={`btn-black-outline ${styles.button}`}
            onClick={toggleModal}
            enabled={isLoading}
          />
        </div>
      </div>
    </Modal>
  )
}

Profile.propTypes = {
  actions: PropTypes.shape({}),
  me: PropTypes.shape({}),
  style: PropTypes.shape({}),
}

Profile.defaultProps = {
  actions: {},
  me: {},
  style: {},
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        app: { me },
      },
    }) => <Profile actions={actions.app} me={me} {...props} />}
  </Connector>
)
