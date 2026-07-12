const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeB = Buffer.from(type);
  const crcB = Buffer.alloc(4);
  crcB.writeUInt32BE(crc32(Buffer.concat([typeB, data])));
  return Buffer.concat([len, typeB, data, crcB]);
}

function png(size, rgb) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3);
    row[0] = 0;
    for (let x = 0; x < size; x++) {
      const i = 1 + x * 3;
      const edge = x < 2 || y < 2 || x >= size - 2 || y >= size - 2;
      const cx = x - size / 2;
      const cy = y - size / 2;
      const r = Math.sqrt(cx * cx + cy * cy);
      const ring = Math.abs(r - size * 0.32) < size * 0.08;
      row[i] = edge || ring ? rgb[0] : 0x0c;
      row[i + 1] = edge || ring ? rgb[1] : 0x12;
      row[i + 2] = edge || ring ? rgb[2] : 0x10;
    }
    rows.push(row);
  }
  const idat = zlib.deflateSync(Buffer.concat(rows));
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const dir = path.join('packages', 'extension', 'public', 'icons');
fs.mkdirSync(dir, { recursive: true });
for (const s of [16, 32, 48, 128]) {
  fs.writeFileSync(path.join(dir, `icon-${s}.png`), png(s, [0x6f, 0xbf, 0x97]));
}
console.log('icons written');
