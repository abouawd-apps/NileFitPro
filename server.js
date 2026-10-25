const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8095;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

http.createServer((req, res) => {
  try {
    const safeUrl = decodeURIComponent(req.url.split('?')[0]).replace(/\0/g, '');
    const normalizedRel = path.normalize(safeUrl === '/' ? 'index.html' : safeUrl).replace(/^(\.\.(\/|\\|$))+/, '');
    const filePath = path.resolve(ROOT, '.' + path.sep + normalizedRel);

    if (!filePath.startsWith(path.resolve(ROOT))) {
      res.writeHead(403, SECURITY_HEADERS);
      return res.end('Forbidden');
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, SECURITY_HEADERS);
        return res.end('Not found');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        ...SECURITY_HEADERS,
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream'
      });
      res.end(content);
    });
  } catch (e) {
    res.writeHead(400, SECURITY_HEADERS);
    res.end('Bad Request');
  }
}).listen(PORT, () => {
  console.log(`NileFitPro Secure Server running at http://localhost:${PORT}`);
});
