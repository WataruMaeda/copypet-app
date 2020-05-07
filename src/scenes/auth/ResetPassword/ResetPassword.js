import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Error from 'components/Error'
import InfoBox from 'components/InfoBox'
import { Button } from 'components/Button'
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
  resetButton: {
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
  hasAccountText: {
    fontSize: 12,
  },
  loginLink: {
    fontSize: 14,
  },
})

class ResetPassword extends Component {
  state = {
    email: '',
    errors: {},
    resErr: '',
    isLoading: false,
    isSent: false,
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

  handleSendResetPassword = async () => {
    // validation
    const { isError, errors } = validate(this.state, tests)
    this.setState({ errors })
    if (isError) return

    // props
    const { email } = this.state
    const { actions } = this.props

    this.setState({ isLoading: true })
    try {
      // actions
      actions.resetPassword(email)
      this.setState({ isLoading: false, isSent: true })
    } catch (err) {
      this.setState({ isLoading: false, resErr: err.message })
    }
  }

  render() {
    const { email, errors, resErr, isLoading, isSent } = this.state
    return (
      <div className={styles.root}>
        {isSent && (
          <InfoBox
            icon="paper-plane"
            label="パスワードの再設定メールを送信しました。"
          />
        )}
        <Error label={resErr} />
        <h1 className={styles.title}>リセットパスワード</h1>
        <Input
          label="メールアドレス"
          name="email"
          value={email}
          placeholder="hello@example.com"
          onChange={this.handleInputChange}
          error={errors.email}
        />
        <Button
          label="送信"
          className={`btn-yellow ${styles.resetButton}`}
          onClick={this.handleSendResetPassword}
          isLoading={isLoading}
        />
        <div className={styles.underline} />
        <div className={styles.noAccountContainer}>
          <p className={styles.hasAccountText}>アカウントをお持ちの方</p>
          <Link to={path.login} className={styles.loginLink}>
            ログイン
          </Link>
        </div>
      </div>
    )
  }
}

const ConnectedResetPassword = props => (
  <Connector>
    {({ actions }) => <ResetPassword actions={actions.app} {...props} />}
  </Connector>
)

ResetPassword.propTypes = {}

ResetPassword.defaultProps = {}

export default ConnectedResetPassword
