import React, { useEffect } from "react"
import { useParams } from "react-router"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropType from "prop-types"

import { requestApiDetails } from "../../actions/actions"

import style from "./rocketDetails.module.css"

const Rocket = () => {
  const detail = useSelector((state) => state.detail)
  const dispatch = useDispatch()

  const { id } = useParams()
  useEffect(() => {
    dispatch(requestApiDetails(id))
  }, [id, dispatch])

  return detail && detail.id ? (
    <div>
      <div>
        <h1>{detail.name}</h1>
        <h2>{detail.rocket.configuration.launch_service_provider.name}</h2>
        <img
          src={`${detail.rocket.configuration.image_url}`}
          className={style["rocket-img"]}
          alt={`${detail.name}`}
        />
      </div>

      <Link className="btn btn-primary" to="/">
        Back
      </Link>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
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
}

Rocket.defaultProps = {
  detail: null,
  match: null,
}

export default Rocket
