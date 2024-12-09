module.exports = {
  apps: [{
    name: "property-service",
    script: " src/server.ts",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
};

