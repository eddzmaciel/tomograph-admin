import io from 'socket.io-client';
import feathers from '@feathersjs/client';
const auth = require('@feathersjs/authentication-client');

const host = process.env.REACT_APP_URL_FEATHERS;
const socket = io(host);

// Set up Feathers client side
const app = feathers();

// Register socket.io
app.configure(
    feathers.socketio(socket, {
        timeout: 90000
    })
);
// app.configure(feathers.authentication());
app.configure(auth({ storage: window.localStorage }));

export default app;
