// "start": "cross-env NODE_ENV=production ts-node -r tsconfig-paths/register dist/app.js",
module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/app.js',
      node_args: '-r ts-node/register -r tsconfig-paths/register',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
