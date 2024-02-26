import { FastifyInstance } from 'fastify';
import { Chat, ChatFilter } from '../controllers/antispam.controller';

async function antispamRoute(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/:serverPlugin',
        handler: Chat
    });

    fastify.route({
        method: 'POST',
        url: '/content/item/moderate',
        handler: ChatFilter
    });
}

export default antispamRoute;
