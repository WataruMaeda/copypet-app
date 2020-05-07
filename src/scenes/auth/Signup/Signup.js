import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    color: colors.darkGray,
  },
  signupButton: {
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
  resetPasswordContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  noAccountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 12,
  },
  resetPasswordLink: {
    fontSize: 14,
  },
})

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
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

  handleSignIn = async () => {
    try {
      // validation
      const { isError, errors } = validate(this.state, tests)
      this.setState({ errors })
      if (isError) return

      // password validation
      const { email, password, confirmPassword } = this.state
      if (password !== confirmPassword) {
        this.setState({
          errors: {
            ...errors,
            password: 'パスワードが一致しません',
            confirmPassword: 'パスワードが一致しません',
          },
        })
        return
      }

      // start
      this.setState({ isLoading: true })
      const { history, actions } = this.props

      // signup
      const user = await actions.signup(email, password)
      if (user.emailVerified) {
        history.push(path.profile)
      } else {
        this.setState({ isLoading: false })
        history.push(path.confirmEmail)
      }
    } catch (err) {
      this.setState({ resErr: err.message, isLoading: false })
    }
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      errors,
      resErr,
      isLoading,
    } = this.state
    return (
      <div className={styles.root}>
        <Error label={resErr} />
        <h1 className={styles.title}>サインアップ</h1>
        <Input
          label="メールアドレス"
          name="email"
          value={email}
          placeholder="hello@example.com"
          error={errors.email}
          onChange={this.handleInputChange}
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
          value={password}
          placeholder="パスワード"
          error={errors.password}
          onChange={this.handleInputChange}
        />
        <Input
          label="パスワード(確認)"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="パスワード"
          error={errors.confirmPassword}
          onChange={this.handleInputChange}
        />
        <div className={styles.resetPasswordContainer}>
          <p className={styles.forgotPasswordText}>パスワードをお忘の方</p>
          <Link to={path.resetPassword} className={styles.resetPasswordLink}>
            パスワードリセット
          </Link>
        </div>
        <Button
          label="サインアップ"
          className={`btn-yellow ${styles.signupButton}`}
          onClick={this.handleSignIn}
          isLoading={isLoading}
        />
        <div className={styles.underline} />
        <div className={styles.noAccountContainer}>
          <p className={styles.forgotPasswordText}>アカウントをお持ちの方</p>
          <Link to={path.login} className={styles.resetPasswordLink}>
            ログイン
          </Link>
        </div>
      </div>
    )
  }
}

const ConnectedSignup = props => (
  <Connector>
    {({ actions }) => <Signup actions={actions.app} {...props} />}
  </Connector>
)

Signup.propTypes = {
  actions: PropTypes.shape({}),
}

Signup.defaultProps = {
  actions: {},
}

export default ConnectedSignup
