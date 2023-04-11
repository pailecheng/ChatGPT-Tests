import mysql from 'mysql2/promise';

function createConnectionPool(): mysql.Pool {
  return mysql.createPool({
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    connectionLimit: 10,
    timezone: '+00:00',
  });
}

export default createConnectionPool;