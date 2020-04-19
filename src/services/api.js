const UPCOMING_ROCKET_LAUNCHES = "/launch/upcoming/"
const ROCKET_DETAIL = "/launch/"

export const fetchUpcoming = async (offset) => {
  const params = offset.offset ? `?limit=10&offset=${offset.offset}` : ""

  try {
    const response = await fetch(UPCOMING_ROCKET_LAUNCHES + params)
    const data = await response.json()
    return data
  } catch (e) {
    // console.log(e)
    return null
  }
}

export const fetchDetail = async (id) => {
  try {
    const response = await fetch(`${ROCKET_DETAIL}${id.id}/`)
    const detail = await response.json()
    return detail
  } catch (e) {
    // console.log(e)
    return null
  }
}
