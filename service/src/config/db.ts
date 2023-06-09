import mysql, { Pool } from 'mysql2/promise';

const MYSQL_URL = process.env.MYSQL_URL || 'mysql://root:9HAVsy8uphnRRVfw2gaS@containers-us-west-102.railway.app:6302/railway';
const MYSQL_HOST = process.env.MYSQLHOST || 'containers-us-west-102.railway.app';
const MYSQL_USER = process.env.MYSQLUSER || 'root';
const MYSQL_PASSWORD = process.env.MYSQLPASSWORD || '9HAVsy8uphnRRVfw2gaS';
const MYSQL_DATABASE = process.env.MYSQLDATABASE || 'railway';
const DB_PORT = Number(process.env.MYSQLPORT) || 6302

const pool: Pool = mysql.createPool({
  url:MYSQL_URL,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;