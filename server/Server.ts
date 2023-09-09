import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './src/utils/Config';
import router from './src/routes/MeetingRoutes';

const server = express();

server.use(cors());

server.use(express.json());

server.use(bodyParser.json());

server.use("/api/", router);

server.listen(config.WebPort, () => {
    console.log(`listinging on http://${config.mySQLhost}:${config.WebPort}`);
  });