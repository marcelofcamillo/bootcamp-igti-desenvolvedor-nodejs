import mongoose from 'mongoose';
import 'dotenv/config';

async function connect() {
  const uri = process.env.MONGO_DB_URI;
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connect };
