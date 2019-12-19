/* eslint-disable */
import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'
import actions from 'actions'
import { connect } from 'react-redux'

const Index = ({ children }) => (
  <div>
    <p>This is an exmaple route container</p>
    <p><b><Link to="/ex-route">/ex-route</Link> | <Link to="/ex-route/subroute">/ex-route/subroute</Link></b></p>
    {children}
  </div>
)

const RouteExample = () => (
  <div>
    <p>This is an IndexRoute, matching /ex-route</p>
  </div>
)

class Subroute extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(actions.example_loadCategories())
  }

  componentDidMount() {
    const categories = this.props.categories || []
    if (categories.length === 0) {
      this.props.dispatch(actions.example_loadCategories())
    }
  }

  render() {
    console.log(this.props.categories)
    if (this.props.categories.get) {
      console.log(this.props.categories.get(0))
    }
    const categories = this.props.categories || []
    return (
      <div>
        <p>This is a Subroute matching /ex-route/subroute fetching product categories async</p>
        {categories.map(cat => (
          <p key={cat.id}>{cat.title}</p>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.example_categories
  }
}

const SubrouteContainer = connect(mapStateToProps)(Subroute)

export default (
  <Route path="ex-route" component={Index}>
    <IndexRoute component={RouteExample} />
    <Route path="subroute" component={SubrouteContainer} />
  </Route>
)
