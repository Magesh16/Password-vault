import createServer from '../src/Utils/createServer';
import logger from '../src/Utils/logger'
async function main(){
    const app = createServer();
    try{
        const url = await app.listen(4000, 'localhost');
        logger.info(`Server running at ${url}`);
    }catch(err){
        logger.error(err);
        process.exit(1);
    }
}
main()
