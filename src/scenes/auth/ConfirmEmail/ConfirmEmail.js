import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Button } from 'components/Button'
import Error from 'components/Error'
import { styler, colors } from 'styles'
import { path } from 'utils/const'
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
  desc: {
    fontSize: 16,
    lineHeight: 1.71,
    marginBottom: 20,
  },
  email: {
    margin: '0 3px',
  },
  confirmButton: {
    height: 50,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 45,
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
  resentButton: {
    fontSize: 14,
    color: colors.yellow,
  },
})

class ConfirmEmail extends Component {
  state = {
    resErr: '',
    isLoading: false,
    isSending: false,
  }

  componentDidMount() {
    // subscribe auth status
    const { actions } = this.props
    actions.authenticate()
  }

  handleConfirmEmail = async () => {
    this.setState({ isLoading: true })
    window.location.reload()
  }

  handleResendEmail = async () => {
    const { me } = this.props
    try {
      this.setState({ isSending: true })
      await me.sendEmailVerification()
      this.setState({ isSending: false })
    } catch (_) {
      this.setState({ isSending: false })
    }
  }

  render() {
    const { me } = this.props
    const { resErr, isLoading, isSending } = this.state

    if (!me) {
      return <Redirect to={path.login} />
    }

    if (me.emailVerified) {
      return <Redirect to={path.profile} />
    }

    return (
      <div className={styles.root}>
        <Error label={resErr} />
        <h1 className={styles.title}>メールアドレスの確認</h1>
        <p className={styles.desc}>
          <a
            href={`mailto:/${me.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.email}
          >
            {me.email}
          </a>
          宛に確認メールを送信しました。メール内のリンクをクリックし、登録を完了してください。
        </p>
        <Button
          label="確認"
          className={`btn-yellow ${styles.confirmButton}`}
          onClick={this.handleConfirmEmail}
          loaderColor="white"
          isLoading={isLoading}
        />
        <div className={styles.underline} />
        <div className={styles.noAccountContainer}>
          <p className={styles.noAccountText}>メールを受けとっていない方</p>
          <Button
            className={styles.resentButton}
            onClick={this.handleResendEmail}
            isLoading={isSending}
          >
            確認メールを再送信
          </Button>
        </div>
      </div>
    )
  }
}

const ConnectedConfirmEmail = props => (
  <Connector>
    {({
      actions,
      state: {
        app: { me },
      },
    }) => <ConfirmEmail actions={actions.app} me={me} {...props} />}
  </Connector>
)

ConfirmEmail.propTypes = {
  actions: PropTypes.shape({}),
  me: PropTypes.shape({}),
}

ConfirmEmail.defaultProps = {
  actions: {},
  me: {},
}

export default ConnectedConfirmEmail
