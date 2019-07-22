export default function fetchFromHost(...options) {
  if (process.env.REACT_APP_HOST_ENV) {
    options[0] = process.env.REACT_APP_HOST_ENV + options[0];
  }
  return fetch(...options);
}
