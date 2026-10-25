import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import tls from 'node:tls';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 4177);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.pdf': 'application/pdf'
};

// Neural Human Male Voices for all 18 languages
const MALE_NEURAL_VOICES = {
  ar: { voice: 'ar-EG-ShakirNeural', xmlLang: 'ar-EG', gtl: 'ar' },
  en: { voice: 'en-US-AndrewNeural', xmlLang: 'en-US', gtl: 'en' },
  tr: { voice: 'tr-TR-AhmetNeural', xmlLang: 'tr-TR', gtl: 'tr' },
  fr: { voice: 'fr-FR-HenriNeural', xmlLang: 'fr-FR', gtl: 'fr' },
  it: { voice: 'it-IT-DiegoNeural', xmlLang: 'it-IT', gtl: 'it' },
  de: { voice: 'de-DE-ConradNeural', xmlLang: 'de-DE', gtl: 'de' },
  zh: { voice: 'zh-CN-YunxiNeural', xmlLang: 'zh-CN', gtl: 'zh-CN' },
  ko: { voice: 'ko-KR-InJoonNeural', xmlLang: 'ko-KR', gtl: 'ko' },
  ja: { voice: 'ja-JP-KeitaNeural', xmlLang: 'ja-JP', gtl: 'ja' },
  hi: { voice: 'hi-IN-MadhurNeural', xmlLang: 'hi-IN', gtl: 'hi' },
  ms: { voice: 'ms-MY-OsmanNeural', xmlLang: 'ms-MY', gtl: 'ms' },
  ru: { voice: 'ru-RU-DmitryNeural', xmlLang: 'ru-RU', gtl: 'ru' },
  pt: { voice: 'pt-BR-AntonioNeural', xmlLang: 'pt-BR', gtl: 'pt' },
  es: { voice: 'es-ES-AlvaroNeural', xmlLang: 'es-ES', gtl: 'es' },
  fa: { voice: 'fa-IR-FaridNeural', xmlLang: 'fa-IR', gtl: 'fa' },
  ur: { voice: 'ur-PK-AsadNeural', xmlLang: 'ur-PK', gtl: 'ur' },
  id: { voice: 'id-ID-ArdiNeural', xmlLang: 'id-ID', gtl: 'id' },
  nub: { voice: 'ar-EG-ShakirNeural', xmlLang: 'ar-EG', gtl: 'ar' }
};

const ttsCache = new Map();
const TRUSTED_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
let clockOffsetSec = 0;
let clockSyncedAt = 0;

async function getAccurateEpochSec() {
  if (Date.now() - clockSyncedAt < 600_000 && clockSyncedAt > 0) {
    return Math.floor(Date.now() / 1000) + clockOffsetSec;
  }
  try {
    const r = await fetch('https://www.bing.com', { method: 'HEAD' });
    const d = r.headers.get('date');
    if (d) {
      const remoteSec = Math.floor(new Date(d).getTime() / 1000);
      clockOffsetSec = remoteSec - Math.floor(Date.now() / 1000);
      clockSyncedAt = Date.now();
      return remoteSec;
    }
  } catch {}
  return Math.floor(Date.now() / 1000);
}

function makeWsFrame(str) {
  const payload = Buffer.from(str, 'utf8');
  const mask = crypto.randomBytes(4);
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, 0x80 | payload.length]);
  } else {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(payload.length, 2);
  }
  const masked = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, mask, masked]);
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

async function tryNeuralMaleTTS(langCfg, text) {
  const epoch = await getAccurateEpochSec();
  let ticks = BigInt(epoch + 11644473600);
  ticks -= ticks % 300n;
  ticks *= 10000000n;
  const gec = crypto.createHash('sha256').update(`${ticks}${TRUSTED_TOKEN}`, 'ascii').digest('hex').toUpperCase();
  const reqId = crypto.randomUUID().replace(/-/g, '');
  const muid = crypto.randomBytes(16).toString('hex').toUpperCase();
  const key = crypto.randomBytes(16).toString('base64');
  const ver = '1-143.0.3650.75';
  const wsPath = `/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_TOKEN}&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=${ver}&ConnectionId=${reqId}`;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { sock.destroy(); reject(new Error('TTS timeout')); }, 5500);
    const sock = tls.connect(443, 'speech.platform.bing.com', { servername: 'speech.platform.bing.com' }, () => {
      sock.write([
        `GET ${wsPath} HTTP/1.1`,
        `Host: speech.platform.bing.com`,
        `Upgrade: websocket`,
        `Connection: Upgrade`,
        `Sec-WebSocket-Key: ${key}`,
        `Sec-WebSocket-Version: 13`,
        `Cookie: muid=${muid};`,
        `Origin: chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold`,
        `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0`,
        `\r\n`
      ].join('\r\n'));
    });

    let upgraded = false;
    let buf = Buffer.alloc(0);
    const mp3 = [];

    sock.on('data', chunk => {
      buf = Buffer.concat([buf, chunk]);
      if (!upgraded && buf.includes('\r\n\r\n')) {
        const idx = buf.indexOf('\r\n\r\n');
        const head = buf.subarray(0, idx).toString();
        if (!head.includes('101')) {
          clearTimeout(timer);
          sock.destroy();
          return reject(new Error('WS ' + head.split('\r\n')[0]));
        }
        upgraded = true;
        buf = buf.subarray(idx + 4);
        const nowIso = new Date(epoch * 1000).toISOString();
        sock.write(makeWsFrame(`X-Timestamp:${nowIso}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`));
        sock.write(makeWsFrame(`X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${nowIso}\r\nPath:ssml\r\n\r\n<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${langCfg.xmlLang}'><voice name='${langCfg.voice}'><prosody pitch='-3Hz' rate='0%'>${escapeXml(text)}</prosody></voice></speak>`));
      }
      while (upgraded && buf.length >= 2) {
        const op = buf[0] & 0x0f;
        let len = buf[1] & 0x7f;
        let off = 2;
        if (len === 126) { if (buf.length < 4) break; len = buf.readUInt16BE(2); off = 4; }
        else if (len === 127) { if (buf.length < 10) break; len = Number(buf.readBigUInt64BE(2)); off = 10; }
        if (buf.length < off + len) break;
        const frame = buf.subarray(off, off + len);
        buf = buf.subarray(off + len);
        if (op === 1 && frame.toString('utf8').includes('Path:turn.end')) {
          clearTimeout(timer);
          sock.end();
          const out = Buffer.concat(mp3);
          return out.length > 256 ? resolve(out) : reject(new Error('Empty audio'));
        } else if (op === 2) {
          const marker = Buffer.from('Path:audio\r\n');
          const mIdx = frame.indexOf(marker);
          if (mIdx !== -1) mp3.push(frame.subarray(mIdx + marker.length));
        }
      }
    });
    sock.on('error', err => { clearTimeout(timer); reject(err); });
  });
}

