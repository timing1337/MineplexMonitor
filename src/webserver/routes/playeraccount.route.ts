import { FastifyInstance } from 'fastify';
import { CoinReward, GemReward, GetAccount, GetAccountByUUID, GetMatches, GetPunishClient, Login, Punish, PurchaseUnknownSalesPackage, RemovePunishment } from '../controllers/playeraccount.controller';

async function playerAccountRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/GetAccount',
        handler: GetAccount
    });

    fastify.route({
        method: 'POST',
        url: '/GetAccountByUUID',
        handler: GetAccountByUUID
    });

    fastify.route({
        method: 'POST',
        url: '/Login',
        handler: Login
    });

    fastify.route({
        method: 'POST',
        url: '/GetPunishClient',
        handler: GetPunishClient
    });

    fastify.route({
        method: 'POST',
        url: '/Punish',
        handler: Punish
    });

    fastify.route({
        method: 'POST',
        url: '/RemovePunishment',
        handler: RemovePunishment
    });

    fastify.route({
        method: 'POST',
        url: '/GetMatches',
        handler: GetMatches
    });

    fastify.route({
        method: 'POST',
        url: '/CoinReward',
        handler: CoinReward
    });

    fastify.route({
        method: 'POST',
        url: '/GemReward',
        handler: GemReward
    });

    fastify.route({
        method: 'POST',
        url: '/PurchaseUnknownSalesPackage',
        handler: PurchaseUnknownSalesPackage
    });
}


export default playerAccountRouter;
