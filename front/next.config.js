const isProd = process.env.NODE_ENV === "production";
module.exports = {
  env: {
    server: isProd ? "https://production-server.com" : "http://localhost:8080"
  },
}