import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { Strategy } from 'passport-google-oauth20';
import { verify } from 'crypto';

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
	COOKIE_KEY_ONE: process.env.COOKIE_KEY_ONE,
	COOKIE_KEY_TWO: process.env.COOKIE_KEY_TWO,
};
const AUTH_OPTIONS = {
	callbackURL: '/auth/google/callback',
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
};
const AUTH_REDIRECT_OPTIONS = {
	failureRedirect: '/auth/failure',
	successRedirect: '/',
	session: true,
};
const AUTH_SCOPE_OPTIONS = {
	scope: ['email', 'profile'],
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
	console.log('Google profile:', profile);
	done(null, profile);
};

// passport strategy
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
// save session to the cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});
// read the session from the cookie
passport.deserializeUser((id, done) => {
	// we can connect to a db here to store user cookie data
	done(null, id);
});
// init express
const app = express();
// added security features to stop sniffing and hacking
app.use(helmet());
// cookie session
app.use(
	cookieSession({
		name: 'session',
		maxAge: 24 * 60 * 60 * 1000,
		keys: [config.COOKIE_KEY_ONE, config.COOKIE_KEY_TWO],
	})
);
//authentication middleware passport
app.use(passport.initialize());
app.use(passport.session());

// validate if user has logged
const validateUserCredentials = (req, res, next) => {
	console.log(`Current user is: ${req.user}`);
	const isLoggedIn = req.isAuthenticated() && req.user;
	if (!isLoggedIn) {
		return res.status(401).json({
			error: 'You must log in to access this content! ',
		});
	}
	next();
};
// google authentication endpoints
app.get('/auth/google/', passport.authenticate('google', AUTH_SCOPE_OPTIONS));
app.get(
	'/auth/google/callback',
	passport.authenticate('google', AUTH_REDIRECT_OPTIONS),
	(req, res) => {
		console.log('Google called us back!');
	}
);
//
app.get('/auth/logout', (req, res) => {
	req.logOut(); // removes req.user and clears logged session
	return res.redirect('/');
});
app.get('/auth/failure', (req, res) => {
	return res.send('Failed to log in....');
});

// client endpoints
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
