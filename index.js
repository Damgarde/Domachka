
import express from 'express'
import { createServer } from 'http'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Server } from 'socket.io'
import initSocket from './util/initSocket.js'
import cors from 'cor';
import * as dotenv from 'dotev';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url))

const options = [
    cors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: true,
    })
];

const app = express();
app.use(options);
const server = createServer(app);

app.use(express.static(join(__dirname, '../client/dist')))

app.get('/', (req, res) => {
   res.send('Hello !');
});

const io = new Server(server, { cors: { origin: '*'}, transports: ['websocket', 'polling'] } );
io.on('connection', initSocket)

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server ready  ${port} 🚀`)
})
