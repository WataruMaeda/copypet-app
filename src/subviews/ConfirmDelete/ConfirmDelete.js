import React from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'components/Modal'
import FontIcon from 'components/FontIcon'
import { Button } from 'components/Button'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '30px 15px',
  },
  icon: {
    fontSize: 50,
    color: colors.black,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  desc: {
    font: 14,
    marginBottom: 40,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    height: 40,
    width: '48%',
  },
})

const ConfirmDelete = ({ name, isOpen, isLoading, toggleModal, onDelete }) => (
  <Modal size="md" isOpen={isOpen} toggleModal={toggleModal}>
    <div className={styles.root}>
      <FontIcon icon="exclamation-triangle" className={styles.icon} />
      <h3 className={styles.title}>{`"${name}"を削除しますか`}</h3>
      <p className={styles.desc}>削除すると2度と復元できません。</p>
      <div className={styles.buttonContainer}>
        <Button
          label="削除"
          className={`btn-red ${styles.button}`}
          onClick={onDelete}
          isLoading={isLoading}
        />
        <Button
          label="キャンセル"
          className={`btn-black-outline ${styles.button}`}
          onClick={toggleModal}
          disabled={isLoading}
        />
      </div>
    </div>
  </Modal>
)

ConfirmDelete.propTypes = {
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  toggleModal: PropTypes.func,
  onDelete: PropTypes.func,
}

ConfirmDelete.defaultProps = {
  name: '',
  isOpen: false,
  isLoading: false,
  toggleModal: () => {},
  onDelete: () => {},
}

export default ConfirmDelete
