import { FastifyReply, FastifyRequest } from 'fastify';
import Logger from '../../utils/log';

const logger = new Logger('Dominate');

export const GetSkills = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send(JSON.stringify([]));
};