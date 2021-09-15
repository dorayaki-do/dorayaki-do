const isDev = process.env.NODE_ENV === "development";
module.exports = {
  env: {
    server: isDev ? "http://localhost" : "https://production-server.com"
  },
}