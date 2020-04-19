import React from "react"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropType from "prop-types"

import { requestApiData } from "../../actions/actions"

import style from "./upcoming.module.css"

class List extends React.Component {
  constructor(props) {
    super(props)

    const { req } = this.props

    this.state = {
      offset: 0,
      request: req,
    }
  }

  componentDidMount() {
    const { offset, request } = this.state

    try {
      request(offset)
    } catch (e) {
      // console.log(e);
    }
  }

  spaces = (content) => (
    <div>
      <div className={style.container} />
      {content}
      <div className={style.container} />
    </div>
  )

  launch = (launch) => (
    <div key={launch.id}>
      {this.spaces(
        <div className={style["rocket-card"]}>
          <h2>{launch.name}</h2>
          <h4>{launch.rocket.configuration.launch_service_provider}</h4>

          <p>Mission: {launch.mission ? launch.mission.name : "unasign"}</p>

          <button type="button">
            <Link className={style.link} to={`/${launch.id}`}>
              Details
            </Link>
          </button>
        </div>
      )}
    </div>
  )

  header = () => {
    const { offset } = this.state
    const { data } = this.props

    return (
      <div className={style["header-rocket-list"]}>
        <button
          type="button"
          className={style["buttom-prev"]}
          disabled={offset === 0}
          onClick={() => this.prev()}
        >
          Prev
        </button>
        <h1 className={style.listing}>
          Listing Upcoming Launches from {offset}
          to {this.calculateEnd(data.count)}
        </h1>
        <button
          type="button"
          className={style["buttom-next"]}
          disabled={offset + 10 >= data.count}
          onClick={() => this.next(data.count)}
        >
          Next
        </button>
      </div>
    )
  }

  footer = () => {
    const { offset } = this.state
    const { data } = this.props

    return (
      <div className={style["footer-rocket-list"]}>
        <button
          type="button"
          className={style["buttom-prev"]}
          disabled={offset === 0}
          onClick={() => this.prev()}
        >
          Prev
        </button>
        <button
          type="button"
          className={style["buttom-next"]}
          disabled={offset + 10 >= data.count}
          onClick={() => this.next(data.count)}
        >
          Next
        </button>
      </div>
    )
  }

  async prev() {
    const { offset, request } = this.state

    if (offset >= 10) {
      await request(offset - 10)
      this.setState({ offset: offset - 10 })
    }
  }

  async next(count) {
    const { offset, request } = this.state

    if (offset <= count - 10) {
      await request(offset + 10)
      this.setState({ offset: offset + 10 })
    }
  }

  calculateEnd(count) {
    const { offset } = this.state

    return offset + 10 > count ? count : offset + 10
  }

  render() {
    const { data } = this.props

    return data.results ? (
      <div className={style["rocket-list"]}>
        {this.spaces(this.header())}

        {data.results.map(this.launch)}

        {this.spaces(this.footer())}
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

List.propTypes = {
  data: PropType.shape({
    count: PropType.number,
    results: PropType.arrayOf(
      PropType.shape({
        id: PropType.string,
        name: PropType.string,
        mission: PropType.shape({
          name: PropType.string,
        }),
        rocket: PropType.shape({
          configuration: PropType.shape({
            launch_service_provider: PropType.string,
          }),
        }),
      })
    ),
  }),
  req: PropType.func,
}

List.defaultProps = {
  data: null,
  req: () => 0,
}

const mapStateToProps = (state) => ({ data: state.data })

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ req: requestApiData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)
