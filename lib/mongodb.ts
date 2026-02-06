import { MongoClient, Db } from 'mongodb';

const uri: string = String(process.env.MONGODB_URI || '');

if (!uri) {
  console.warn('MONGODB_URI is not set - database operations will fail until it is configured');
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (uri) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    } else {
      globalWithMongo._mongoClientPromise = Promise.reject(new Error('MONGODB_URI is not set'));
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  if (uri) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } else {
    clientPromise = Promise.reject(new Error('MONGODB_URI is not set'));
  }
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('valentines');
}
