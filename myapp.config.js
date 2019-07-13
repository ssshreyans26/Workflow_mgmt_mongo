module.exports = {
  apps : [{
    name        : "myapp-api",
    script      : "app.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
   }] }
