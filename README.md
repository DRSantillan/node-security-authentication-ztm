# Node.js Security & Authentication

### Open SSL commands

> OpenSSl command to generate SSL key and certficate
> 
> ```javascript 
> openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 90 
> ``` 
>
> [OpenSSl Documentation](https://www.openssl.org/docs/)
> 
> 

### Helmet JS
> Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
> 
> ``` 
> yarn add helmet 
> ```
> 
> ```javascript
> import helmet from 'helmet';
> // initialize helmet adding it to express
> app.use(helmet());
> ```
> [Helmet Documentation](https://helmetjs.github.io/)

### JWT.io

> [Introduction to JSON Web Tokens
](https://jwt.io/introduction)

### OAuth 2.0
> OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices. This specification and its extensions are being developed within the IETF OAuth Working Group.
>
><hr>
>
> [Home Page](https://oauth.net/2/)

### Passport Js
> <strong style="color:green">Simple, unobtrusive authentication for Node.js</strong>
>
>Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
>
> <hr>
>
> [Documentation](https://oauth.net/2/)


### dotenv

>
>Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
> 
> ``` 
> yarn add dotenv 
> ```
>
> [Documentation](https://github.com/motdotla/dotenv#readme)
>
