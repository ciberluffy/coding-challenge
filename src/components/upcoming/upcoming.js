import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropType from "prop-types"

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
    <div key={l.id}>
      {spaces(
        <div className={style["rocket-card"]}>
          <h2>{l.name}</h2>
          <h4>{l.rocket.configuration.launch_service_provider}</h4>

          <p>Mission: {l.mission ? l.mission.name : "unasign"}</p>

          <button type="button">
            <Link className={style.link} to={`/${l.id}`}>
              Details
            </Link>
          </button>
        </div>
      )}
    </div>
  )
}

const header = (offset, data, setOffset, dispatch) => {
  return (
    <div className={style["header-rocket-list"]}>
      <button
        type="button"
        className={style["buttom-prev"]}
        disabled={offset === 0}
        onClick={() => prev(offset, setOffset, dispatch)}
      >
        Prev
      </button>
      <h2 className={style.listing}>
        Listing Upcoming Launches from {offset}
        to {calculateEnd(data.count, offset)}
      </h2>
      <button
        type="button"
        className={style["buttom-next"]}
        disabled={offset + 10 >= data.count}
        onClick={() => next(data.count, offset, setOffset, dispatch)}
      >
        Next
      </button>
    </div>
  )
}

const footer = (offset, data, setOffset, dispatch) => {
  return (
    <div className={style["footer-rocket-list"]}>
      <button
        type="button"
        className={style["buttom-prev"]}
        disabled={offset === 0}
        onClick={() => prev(offset, setOffset, dispatch)}
      >
        Prev
      </button>
      <button
        type="button"
        className={style["buttom-next"]}
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
    <div className={style["rocket-list"]}>
      {spaces(header(offset, data, setOffset, dispatch))}

      {data.results.map(launch)}

      {spaces(footer(offset, data, setOffset, dispatch))}
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
