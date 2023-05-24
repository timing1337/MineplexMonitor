import { FastifyReply, FastifyRequest } from 'fastify';
import Logger from '../../utils/log';

const logger = new Logger('Boosters');

export const GetBoosters = async (request: FastifyRequest, reply: FastifyReply) => {
    //TOOD: Boosters
    reply.send(JSON.stringify({}));
};

export const GetBoostersFromGroup = async (
    request: FastifyRequest<{
        Params: {
            serverGroup: string;
        };
    }>,
    reply: FastifyReply
) => {
    //TOOD: Boosters
    const serverGroup = request.params.serverGroup;
    logger.log(`Retrieving boosters from group ${serverGroup}`);
    reply.send(JSON.stringify({}));
};
