import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;
const port = config.port || 3000;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(port, () => {
      console.log(`app is listening on port http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

