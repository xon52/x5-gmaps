import error from '../install/error';

// Promises to return
const _promises: {
  resolve: (map: typeof google.maps) => void;
  reject: (err: Error) => void;
}[] = [];

// Call for Google Maps API
export const getGoogleAPI = (): Promise<typeof google.maps> =>
  new Promise((resolve, reject) => {
    if (globalThis.google && globalThis.google.maps) return resolve(globalThis.google.maps);
    _promises.push({ resolve, reject });
  });

// On success callback
export const onSuccess = (): void => {
  const map = globalThis.google.maps;
  if (!map) return onFail(error.SCRIPT_LOAD());
  _promises.forEach((e) => e.resolve(globalThis.google.maps));
};
// On fail callback
export const onFail = (err: Error): void => {
  _promises.forEach((e) => e.reject(err));
};
