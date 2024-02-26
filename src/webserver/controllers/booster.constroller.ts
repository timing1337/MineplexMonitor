import { FastifyReply, FastifyRequest } from 'fastify';
import Logger from '../../utils/log';

const logger = new Logger('Boosters');

export async function GetBoosters(request: FastifyRequest, reply: FastifyReply) {
    reply.send(JSON.stringify({}));
}

export async function GetBoostersFromGroup(
    request: FastifyRequest<{
        Params: {
            serverGroup: string;
        };
    }>,
    reply: FastifyReply
) {
    const serverGroup = request.params.serverGroup;
    logger.log(`Retrieving boosters from group ${serverGroup}`);
    reply.send(JSON.stringify({}));
}
