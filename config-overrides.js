const path = require('path');

const PrerenderSPAPlugin = require('@andrewda/prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

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

        renderer: new Renderer({
          // renderAfterElementExists: '.App',
          renderAfterTime: 5000,
        }),
      }),
    ]);
  }

  return config;
};
