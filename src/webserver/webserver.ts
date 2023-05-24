import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { Config } from '../utils/config';
import Logger from '../utils/log';
import antispamRoute from './routes/antispam.route';
import boosterRoute from './routes/booster.route';
import playerAccountRouter from './routes/playeraccount.route';

export class Webserver {
    public static readonly logger: Logger = new Logger('Webserver');

    public static async init() {
        const server = fastify();
        server.setErrorHandler((error, request, reply) => {
            Webserver.logger.error(error);
        });

        server.register(playerAccountRouter, { prefix: '/PlayerAccount' });
        server.register(antispamRoute, { prefix: '/chat' });
        server.register(boosterRoute, { prefix: '/booster' });

        server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
            reply.send('Mineplex Backend!');
        });

        await server.listen({
            port: Config.config.webserver.listenPort
        });
        this.logger.log(`Webserver is listening at ${Config.config.webserver.listenPort}`);
    }
}
