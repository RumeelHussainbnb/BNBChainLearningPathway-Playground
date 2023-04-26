const withTM = require('next-transpile-modules')([
  
]);

module.exports = withTM({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['https://github.com/'],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack5: true,
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});
