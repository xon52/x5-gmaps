import { OptionsInterface } from './types/OptionsInterface';

// Google Maps base URL
const baseURL = 'https://maps.googleapis.com/maps/api/js';
// Google Maps full URL with query parameters
const genURL = (options: string) => `${baseURL}?${options}`;
// All promises that need to be resolved once map is loaded
const promises: {
  resolve: (_: any) => void;
  reject: (e: Error) => void;
}[] = [];
// onError callback for Google Maps fail
const onError = (e: Error) => promises.forEach(p => p.reject(e));
// onLoad callback for Google Maps load
const onLoad = () => promises.forEach(p => p.resolve(window.google.maps));
// Insert the Google Maps script into the DOM
const loadAPI = (options: string) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = genURL(options);
  script.onerror = () => onError(new Error('Error loading script'));
  script.onload = () => onLoad();
  document.querySelector('head')!.appendChild(script);
};
// Convert options object into URI parameters
const urOptionsInterface = (options: OptionsInterface) =>
  `key=${options.key}&libraries=${options.libraries.join(',')}`;
// Check if loaded
const loaded = () => !!window.google && !!window.google.maps;
// Loading flag to allow for multiple inits
let loading = false;
// Exported promise to get map
const gmaps = () => {
  // Early return if map already loaded
  if (loaded()) return Promise.resolve(window.google.maps);
  // If not loading, it was not initialised
  if (!loading) throw new Error('x5GMaps :: Plugin not initialised');
  // Return promise and save for resolution when map load completes
  return new Promise((resolve, reject) => promises.push({ resolve, reject }));
};
// Exported initialisation
const init = (options: OptionsInterface) => {
  // Early return if map already loaded
  if (loaded()) throw new Error('x5GMaps :: Plugin already initialised');
  // Initiate map loading with given key, any options, and a promise resolve callback
  loadAPI(urOptionsInterface(options));
  // Map is still loading
  loading = true;
  // Give up if map takes too long
  setTimeout(() => {
    if (!loaded()) onError(new Error('Loading timed out'));
  }, 5000);
};

export { init, gmaps };
