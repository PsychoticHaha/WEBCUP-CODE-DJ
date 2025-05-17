/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// New declarations
const { createProxyMiddleware } = require("http-proxy-middleware");
const finalhandler = require("finalhandler");

// Proxy vers Laravel (via Apache local)
const API_PROXY = createProxyMiddleware("/api", {
  target: "http://localhost:8000/graphql", // Apache doit servir Laravel ici
  pathRewrite: { "^/api": "/api" }, // facultatif si Laravel attend bien le prefixe /api
  changeOrigin: true,
});

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // Redirige les appels API vers Laravel
    if (pathname.startsWith("/api")) {
      return API_PROXY(req, res, finalhandler(req, res));
    }

    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen((err) => {
    if (err) throw err;
    console.log(`> Ready ...`);
  });
});
