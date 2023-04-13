const messages = {
  KEY_MISSING: () =>
    handleFatalError(`A Google API 'key' is required for plugin install.`),
  LIB_ISSUE: () =>
    handleFatalError(`Libraries must be an array library names (as strings).`),
  SCRIPT_LOAD: () =>
    handleFatalError(`There was an error loading the Google Maps API script.`),
  TIMEOUT: () => handleFatalError(`Google Maps could not be loaded.`)
};

const handleFatalError = (message: string): Error =>
  new Error(`x5-gmaps :: ${message}`);

export default { ...messages };
