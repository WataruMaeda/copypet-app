import React from 'react'
import { PropTypes } from 'prop-types'
import { Button } from 'components/Button'
import { styler, images } from 'styles'
import Connector from 'utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '120px 40px',
  },
  logo: {
    width: 120,
    height: 120,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  desc: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 40,
  },
  button: {
    width: 192,
    height: 44,
  },
})

const Welcome = ({ actions, needTour }) => {
  if (!needTour) return null

  // handler
  const handleStart = () => {
    actions.setTour(false)
    actions.setOpenTour(true)
  }

  // rendering
  return (
    <div className={styles.root}>
      <img src={images.logo} alt="logo" className={styles.logo} />
      <h2 className={styles.title}>コピペっとへようこそ！</h2>
      <p className={styles.desc}>
        チュートリアルを確認して、使い方を学びましょう
      </p>
      <Button
        label="スタート"
        className={`btn-yellow ${styles.button}`}
        onClick={handleStart}
      />
    </div>
  )
}

Welcome.propTypes = {
  actions: PropTypes.shape({}),
  needTour: PropTypes.bool,
}

Welcome.defaultProps = {
  actions: {},
  needTour: false,
}

export default props => (
  <Connector>
    {({ actions, state: { app } }) => (
      <Welcome actions={actions.app} {...app} {...props} />
    )}
  </Connector>
)
