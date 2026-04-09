const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_BASE = 'https://artemis.cdnspace.ca';

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon'
};

function proxyAPI(apiPath, res) {
  const url = API_BASE + apiPath;
  https.get(url, { timeout: 10000 }, (upstream) => {
    let body = '';
    upstream.on('data', c => body += c);
    upstream.on('end', () => {
      res.writeHead(upstream.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      res.end(body);
    });
  }).on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ error: err.message }));
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // API proxy routes
  if (url.pathname.startsWith('/api/')) {
    return proxyAPI(url.pathname, res);
  }

  // Static file serving
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Artemis II Dashboard running at:\n`);
  console.log(`  → http://localhost:${PORT}\n`);
  console.log(`  API proxy: /api/orbit, /api/arow, /api/dsn`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
