import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropType from "prop-types"
import Truncate from "react-truncate"

import { requestApiData } from "../../actions/actions"

import style from "./upcoming.module.css"

const prev = async (offset, setOffset, dispatch) => {
  if (offset >= 10) {
    await dispatch(requestApiData(offset - 10))
    setOffset(offset - 10)
  }
}

const next = async (count, offset, setOffset, dispatch) => {
  if (offset <= count - 10) {
    await dispatch(requestApiData(offset + 10))
    setOffset(offset + 10)
  }
}

const calculateEnd = (count, offset) => {
  return offset + 10 > count ? count : offset + 10
}

const spaces = (content) => {
  return (
    <div>
      <div className={style.container} />
      {content}
      <div className={style.container} />
    </div>
  )
}

const launch = (l) => {
  return (
    <div key={l.id} className={`card ${style["rocket-card"]}`}>
      {/* <div className="card-header">
        
      </div> */}
      <div className="card-body">
        <div className="card-title">
          <Truncate lines={1} ellipsis={<span>...</span>}>
            {l.name}
          </Truncate>
        </div>
        <hr />
        <div className="card-subtitle mb-2 text-muted">
          <Truncate lines={1} ellipsis={<span>...</span>}>
            {l.rocket.configuration.launch_service_provider}
          </Truncate>
        </div>
        <p className="card-text">
          <Truncate lines={1} ellipsis={<span>...</span>}>
            Mission: {l.mission ? l.mission.name : "unasign"}
          </Truncate>
        </p>
        <Link className="btn btn-primary" to={`/${l.id}`}>
          Details
        </Link>
      </div>
    </div>
  )
}

const header = (offset, data, setOffset, dispatch) => {
  return (
    <div className={style["header-rocket-list"]}>
      <button
        type="button"
        className="float-left btn btn-primary"
        disabled={offset === 0}
        onClick={() => prev(offset, setOffset, dispatch)}
      >
        Prev
      </button>
      <h2 className={style.listing}>
        Listing Upcoming Launches from {`${offset} `}
        to {calculateEnd(data.count, offset)}
      </h2>
      <button
        type="button"
        className="float-right btn btn-primary"
        disabled={offset + 10 >= data.count}
        onClick={() => next(data.count, offset, setOffset, dispatch)}
      >
        Next
      </button>
    </div>
  )
}

const List = () => {
  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const [offset, setOffset] = useState(0)
  useEffect(() => {
    dispatch(requestApiData(offset))
  }, [offset, dispatch])

  return data.results ? (
    <div className="d-flex flex-column">
      {spaces(header(offset, data, setOffset, dispatch))}

      <div className="d-flex align-content-around justify-content-around flex-wrap">
        {data.results.map(launch)}
      </div>

      {/* {spaces(footer(offset, data, setOffset, dispatch))} */}
    </div>
  ) : (
    <h1>Loading...</h1>
  )
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
}

List.defaultProps = {
  data: null,
}

export default List