async function fetchFallbackMp3(gtl, text) {
  const chunks = [];
  const words = text.split(/\s+/);
  let cur = '';
  const parts = [];
  for (const w of words) {
    if ((cur + ' ' + w).length > 175 && cur) { parts.push(cur); cur = w; }
    else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) parts.push(cur);

  for (const p of parts) {
    const u = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(gtl)}&q=${encodeURIComponent(p)}`;
    const r = await fetch(u, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!r.ok) throw new Error('Fallback TTS HTTP ' + r.status);
    chunks.push(Buffer.from(await r.arrayBuffer()));
  }
  return Buffer.concat(chunks);
}

const ALLOWED_DOWNLOAD_HOSTS = new Set([
  'cdn.mp3quran.net',
  'archive.org',
  'ia601500.us.archive.org',
  'ia801500.us.archive.org',
  'backup.qurango.net'
]);

const server = http.createServer(async (req, res) => {
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    // 1. Real Human Male Voice TTS Endpoint (18 languages + MP3 download)
    if (urlObj.pathname === '/api/tts') {
      const lang = (urlObj.searchParams.get('lang') || 'ar').toLowerCase();
      const text = (urlObj.searchParams.get('text') || '').trim().slice(0, 600);
      const isDownload = urlObj.searchParams.get('download') === '1';
      if (!text) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing text' }));
      }
      const cfg = MALE_NEURAL_VOICES[lang] || MALE_NEURAL_VOICES.ar;
      const cacheKey = `${lang}:${text}`;
      let entry = ttsCache.get(cacheKey);
      if (!entry) {
        try {
          const buf = await tryNeuralMaleTTS(cfg, text);
          entry = { buf, mode: 'neural-male' };
        } catch {
          const buf = await fetchFallbackMp3(cfg.gtl, text);
          entry = { buf, mode: 'baritone-shaped' };
        }
        if (ttsCache.size > 200) ttsCache.delete(ttsCache.keys().next().value);
        ttsCache.set(cacheKey, entry);
      }

      const safeFile = `NileFitPro-Motivation-${lang}.mp3`;
      const headers = {
        'Content-Type': 'audio/mpeg',
        'Content-Length': entry.buf.length,
        'X-Voice-Mode': entry.mode,
        'Access-Control-Expose-Headers': 'X-Voice-Mode'
      };
      if (isDownload) {
        headers['Content-Disposition'] = `attachment; filename="${safeFile}"`;
      }
      res.writeHead(200, headers);
      return res.end(entry.buf);
    }

    // 2. Direct MP3 File Download Proxy (Surahs, Morning/Evening Adhkar, Ruqyah)
    if (urlObj.pathname === '/api/download') {
      const targetUrl = urlObj.searchParams.get('url') || '';
      const rawName = (urlObj.searchParams.get('filename') || 'NileFitPro-Audio.mp3').replace(/[^\w\u0600-\u06FF\-. ]+/g, '_');
      let parsed;
      try { parsed = new URL(targetUrl); } catch {
        res.writeHead(400); return res.end('Invalid URL');
      }
      const hostOk = ALLOWED_DOWNLOAD_HOSTS.has(parsed.hostname) || parsed.hostname.endsWith('.archive.org') || parsed.hostname.endsWith('.mp3quran.net');
      if (!hostOk) {
        res.writeHead(403); return res.end('Host not allowed');
      }

      const upstream = await fetch(targetUrl, { redirect: 'follow' });
      if (!upstream.ok || !upstream.body) {
        res.writeHead(upstream.status || 502);
        return res.end('Upstream audio unavailable');
      }
      const encodedName = encodeURIComponent(rawName.endsWith('.mp3') ? rawName : `${rawName}.mp3`);
      const headers = {
        'Content-Type': upstream.headers.get('content-type') || 'audio/mpeg',
        'Content-Disposition': `attachment; filename="NileFitPro.mp3"; filename*=UTF-8''${encodedName}`
      };
      const cl = upstream.headers.get('content-length');
      if (cl) headers['Content-Length'] = cl;
      res.writeHead(200, headers);
      for await (const chunk of upstream.body) {
        res.write(chunk);
      }
      return res.end();
    }

    // 3. Static Files
    let relPath = decodeURIComponent(urlObj.pathname);
    if (relPath === '/' || relPath === '') relPath = '/index.html';
    const fullPath = path.normalize(path.join(__dirname, relPath));
    if (!fullPath.startsWith(__dirname)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    const ext = path.extname(fullPath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(fullPath).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server error: ' + err.message);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`NileFitPro server running at http://localhost:${PORT}`);
});
