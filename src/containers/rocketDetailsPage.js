import React from "react"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropType from "prop-types"

import { requestApiDetails } from "../actions/actions"

import "../style/rocketDetails.css"

class Rocket extends React.Component {
  constructor(props) {
    super(props)

    const { req } = this.props

    this.state = {
      request: req,
    }
  }

  componentDidMount() {
    const { request } = this.state
    const { match } = this.props

    if (match.params) {
      try {
        request(match.params.id)
      } catch (e) {
        // console.log(e)
      }
    }
  }

  render() {
    const { detail } = this.props

    return detail && detail.id ? (
      <div>
        <div>
          <h1>{detail.name}</h1>
          <h2>{detail.rocket.configuration.launch_service_provider.name}</h2>
          <img
            src={`${detail.rocket.configuration.image_url}`}
            className="rocket-img"
            alt={`${detail.name}`}
          />
        </div>

        <button type="button">
          <Link className="link" to="/">
            Back
          </Link>
        </button>
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

Rocket.propTypes = {
  detail: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    rocket: PropType.shape({
      configuration: PropType.shape({
        image_url: PropType.string,
        launch_service_provider: PropType.shape({
          name: PropType.string,
        }),
      }),
    }),
  }),
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string,
    }),
  }),
  req: PropType.func,
}

Rocket.defaultProps = {
  detail: null,
  match: null,
  req: () => 0,
}

const mapStateToProps = (state) => ({ detail: state.detail })

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ req: requestApiDetails }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Rocket)
