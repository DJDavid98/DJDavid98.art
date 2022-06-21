const { NEXT_PUBLIC_STORAGE_DOMAIN } = process.env;
const { i18n } = require('./next-i18next.config.js');
const withPlugins = require('next-compose-plugins');
const withESLint = require('./utils/next-eslint');
const withCamelCaseCSSModules = require('./utils/next-css-modules');
const vercelConfig = require('./vercel.json');

const devMode = process.env.NODE_ENV === 'development';

module.exports = withPlugins([[withESLint], [withCamelCaseCSSModules]], {
  i18n,
  images: {
    domains: [NEXT_PUBLIC_STORAGE_DOMAIN, 's.gravatar.com'],
  },
  async rewrites() {
    return vercelConfig.rewrites.map((entry) => {
      if (devMode) {
        return {
          ...entry,
          destination: entry.destination.replace('https://storage.djdavid98.art', `http://${NEXT_PUBLIC_STORAGE_DOMAIN}`),
        };
      }
      return entry;
    });
  },
  redirects: async () => vercelConfig.redirects,
  async headers() {
    return vercelConfig.headers.reduce((acc, config) => {
      // Allow all scripts in development mode
      if (devMode) {
        config.headers = config.headers.map((headerConfig) => {
          if (/content-security-policy/i.test(headerConfig.key)) {
            const value = headerConfig.value
              .replace(/script-src [^;]+(;|$)/, `script-src * 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval'$1`)
              .replace(/((?:img|default)-src [^;]+)(;|$)/g, `$1 ${NEXT_PUBLIC_STORAGE_DOMAIN}$2`)
              .replace(/upgrade-insecure-requests;/, '');
            return {
              ...headerConfig,
              value,
            };
          }

          return headerConfig;
        });
      }

      if (config.source === '/(.*)') {
        acc.push({
          ...config,
          source: '/:path*',
        });
        acc.push({
          ...config,
          source: '/',
        });
      } else {
        acc.push(config);
      }
      return acc;
    }, []);
  },
});
