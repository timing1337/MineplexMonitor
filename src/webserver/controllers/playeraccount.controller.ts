import { FastifyReply, FastifyRequest } from "fastify"
import { Json } from "sequelize/types/utils"
import { DatabaseManager } from "../../database/database"
import { Account } from "../../database/models/accounts"
import Logger from "../../utils/log"

const logger = new Logger("PlayerAccount");

export const GetAccount = async (request: FastifyRequest<{
    Body: string
}>, reply: FastifyReply) => {
    const account = await DatabaseManager.getAccountByName(request.body);
    if (!account) {
        return reply.code(400);
    }
    const accountToken = await DatabaseManager.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
}

export const GetAccountByUUID = async (request: FastifyRequest<{
    Body: string
}>, reply: FastifyReply) => {
    const account = await DatabaseManager.getAccountByUUID(request.body);
    if (!account) {
        return reply.code(400);
    }
    const accountToken = await DatabaseManager.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
}

export const Login = async (request: FastifyRequest<{
    Body: {
        Name: string,
        IpAddress: string,
        MacAddress: string,
        Uuid: string
    }
}>, reply: FastifyReply) => {
    logger.log("Received request")
    const account = await DatabaseManager.getAccountByUUID(request.body.Uuid);

    //Well **assuming server already makes an account before request**, this would be impossible to happen
    if (!account) {
        return reply.code(400);
    }

    if (account.name !== request.body.Name) {
        //Ehm... what the fuck idk if this is ideal or not
        //Update player name if they change it, uuid should be intact
        await Account.update({
            name: request.body.Name
        }, {
            where: {
                uuid: request.body.Uuid
            }
        })
        account.name = request.body.Name;
    }

    const accountToken = await DatabaseManager.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
}