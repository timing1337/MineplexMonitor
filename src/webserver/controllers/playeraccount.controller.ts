import { FastifyReply, FastifyRequest } from 'fastify';
import AccountRepository from '../../repositories/account_repository';
import DonationRepository from '../../repositories/donation_repository';
import PunishmentRepository from '../../repositories/punishment_repository';
import Logger from '../../utils/log';
import { LoginToken } from '../token/account';
import { CurrencyRewardToken, UnknownPurchaseToken } from '../token/donor';
import { PunishToken, RemovePunishToken } from '../token/punish';
import { Accounts } from '../../database/models/accounts';

const logger = new Logger('PlayerAccount');

export async function PurchaseUnknownSalesPackage(request: FastifyRequest<{ Body: UnknownPurchaseToken }>, reply: FastifyReply) {
    const account = await AccountRepository.getAccountByName(request.body.AccountName);
    if (!account) return reply.code(400);
    return await DonationRepository.purchaseUnknownSalesPackage(request.body);
}

export async function CoinReward(request: FastifyRequest<{ Body: CurrencyRewardToken }>, reply: FastifyReply) {
    reply.send(await DonationRepository.RewardCoins(request.body));
}

export async function GemReward(request: FastifyRequest<{ Body: CurrencyRewardToken }>, reply: FastifyReply) {
    reply.send(await DonationRepository.RewardGems(request.body));
}

export async function GetMatches(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) {
    reply.send(await AccountRepository.getAccountNamesMatching(request.body));
}

export async function GetAccount(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) {
    const account = await AccountRepository.getAccountByName(request.body);
    if (!account) return reply.code(400);
    const accountToken = await AccountRepository.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
}

export async function GetAccountByUUID(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) {
    const account = await AccountRepository.getAccountByUUID(request.body);
    if (!account) return reply.code(400);
    const accountToken = await AccountRepository.getAccountToken(account);
    reply.send(JSON.stringify(accountToken));
}

export async function Login(request: FastifyRequest<{ Body: LoginToken }>, reply: FastifyReply) {
    const account = await AccountRepository.getAccountByUUID(request.body.Uuid);
    if (!account) return reply.code(400);
    if (account.name !== request.body.Name) {
        await Accounts.update(
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
    reply.send(JSON.stringify(await AccountRepository.getAccountToken(account)));
}

export async function GetPunishClient(request: FastifyRequest<{ Body: string }>, reply: FastifyReply) {
    const account = await AccountRepository.getAccountByName(request.body);
    if (!account) return reply.code(400);
    reply.send(JSON.stringify(await PunishmentRepository.getPunishClient(account)));
}

export async function Punish(request: FastifyRequest<{ Body: PunishToken }>, reply: FastifyReply) {
    reply.send(await PunishmentRepository.Punish(request.body));
}

export async function RemovePunishment(request: FastifyRequest<{ Body: RemovePunishToken }>, reply: FastifyReply) {
    reply.send(await PunishmentRepository.RemovePunishment(request.body));
}
