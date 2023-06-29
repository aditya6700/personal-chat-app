const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
    target: 'http://localhost:1432',
    chnageOrigin: true
}

module.exports = function (app) {
    app.use(
        '/api/user',
        createProxyMiddleware(proxy)
    );
    
    app.use(
        '/api/msg',
        createProxyMiddleware(proxy)
    );
};