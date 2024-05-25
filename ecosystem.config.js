module.exports = {
  apps: [
    {
      name: "pindie_frontend",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
