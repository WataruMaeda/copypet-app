import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import { Button } from 'components/Button'
import Error from 'components/Error'
import { styler, colors } from 'styles'
import { path } from 'utils/const'
import { validate, tests } from 'utils/vali'
import Connector from 'utils/connector'

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
    color: colors.black,
  },
  resetPasswordContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 10,
  },
  resetPasswordLink: {
    fontSize: 14,
  },
  loginButton: {
    height: 50,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 45,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1) !important',
  },
  underline: {
    borderBottom: `1px solid ${colors.gray}`,
    width: '100%',
    marginBottom: 40,
  },
  noAccountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 12,
  },
  signupLink: {
    fontSize: 14,
  },
})

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    resErr: '',
    isLoading: false,
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

  handleLogin = async () => {
    try {
      // validation
      const { isError, errors } = validate(this.state, tests)
      this.setState({ errors })
      if (isError) return

      // props
      const { history, actions } = this.props
      const { email, password } = this.state

      // start
      this.setState({ isLoading: true })

      // login
      const user = await actions.login(email, password)
      if (user.emailVerified) {
        history.push(path.profile)
      } else {
        this.setState({ isOpen: true, user, isLoading: false })
      }
    } catch (err) {
      this.setState({ resErr: err.message, isLoading: false })
    }
  }

  render() {
    const { email, password, errors, resErr, isLoading } = this.state
    return (
      <div className={styles.root}>
        <Error label={resErr} />
        <h1 className={styles.title}>ログイン</h1>
        <Input
          label="メールアドレス"
          name="email"
          value={email}
          placeholder="hello@example.com"
          onChange={this.handleInputChange}
          error={errors.email}
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
          value={password}
          placeholder="8文字以上の英数字"
          onChange={this.handleInputChange}
          error={errors.email}
        />
        <div className={styles.resetPasswordContainer}>
          <Link to={path.resetPassword} className={styles.resetPasswordLink}>
            パスワードリセット
          </Link>
        </div>
        <Button
          label="ログイン"
          className={`btn-yellow ${styles.loginButton}`}
          onClick={this.handleLogin}
          loaderColor="white"
          isLoading={isLoading}
        />
        <div className={styles.underline} />
        <div className={styles.noAccountContainer}>
          <p className={styles.noAccountText}>アカウントをお持ちでない方</p>
          <Link to={path.signup} className={styles.signupLink}>
            サインアップ
          </Link>
        </div>
      </div>
    )
  }
}

const ConnectedLogin = props => (
  <Connector>
    {({ actions }) => <Login actions={actions.app} {...props} />}
  </Connector>
)

Login.propTypes = {}

Login.defaultProps = {}

export default ConnectedLogin
