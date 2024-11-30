import pgPromise from 'pg-promise';
const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'Integrador',
    user: 'postgres',
    password: 'Tt*070104'
});

export default db;