/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");
module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': "#769FCD",
        'secondary-color': "#B9D7EA",
        'success-color': "#7ADD86",
        'error-color': "#FA5556",
        'bg-base-color': "#D6E6F2"
      },
    },
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,

});
