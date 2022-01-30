import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';

const PORT = 4444;
const app = express();

const securityKey = fs.readFileSync('key.pem');
const securityCertificate = fs.readFileSync('cert.pem');

app.get('/', (req, res) => {
	res.sendFile(path.resolve('public', 'index.html'));
});

app.get('/secret', (req, res) => {
	return res.send('Your personal secret value is "4444"');
});

https
	.createServer({
		key: securityKey,
		cert: securityCertificate,
	}, app)
	.listen(PORT, () => {
		console.log(`Server listening on Port: ${PORT}`);
	});
