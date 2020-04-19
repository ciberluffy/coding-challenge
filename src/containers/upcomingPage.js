import React from "react"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { requestApiData } from "../actions/actions"

import "../style/upcoming.css"

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
    }
  }

  componentDidMount() {
    const { offset } = this.state

    try {
      this.props.requestApiData(offset)
    } catch (e) {
      // console.log(e);
    }
  }

  spaces = (content) => (
    <div>
      <div className="container" />
      {content}
      <div className="container" />
    </div>
  )

  launch = (launch) => (
    <div key={launch.id}>
      {this.spaces(
        <div className="rocket-card">
          <h2>{launch.name}</h2>
          <h4>{launch.rocket.configuration.launch_service_provider}</h4>

          <p>Mission: {launch.mission ? launch.mission.name : "unasign"}</p>

          <button type="button">
            <Link className="link" to={`/${launch.id}`}>
              Details
            </Link>
          </button>
        </div>
      )}
    </div>
  )

  header = () => {
    const { offset } = this.state

    return (
      <div className="header-rocket-list">
        <button
          type="button"
          className="buttom-prev"
          disabled={offset === 0}
          onClick={() => this.prev()}
        >
          Prev
        </button>
        <h1 className="listing">
          Listing Upcoming Launches from {offset}
          to {this.calculateEnd(this.props.data.count)}
        </h1>
        <button
          type="button"
          className="buttom-next"
          disabled={offset + 10 >= this.props.data.count}
          onClick={() => this.next(this.props.data.count)}
        >
          Next
        </button>
      </div>
    )
  }

  footer = () => {
    const { offset } = this.state

    return (
      <div className="footer-rocket-list">
        <button
          type="button"
          className="buttom-prev"
          disabled={offset === 0}
          onClick={() => this.prev()}
        >
          Prev
        </button>
        <button
          type="button"
          className="buttom-next"
          disabled={offset + 10 >= this.props.data.count}
          onClick={() => this.next(this.props.data.count)}
        >
          Next
        </button>
      </div>
    )
  }

  async prev() {
    const { offset } = this.state

    if (offset >= 10) {
      await this.props.requestApiData(offset - 10)
      this.setState({ offset: offset - 10 })
    }
  }

  async next(count) {
    const { offset } = this.state

    if (offset <= count - 10) {
      await this.props.requestApiData(offset + 10)
      this.setState({ offset: offset + 10 })
    }
  }

  calculateEnd(count) {
    const { offset } = this.state

    return offset + 10 > count ? count : offset + 10
  }

  render() {
    return this.props.data.results ? (
      <div className="rocket-list">
        {this.spaces(this.header())}

        {this.props.data.results.map(this.launch)}

        {this.spaces(this.footer())}
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

const mapStateToProps = (state) => ({ data: state.data })

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestApiData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)
