import { FastifyInstance } from 'fastify'
import { GetAccount, GetAccountByUUID, GetPunishClient, Login, Punish, RemovePunishment } from '../controllers/playeraccount.controller'

async function playerAccountRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/GetAccount',
        handler: GetAccount,
    })

    fastify.route({
        method: 'POST',
        url: '/GetAccountByUUID',
        handler: GetAccountByUUID,
    })

    fastify.route({
        method: 'POST',
        url: '/Login',
        handler: Login,
    })

    fastify.route({
        method: 'POST',
        url: '/GetPunishClient',
        handler: GetPunishClient,
    })
    
    fastify.route({
        method: 'POST',
        url: '/Punish',
        handler: Punish,
    })

    fastify.route({
        method: 'POST',
        url: '/RemovePunishment',
        handler: RemovePunishment,
    })
}

export default playerAccountRouter