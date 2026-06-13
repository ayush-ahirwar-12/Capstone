import httpServer from './src/app.js';

httpServer.listen(3000, () => {
    console.log('Sandbox agent server is running on port 3000');
    console.log('Socket.IO server is ready and listening on port 3000');
})