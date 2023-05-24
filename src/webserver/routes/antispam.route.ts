import { FastifyInstance } from 'fastify';
import { Chat } from '../controllers/antispam.controller';

async function antispamRoute(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/:serverPlugin',
        handler: Chat
    });
}

export default antispamRoute;
