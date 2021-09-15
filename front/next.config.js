const isDev = process.env.NODE_ENV === "development";
module.exports = {
  env: {
    server: isDev ? "http://localhost" : "http://13.230.60.179"
  },
}