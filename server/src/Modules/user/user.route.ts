import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
function userRoutes(app: FastifyInstance, _: FastifyPluginOptions, done: (err?: FastifyError) => void) {
    done();
}

export default userRoutes;