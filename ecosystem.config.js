module.exports = {
  apps: [
    {
      name: 'prod',
      script: 'dist/src/app.js',
      instances: 'max',
      exec_mode: 'cluster'
    }
  ]
};
