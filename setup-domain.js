// setup-domain.js — Run this to configure lunar.garrigan.me
// Usage: node setup-domain.js YOUR_API_KEY YOUR_API_SECRET
//
// Get your API key at: https://developer.godaddy.com/keys/
// Select "Production" environment when creating the key.

const https = require('https');

const apiKey = process.argv[2];
const apiSecret = process.argv[3];

if (!apiKey || !apiSecret) {
  console.log('\n  Usage: node setup-domain.js YOUR_API_KEY YOUR_API_SECRET\n');
  console.log('  Get your key at: https://developer.godaddy.com/keys/\n');
  process.exit(1);
}

const record = JSON.stringify([{
  type: 'CNAME',
  name: 'lunar',
  data: 'mgarrigan-hue.github.io',
  ttl: 600
}]);

const options = {
  hostname: 'api.godaddy.com',
  path: '/v1/domains/garrigan.me/records',
  method: 'PATCH',
  headers: {
    'Authorization': `sso-key ${apiKey}:${apiSecret}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(record)
  }
};

console.log('\n  Adding CNAME record: lunar.garrigan.me → mgarrigan-hue.github.io ...\n');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('  ✅ DNS record created successfully!\n');
      console.log('  lunar.garrigan.me → mgarrigan-hue.github.io\n');
      console.log('  DNS propagation takes 5-30 minutes.');
      console.log('  HTTPS certificate will auto-provision via GitHub Pages.\n');
      console.log('  Test with: nslookup lunar.garrigan.me\n');
    } else {
      console.log(`  ❌ Error (${res.statusCode}): ${body}\n`);
      if (res.statusCode === 401 || res.statusCode === 403) {
        console.log('  Check your API key/secret and ensure it is a Production key.\n');
      }
    }
  });
});

req.on('error', (e) => console.log(`  ❌ Request failed: ${e.message}\n`));
req.write(record);
req.end();
