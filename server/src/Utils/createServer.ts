import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { CORS_ORIGIN } from '../constant';
import jwt from '@fastify/jwt';
import fs from 'fs';
import path from 'path';
import fastifyCookie from '@fastify/cookie';
import userRoutes from '../Modules/user/user.route'
import vaultRoutes from '../Modules/vault/vault.route'

function createServer() {
    const app = fastify();
    app.register(cors, {
        origin: CORS_ORIGIN,
    });

    app.register(jwt, {
        secret: {
            private: fs.readFileSync(`${path.join(process.cwd()), "certs"}/private.key`),
            public: fs.readFileSync(`${path.join(process.cwd()), "certs"}/public.key`)
        },
        sign: { algorithm: "RS256" },
        cookie: {
            cookieName: "token",
            signed: false
        },
    });

    app.register(fastifyCookie, {
        parseOptions: {}
    })

    app.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const user = await req.jwtVerify<{
                _id: string
            }>();
            req.user = user;
        } catch (err) {
            return reply.send(err);
        }
    })

    app.register(userRoutes, {prefix:'api/user'});
    app.register(vaultRoutes, {prefix:'api/vault'});

    return app;
}
export default createServer;