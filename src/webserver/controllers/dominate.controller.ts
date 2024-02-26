import { FastifyReply, FastifyRequest } from 'fastify';
import Logger from '../../utils/log';

const logger = new Logger('Dominate');

export async function GetSkills(request: FastifyRequest, reply: FastifyReply) {
    reply.send(JSON.stringify([]));
}
