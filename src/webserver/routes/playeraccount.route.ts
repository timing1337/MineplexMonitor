import { FastifyInstance } from 'fastify'
import { GetAccount, GetAccountByUUID, Login } from '../controllers/playeraccount.controller'

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
}

export default playerAccountRouter