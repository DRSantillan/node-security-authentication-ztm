import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
const PORT = 4444;
const app = express();

// added security features to stop sniffing and hacking
app.use(helmet())

// keys to make server secure
const securityKey = fs.readFileSync('key.pem');
const securityCertificate = fs.readFileSync('cert.pem');

app.get('/', (req, res) => {
	res.sendFile(path.resolve('public', 'index.html'));
});

app.get('/secret', (req, res) => {
	return res.send('Your personal secret value is "4444"');
});

// using https and express for added features and configurability
https
	.createServer(
		{
			key: securityKey,
			cert: securityCertificate,
		},
		app
	)
	.listen(PORT, () => {
		console.log(`Server listening on Port: ${PORT}`);
	});
