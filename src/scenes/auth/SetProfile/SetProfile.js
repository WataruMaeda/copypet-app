import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Input from 'components/Input'
import FilePicker from 'components/FilePicker'
import Error from 'components/Error'
import { Button } from 'components/Button'
import { styler, colors, images } from 'styles'
import { validate, tests } from 'utils/vali'
import Connector from 'utils/connector'
import { storage } from 'utils/firebase'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '50px 30px',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 50,
    textAlign: 'left',
    color: colors.darkGray,
  },
  registerButton: {
    height: 50,
    fontSize: 16,
    marginTop: 20,
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
})

const customTests = {
  userName: {
    test: tests.chars.test,
    error: '有効なユーザー名を入力してください。',
  },
}

class SetProfile extends Component {
  state = {
    file: null,
    userImage: images.profile,
    userName: '',
    errors: {},
    resErr: '',
    isLoading: false,
  }

  componentDidMount() {
    // set default image
    storage
      .child('default/profile.png')
      .getDownloadURL()
      .then(url => {
        this.setState({ userImage: url })
      })
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target
    const { errors } = this.state
    this.setState({
      [name]: value,
      resErr: '',
      errors: {
        ...errors,
        [name]: '',
      },
    })
  }

  handleRegister = async () => {
    // validation
    const { isError, errors } = validate(this.state, customTests)
    this.setState({ errors })
    if (isError) return

    // start update
    const { actions } = this.props
    const { userName, userImage } = this.state
    this.setState({ isLoading: true })

    // set tour
    actions.setTour(true)

    // update me
    try {
      await actions.updateMe(userName, userImage)
    } catch (err) {
      this.setState({ resErr: err.message, isLoading: false })
    }
  }

  render() {
    const { me } = this.props
    const { userName, userImage, errors, resErr, isLoading } = this.state
    if (!me || (me && !me.uid)) return <Redirect to="/" />

    return (
      <div className={styles.root}>
        <Error label={resErr} />
        <h1 className={styles.title}>プロフィール設定</h1>
        <div className={styles.avatarContainer}>
          <img
            src={
              typeof userImage === 'object'
                ? URL.createObjectURL(userImage)
                : userImage
            }
            className={styles.profile}
            alt="logo"
          />
          <FilePicker
            maxSize={500000}
            onSelect={f => this.setState({ userImage: f, resErr: null })}
            onError={() =>
              this.setState({
                resErr: 'Please select an image less than 500kb',
              })
            }
          >
            <p className={styles.changeAvatarText}>変更</p>
          </FilePicker>
        </div>
        <Input
          label="ユーザー名"
          name="userName"
          value={userName}
          placeholder="ユーザー名"
          onChange={this.handleInputChange}
          error={errors.userName}
        />
        <Button
          label="登録"
          className={`btn-yellow ${styles.registerButton}`}
          onClick={this.handleRegister}
          isLoading={isLoading}
        />
      </div>
    )
  }
}

const ConnectedSetProfile = props => (
  <Connector>
    {({
      actions,
      state: {
        app: { me },
      },
    }) => <SetProfile actions={actions.app} me={me} {...props} />}
  </Connector>
)

SetProfile.propTypes = {
  actions: PropTypes.func,
  me: PropTypes.shape({}),
}

SetProfile.defaultProps = {
  actions: () => {},
  me: {},
}

export default ConnectedSetProfile
