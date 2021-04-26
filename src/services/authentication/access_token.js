let accessToken_ = null

export function setAccessToken (accessToken) {
  accessToken_ = accessToken
}

export function getAccessToken () {
  return accessToken_
}
