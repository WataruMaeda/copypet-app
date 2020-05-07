import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'components/Modal'
import Error from 'components/Error'
import { Button } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'

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
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    height: 40,
    width: '100%',
  },
  separator: {
    width: '100%',
    height: 1,
    background: colors.lightGray,
    margin: '30px 0',
  },
  version: {
    marginTop: 30,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    width: '100%',
  },
})

const Settings = ({ actions, isOpen, onDelete, toggleModal, style }) => {
  // state
  const [isLoading, setLoading] = useState(false)
  const [resErr, setResErr] = useState('')

  // handler
  const handleLogout = async () => {
    try {
      setLoading(true)
      setResErr('')
      await actions.logout()
      setLoading(false)
      toggleModal()
    } catch (err) {
      setResErr(err.message)
      setLoading(false)
    }
  }

  // rendering
  return (
    <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={styles.root} style={style}>
        <Error label={resErr} />
        <h3 className={styles.title}>設定</h3>
        <div className={styles.container}>
          <p className={styles.subtitle}>アカウントを切り替える</p>
          <Button
            label="ログアウト"
            className={`btn-black-outline ${styles.button}`}
            onClick={handleLogout}
            isLoading={isLoading}
            loaderColor={colors.black}
          />
        </div>
        <div className={styles.separator} />
        <div className={styles.container}>
          <p className={styles.subtitle}>アカウントを削除する</p>
          <Button
            label="削除"
            className={`btn-red ${styles.button}`}
            onClick={onDelete}
          />
        </div>
        <p className={styles.version}>バージョン 1.0.0</p>
      </div>
    </Modal>
  )
}

Settings.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  style: PropTypes.shape({}),
}

Settings.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
  style: {},
}

export default props => (
  <Connector>
    {({ actions }) => <Settings actions={actions.app} {...props} />}
  </Connector>
)
