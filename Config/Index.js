const config = require('../package.json');
module.exports = (env) => {
  switch (env) {
    case 'production':
      return config;

    default:
      //For Future Settings
      return config;
  }
};
