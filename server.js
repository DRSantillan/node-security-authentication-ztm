import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

// authentication

// server config
const PORT = 4444;
// keys to make server secure
const securityKey = fs.readFileSync('key.pem');
const securityCertificate = fs.readFileSync('cert.pem');

// api keys
dotenv.config();
// google api keys
const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
};
const AUTH_OPTIONS = {
	callbackURL: '/auth/google/callback',
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
	console.log('Google profile:', profile);
	done(null, profile);
};

// passport strategy
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();
// added security features to stop sniffing and hacking
app.use(helmet());
//authentication middleware passport
app.use(passport.initialize());

const validateUserCredentials = (req, res, next) => {
	const isLoggedIn = true;
	if (!isLoggedIn) {
		return res.status(401).json({
			error: 'You must log in to access this content! ',
		});
	}
	next();
};
//
app.get('/auth/google/', (req, res) => {});
app.get('/auth/google/callback', (req, res) => {});
app.get('/auth/logout', (req, res) => {});
app.get('/', (req, res) => {
	res.sendFile(path.resolve('public', 'index.html'));
});

app.get('/secret', validateUserCredentials, (req, res) => {
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
