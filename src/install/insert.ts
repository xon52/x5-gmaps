// This is required to attached a method to the window
declare global {
  interface Window {
    _gmapsInit: () => void;
  }
}

import error from './error';

// Google Maps base URL
const baseURL = 'https://maps.googleapis.com/maps/api/js';
// Google Scripts ID
const scriptID = 'gmaps';
// Insert the Google Maps script into the DOM
const loadAPI = (params: string): Promise<void> =>
  new Promise((resolve, reject) => {
    // Remove any existing Google Maps script
    const oldAPI = document.getElementById(scriptID);
    if (oldAPI && oldAPI.parentNode) oldAPI.parentNode.removeChild(oldAPI);
    // Get callback reference ready
    window._gmapsInit = () => resolve();
    // Generate and add new API
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.id = scriptID;
    script.src = `${baseURL}?${params}&callback=_gmapsInit`;
    script.onerror = () => reject(error.SCRIPT_LOAD());
    const head = document.querySelector('head');
    if (head) head.appendChild(script);
    else throw new Error('Could not find <head> element in the document.');
  });

// Insert Google script and update attached Vue apps
const insert = (params: string, callback?: () => any): Promise<void> =>
  new Promise((resolve, reject) => {
    // Give up if map takes too long
    const loadAPITimeout = setTimeout(() => {
      reject(error.TIMEOUT());
    }, 5000);
    // Insert Google script with generated URI into the DOM
    loadAPI(params)
      .then(() => (callback ? callback() : null))
      .then(() => resolve())
      .catch((err) => reject(err))
      .finally(() => clearTimeout(loadAPITimeout));
  });

export default insert;
