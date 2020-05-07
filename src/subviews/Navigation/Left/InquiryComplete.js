import React from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'components/Modal'
import FontIcon from 'components/FontIcon'
import { Button } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    background: colors.green,
    marginBottom: 24,
  },
  icon: {
    fontSize: 28,
    color: 'white',
  },
  desc: {
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: '100%',
  },
})

const InquiryComplete = ({ isOpen, toggleModal, style }) => {
  return (
    <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={styles.root} style={style}>
        <h3 className={styles.title}>送信しました</h3>
        <div className={styles.iconContainer}>
          <FontIcon icon="check" className={styles.icon} />
        </div>
        <p className={styles.desc}>
          この度はお問い合わせいただき、
          <br />
          誠にとありがとうございます。
          <br />
          <br />
          <a href="/">w.maeda.ca@gmail.com</a>
          <br />
          <br />
          宛に3日営業日以内に返信いたします。
        </p>
        <Button
          label="OK"
          className={`btn-yellow ${styles.button}`}
          onClick={toggleModal}
        />
      </div>
    </Modal>
  )
}

InquiryComplete.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  style: PropTypes.shape({}),
}

InquiryComplete.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
  style: {},
}

export default InquiryComplete
