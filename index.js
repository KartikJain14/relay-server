const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { config } = require('dotenv');

config();

const app = express();

const TARGET = process.env.TARGET;

app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  ws: true,
  followRedirects: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('host', new URL(TARGET).host);
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Relay proxy running on http://localhost:${PORT}`);
});
