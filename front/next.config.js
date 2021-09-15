const isDev = process.env.NODE_ENV === "development";
module.exports = {
  env: {
    server: isDev ? "http://localhost:8080" : "https://production-server.com"
  },
}