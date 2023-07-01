const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
    target: 'http://localhost:1432',
    chnageOrigin: true,
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

    // Proxy Socket.IO requests to the Socket.IO server
    app.use(
        '/socket.io',
        createProxyMiddleware({
            target: 'http://localhost:1432',
            changeOrigin: true,
            ws: true,
            secure: false,
        })
    );
};