import insert from './insert';
import error from './error';
import { onSuccess, onFail } from './api';

// URL parameters for Google Maps
// https://developers.google.com/maps/documentation/javascript/url-params
export type apiOptionsType = {
  key: string;
  libraries?: string | string[];
  version?: string;
  language?: string;
  region?: string;
  callback?: () => any;
};

// Google Maps API options
const _params = '';
// Google Maps API options generator
const genParams = ({
  key,
  libraries,
  version,
  language,
  region
}: apiOptionsType) => {
  if (!key) throw error.KEY_MISSING();
  let params = `key=${key}`;
  if (libraries)
    params = `${params}&libraries=${
      Array.isArray(libraries) ? libraries.join(',') : libraries
    }`;
  if (version) params = `${params}&v=${version}`;
  if (language) params = `${params}&language=${language}`;
  if (region) params = `${params}&region=${region}`;
  return params;
};

// Initialise plugin install
const init = (options: apiOptionsType): void => {
  // URL params
  const params = genParams(options);
  // If the params has changed, it will need to be updated
  const requireUpdate = _params !== params;
  // Update Google script if required
  if (requireUpdate)
    insert(params, options.callback)
      .then(() => onSuccess())
      .catch((err) => onFail(err));
};

export default init;
