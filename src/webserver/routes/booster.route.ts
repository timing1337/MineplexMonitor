import { FastifyInstance } from 'fastify';
import { GetBoosters, GetBoostersFromGroup } from '../controllers/booster.constroller';

async function boosterRoute(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: GetBoosters
    });

    fastify.route({
        method: 'GET',
        url: '/:serverGroup',
        handler: GetBoostersFromGroup
    });
}

export default boosterRoute;
