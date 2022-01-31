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

