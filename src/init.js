// Google Maps base URL
const baseURL = 'https://maps.googleapis.com/maps/api/js'
// Google Maps full URL with query parameters
const genURL = (options) => `${baseURL}?${options}&callback=x5GMapsOnLoad`
// Insert the Google Maps script into the DOM
const loadAPI = (options) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = genURL(options)
  script.onError = onError(new Error('Error loading script'))
  document.querySelector('head').appendChild(script)
}
// Convert options object into URI parameters
const uriOptions = (options) =>
  Object.keys(options)
    .map((k) => {
      const val = Array.isArray(options[k])
        ? options[k].map((v) => encodeURIComponent(v)).join(',')
        : encodeURIComponent(options[k])
      return `${encodeURIComponent(k)}=${val}`
    })
    .join('&')
// Check if loaded
const loaded = () => !!window.google && !!window.google.maps
// Loading flag to allow for multiple inits
let loading = false
// All promises that need to be resolved once map is loaded
const promises = []
// onLoad callback for Google Maps load
window.x5GMapsOnLoad = () => promises.forEach((p) => p.resolve(window.google.maps))
// onError callback for Google Maps fail
const onError = (e) => promises.forEach((p) => p.reject(e))
// Exported promise to get map
const getMap = () => {
  // Early return if map already loaded
  if (loaded()) return Promise.resolve(window.google.maps)
  // If not loading, it was not initialised
  if (!loading) throw new Error('x5GMaps :: Plugin not initialised')
  // Return promise and save for resolution when map load completes
  return new Promise((resolve, reject) => promises.push({ resolve, reject }))
}
// Exported initialisation
const init = (options) => {
  // Early return if map already loaded
  if (loaded()) throw new Error('x5GMaps :: Plugin already initialised')
  // Map is still loading
  loading = true
  // Initiate map loading with given key, any options, and a promise resolve callback
  loadAPI(uriOptions(options))
  // Give up if map takes too long
  setTimeout(() => {
    if (!loaded()) onError(new Error('Loading timed out'))
  }, 5000)
}

export { init, getMap }
