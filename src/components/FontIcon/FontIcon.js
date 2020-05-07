import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faClock,
  faCog,
  faExclamationTriangle,
  faPaperPlane,
  faSearch,
  faCode,
  faQuestionCircle,
  faFolder,
  faFile,
  faTags,
  faEdit,
  faTrashAlt,
  faPlus,
  faEllipsisV,
  faCopy,
  faTimes,
  faCheck,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faArrowsAlt,
  faKiwiBird,
  faRedo,
} from '@fortawesome/free-solid-svg-icons'

// TODO: add icons here...
export const loadFontIcons = () =>
  library.add(
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faClock,
    faCog,
    faExclamationTriangle,
    faPaperPlane,
    faSearch,
    faCode,
    faQuestionCircle,
    faFolder,
    faFile,
    faTags,
    faEdit,
    faTrashAlt,
    faPlus,
    faEllipsisV,
    faCopy,
    faTimes,
    faCheck,
    faAngleDoubleDown,
    faAngleDoubleUp,
    faArrowsAlt,
    faKiwiBird,
    faRedo,
  )

const FontIcon = ({ icon, className, style }) => (
  <FontAwesomeIcon icon={icon} className={className} style={style} />
)

FontIcon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

FontIcon.defaultProps = {
  icon: '',
  className: '',
  style: {},
}

export default FontIcon
