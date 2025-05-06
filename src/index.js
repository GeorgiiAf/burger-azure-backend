import https from 'https';
import fs from 'fs';
import app from './app.js';

const hostname = '127.0.0.1';
const port = 3000;

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


if (process.env.NODE_ENV === 'production') {
  const sslOptions = {
    key: fs.readFileSync('/etc/pki/tls/private/ca.key'),
    cert: fs.readFileSync('/etc/pki/tls/certs/ca.crt')
  };
  
  https.createServer(sslOptions, app).listen(port, hostname, () => {
    console.log(`HTTPS server running at https://${hostname}:${port}/`);
  });
} else {
  app.listen(port, hostname, () => {
    console.log(`HTTP server running at http://${hostname}:${port}/`);
  });
}