import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FontIcon from 'components/FontIcon'
import { IconButton } from 'components/Button'
import DeleteAccount from 'subviews/DeleteAccount'
import Settings from 'subviews/Settings'
import { styler, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'

// import Inquiry from './Inquiry'
import InquiryComplete from './InquiryComplete'

const styles = styler({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRight: `1px solid ${colors.gray}`,
    background: colors.black,
    padding: '20px 16px',
    minHeight: '100%',
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    bottom: 20,
    left: 8,
  },
  logo: {
    width: 24,
    color: 'white',
  },
  icon: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
  },
})

const Left = ({ actions }) => {
  // state
  // const [isOpenInquiry, setOpenInquiry] = useState(false)
  const [isOpenInquiryComplete, setOpenInquiryComplete] = useState(false)
  const [isOpenSettings, setOpenSettings] = useState(false)
  const [isOpenDelAccount, setOpenDelAccount] = useState(false)

  // handler
  // const handleOpenInquiry = () => setOpenInquiry(!isOpenInquiry)
  const handleOpenTour = () => {
    actions.setTour(false)
    actions.setOpenTour(true)
  }
  const handleOpenInquiryComplete = () =>
    setOpenInquiryComplete(!isOpenInquiryComplete)
  const handleOpenSettings = () => setOpenSettings(!isOpenSettings)
  const handleOpenDelAccount = () => setOpenDelAccount(!isOpenDelAccount)

  return (
    <div className={styles.root}>
      <FontIcon icon="code" className={styles.logo} />
      <div className={styles.bottom}>
        <IconButton
          icon="question-circle"
          iconClassName={styles.icon}
          onClick={handleOpenTour}
        />
        <IconButton
          icon="cog"
          iconClassName={styles.icon}
          onClick={handleOpenSettings}
        />
      </div>
      {/* <Inquiry
        isOpen={isOpenInquiry}
        toggleModal={handleOpenInquiry}
        onComplete={() => {
          handleOpenInquiry()
          handleOpenInquiryComplete()
        }}
      /> */}
      <InquiryComplete
        isOpen={isOpenInquiryComplete}
        toggleModal={handleOpenInquiryComplete}
      />
      <Settings
        isOpen={isOpenSettings}
        toggleModal={handleOpenSettings}
        onDelete={() => {
          handleOpenSettings()
          handleOpenDelAccount()
        }}
      />
      <DeleteAccount
        isOpen={isOpenDelAccount}
        toggleModal={handleOpenDelAccount}
      />
    </div>
  )
}

Left.propTypes = {
  actions: PropTypes.shape({}),
}

Left.defaultProps = {
  actions: PropTypes.shape({}),
}

export default props => (
  <Connector>
    {({ actions }) => <Left actions={actions.app} {...props} />}
  </Connector>
)
