import { ensureFts } from '../lib/fts'; ensureFts().then(()=>{console.log('FTS ready');process.exit(0);}).catch(e=>{console.error(e);process.exit(1);});
