import { FastifyReply, FastifyRequest } from 'fastify';
import { DatabaseManager } from '../../database/database';
import { Account, AccountPunishment } from '../../database/models/accounts';
import Logger from '../../utils/log';

const logger = new Logger('PlayerAccount');

export enum PunishmentResponse {
    Punished = 'Punished',
    PunishmentRemoved = 'PunishmentRemoved',
    AccountDoesNotExist = 'AccountDoesNotExist',
    InsufficientPrivileges = 'InsufficientPrivileges',
    NotPunished = 'NotPunished'
}

export const GetAccount = async (
    request: FastifyRequest<{
        Body: string;
    }>,
    reply: FastifyReply
) => {
    const account = await DatabaseManager.getAccountByName(request.body);
    if (!account) {
        return reply.code(400);
    }
    const accountToken = await DatabaseManager.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
};

export const GetAccountByUUID = async (
    request: FastifyRequest<{
        Body: string;
    }>,
    reply: FastifyReply
) => {
    const account = await DatabaseManager.getAccountByUUID(request.body);
    if (!account) {
        return reply.code(400);
    }
    const accountToken = await DatabaseManager.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
};

export const Login = async (
    request: FastifyRequest<{
        Body: {
            Name: string;
            IpAddress: string;
            MacAddress: string;
            Uuid: string;
        };
    }>,
    reply: FastifyReply
) => {
    const account = await DatabaseManager.getAccountByUUID(request.body.Uuid);

    //Well **assuming server already makes an account before request**, this would be impossible to happen
    if (!account) {
        return reply.code(400);
    }

    if (account.name !== request.body.Name) {
        //Ehm... what the fuck idk if this is ideal or not
        //Update player name if they change it, uuid should be intact
        await Account.update(
            {
                name: request.body.Name
            },
            {
                where: {
                    uuid: request.body.Uuid
                }
            }
        );
        account.name = request.body.Name;
    }

    const accountToken = await DatabaseManager.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
};

export const GetPunishClient = async (
    request: FastifyRequest<{
        Body: string;
    }>,
    reply: FastifyReply
) => {
    const account = await DatabaseManager.getAccountByName(request.body);
    if (!account) {
        return reply.code(400);
    }
    const punishClient = await DatabaseManager.getPunishClient(account);
    reply.send(JSON.stringify(punishClient));
};

export const Punish = async (
    request: FastifyRequest<{
        Body: {
            Target: string;
            Category: string;
            Sentence: string;
            Reason: string;
            Duration: number;
            Admin: string;
            Severity: number;
        };
    }>,
    reply: FastifyReply
) => {
    const account = await DatabaseManager.getAccountByName(request.body.Target);
    if (!account) {
        reply.send(PunishmentResponse.AccountDoesNotExist);
        return;
    }
    try {
        await AccountPunishment.create({
            accountId: account.id,
            admin: request.body.Admin,
            category: request.body.Category,
            sentence: request.body.Sentence,
            time: Date.now(),
            reason: request.body.Reason,
            duration: request.body.Duration,
            severity: request.body.Severity,
            removed: false
        });
    } catch (ex) {
        logger.error(ex);
    }
    reply.send(PunishmentResponse.Punished);
};

export const RemovePunishment = async (
    request: FastifyRequest<{
        Body: {
            PunishmentId: number;
            Target: string;
            Reason: string;
            Admin: string;
        };
    }>,
    reply: FastifyReply
) => {
    const account = await DatabaseManager.getAccountByName(request.body.Target);

    //how did this even happen???
    if (!account) {
        reply.send(PunishmentResponse.AccountDoesNotExist);
        return;
    }

    await AccountPunishment.update(
        {
            removed: true,
            removedAdmin: request.body.Admin,
            removedReason: request.body.Reason
        },
        {
            where: {
                id: request.body.PunishmentId
            }
        }
    );

    reply.send(PunishmentResponse.PunishmentRemoved);
};
