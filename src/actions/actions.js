// upcoming rocket launches

export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";

export const requestApiData = offset => ({ type: REQUEST_API_DATA, offset })
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data })

// details rocket

export const REQUEST_API_DETAILS = "REQUEST_API_DETAILS";
export const RECEIVE_API_DETAILS = "RECEIVE_API_DETAILS";

export const requestApiDetails = id => ({ type: REQUEST_API_DETAILS, id })
export const receiveApiDetails = detail => ({ type: RECEIVE_API_DETAILS, detail})
