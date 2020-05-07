import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as appActions } from '../modules/app.module'
import { actions as dataActions } from '../modules/data.module'
import { actions as selectActions } from '../modules/select.module'
import { actions as searchActions } from '../modules/search.module'

class Connector extends Component {
  render() {
    const { state, actions, children } = this.props

    return children({ state, actions })
  }
}

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => {
  const actionList = [
    // label: String, value: Object
    { label: 'app', value: appActions },
    { label: 'data', value: dataActions },
    { label: 'select', value: selectActions },
    { label: 'search', value: searchActions },
    // add more actions here
  ]

  return {
    actions: actionList.reduce(
      (prev, cur) => ({
        ...prev,
        [cur.label]: bindActionCreators(cur.value, dispatch),
      }),
      {},
    ),
  }
}

Connector.propTypes = {
  state: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func])
    .isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Connector)
