import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconButton } from 'components/Button'
import { styler, images, colors, breakpoints } from 'styles'
import { path } from 'utils/const'

import Login from './Login'
import Signup from './Signup'
import ResetPassword from './ResetPassword'
import ConfirmEmail from './ConfirmEmail'
import SetProfile from './SetProfile'

const styles = styler({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: '25px 30px',
    background: 'white',
    [breakpoints.phone]: {
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: colors.yellow,
    fontWeight: 'normal',
  },
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    maxWidth: 1000,
    padding: '20px 60px',
    [breakpoints.phone]: {
      padding: 20,
    },
  },
  promptContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '40%',
    zIndex: 2,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  promptContentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 35px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    background: 'white',
    marginTop: 60,
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    width: '100%',
    textAlign: 'left',
    color: colors.black,
    marginBottom: 40,
  },
  promptDesc: {
    fontSize: 14,
    width: '100%',
    marginBottom: 50,
    lineHeight: 1.71,
  },
  serviceButton: {
    width: 164,
    borderRadius: '20px !important',
    borderWidth: '2px !important',
    height: 40,
    fontSize: '14px !important',
  },
  shadow: {
    position: 'absolute',
    background: colors.lightBlueGray,
    width: '60%',
    height: 400,
    top: 140,
    left: 100,
    [breakpoints.phone]: {
      left: 0,
      top: 70,
      width: '100%',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '60%',
    marginLeft: 40,
    zIndex: 2,
    [breakpoints.phone]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  howToButtonContainer: {
    display: 'none',
    [breakpoints.phone]: {
      display: 'flex',
      position: 'relative',
      marginBottom: 104,
    },
  },
  birdImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 44,
    height: 37,
    objectFit: 'contain',
  },
  howToButton: {
    position: 'absolute',
    top: 23,
    right: 10,
    height: 44,
    width: 142,
  },
  formContentsContainer: {
    width: '100%',
    background: 'white',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    border: `1px solid ${colors.lightGray}`,
  },
})

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
}

const variants = {
  exit: { y: '50%', opacity: 0, transition },
  enter: {
    y: '0%',
    opacity: 1,
    transition,
  },
}

const delayVariants = {
  exit: { y: 100, opacity: 0, transition },
  enter: { y: 0, opacity: 1, transition: { delay: 1, ...transition } },
}

const Auth = ({ history }) => {
  const renderTop = () => (
    <div className={styles.top}>
      <div className={styles.logoContainer}>
        <img src={images.logo} className={styles.logo} alt="logo" />
        <h1 className={styles.title}>
          コピペ
          <span style={{ color: colors.darkGray, fontWeight: 'normal' }}>
            っと
          </span>
        </h1>
      </div>
    </div>
  )

  const renderPrompt = () => {
    const isProfile = window.location.href.includes('profile')
    return (
      <motion.div variants={variants} className={styles.promptContainer}>
        <div className={styles.promptContentsContainer}>
          <h2 className={styles.promptTitle}>
            {isProfile ? 'あと一歩です🐥' : 'さあ、始めよう。'}
          </h2>
          <p className={styles.promptDesc}>
            {isProfile
              ? 'プロフィールを設定が終わると、すべての機能をご利用いただけます。'
              : 'コピペっとは完全無料。普段使用している定型文をスニペット化して、作業を効率化しましょう。'}
          </p>
          {!isProfile && (
            <IconButton
              icon="long-arrow-alt-left"
              label="サービスの特徴"
              className={`btn-yellow-outline ${styles.serviceButton}`}
              onClick={() => history.push('/')}
            />
          )}
        </div>
      </motion.div>
    )
  }

  const renderForm = () => {
    return (
      <motion.div variants={delayVariants} className={styles.formContainer}>
        <div className={styles.howToButtonContainer}>
          <img src={images.birdFly} alt="" className={styles.birdImage} />
          <IconButton
            label="使い方"
            icon="long-arrow-alt-right"
            iconPosition="right"
            className={`btn-yellow-outline ${styles.howToButton}`}
            onClick={() => history.push('/')}
          />
        </div>
        <div className={styles.formContentsContainer}>
          <Route path={path.login} component={Login} />
          <Route path={path.signup} component={Signup} />
          <Route path={path.resetPassword} component={ResetPassword} />
          <Route path={path.confirmEmail} component={ConfirmEmail} />
          <Route path={path.profile} component={SetProfile} />
        </div>
      </motion.div>
    )
  }

  return (
    <div className={styles.root}>
      {renderTop()}
      <motion.div
        className={styles.container}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {renderPrompt()}
        <motion.span variants={variants} className={styles.shadow} />
        {renderForm()}
      </motion.div>
    </div>
  )
}

Auth.propTypes = {
  history: PropTypes.shape({}),
}
Auth.defaultProps = {
  history: {},
}

export default Auth
