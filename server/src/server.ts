import { FastifyInstance } from 'fastify';
import createServer from './Utils/createServer';
import logger from './Utils/logger';
import {disconnectDB}  from './Utils/db';

async function shutdown(signal: string, app: FastifyInstance) {
    process.on(signal, async()=>{
        logger.info(`Goodbye!! got ${signal}`);
        app.close();
        await disconnectDB();
        logger.info("My work is done here");
        process.exit(0);
    })
    
}

async function main(){
    const app = createServer();
    try{
        const url = await app.listen(4000, 'localhost');
        logger.info(`Server running at ${url}`);
    }catch(err){
        logger.error(err);
        process.exit(1);
    }

    const signal = ['SIGTERM', 'SIGINT'];
    for(let i=0;i<signal.length;i++){
        shutdown(signal[i],app);
    }
}
main()
