import pgPromise from 'pg-promise';
const pgp = pgPromise();
const db = pgp({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.yiclsmvmhdpekkzilsvz',
    password: '7VWVrF1LKdy4L1RX'
});

export default db;