import { FastifyInstance } from 'fastify';
import { GetSkills } from '../controllers/dominate.controller';

async function dominateRoute(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/GetSkills',
        handler: GetSkills
    });
}

export default dominateRoute;
