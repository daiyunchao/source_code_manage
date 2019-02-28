const { injectBabelPlugin } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    //console.log("config===>",config);
    
    config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config)
    config = rewireEslint(config, env);
    return config;
};