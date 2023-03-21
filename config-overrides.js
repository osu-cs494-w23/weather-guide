const PrerenderSPAPlugin = require('@andrewda/prerender-spa-plugin');
const path = require('path');

module.exports = (config, env) => {
  if (env === 'production') {
    config.plugins = config.plugins.concat([
      new PrerenderSPAPlugin({
        routes: ['/', '/weather', '/car', '/plane', '/boat'],
        staticDir: path.join(__dirname, 'build'),
        postProcess(renderedRoute) {
          console.log(renderedRoute)
          return renderedRoute;
        },
      }),
    ]);
  }

  return config;
};
