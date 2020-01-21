/**
 * Get a url parameter by name
 * @param {string} parameterName
 */
const GetParameterByName = parameterName => {
  const name = parameterName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export default GetParameterByName;
