import mongodb from 'mongodb';
import 'dotenv/config';

function getClient() {
  const uri = process.env.MONGO_DB_URI;

  return new mongodb.MongoClient(uri);
}

export { getClient };
