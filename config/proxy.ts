/**
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 * -------------------------------
 * You can configure a proxy to solve cross-domain issues
 * https://umijs.org/docs/guides/proxy
 * -------------------------------    
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8040',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'http://localhost:8040',
      changeOrigin: true,
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
