import express from 'express'
import type { RequestProps } from './types'
import type { ChatMessage } from './chatgpt'
import { chatConfig, chatReplyProcess, currentModel } from './chatgpt'
import { auth } from './middleware/auth'
import { limiter } from './middleware/limiter'
import { isNotEmptyString } from './utils/is'
import mysql, { Pool } from 'mysql2/promise';
const app = express()
const router = express.Router()

// 从环境变量中获取数据库连接的参数
const MYSQL_URL = process.env.MYSQL_URL || 'mysql://root:9HAVsy8uphnRRVfw2gaS@containers-us-west-102.railway.app:6302/railway';
const MYSQL_HOST = process.env.MYSQLHOST || 'containers-us-west-102.railway.app';
const MYSQL_USER = process.env.MYSQLUSER || 'root';
const MYSQL_PASSWORD = process.env.MYSQLPASSWORD || '9HAVsy8uphnRRVfw2gaS';
const MYSQL_DATABASE = process.env.MYSQLDATABASE || 'railway';
const DB_PORT = Number(process.env.MYSQLPORT) || 6302

app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

router.post('/chat-process', [auth, limiter], async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')

  try {
    const { prompt, options = {}, systemMessage } = req.body as RequestProps
    let firstChunk = true
    await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false
      },
      systemMessage,
    })
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
})

router.post('/config', auth, async (req, res) => {
  try {
    const response = await chatConfig()
    res.send(response)
  }
  catch (error) {
    res.send(error)
  }
})
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
router.post('/tests', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows, fields] = await conn.query('SELECT * FROM UserKeys')
    res.send({ message: "查询成功！", data: rows })
  } catch (error) {
    res.status(500).send(error.message);
  }finally {
    if (conn) conn.release();
  }
})
router.post('/session', async (req, res) => {
  try {
    const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
    const hasAuth = isNotEmptyString(AUTH_SECRET_KEY)
    res.send({ status: 'Success', message: '', data: { auth: hasAuth, model: currentModel() } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body as { token: string }
    if (!token)
      throw new Error('Secret key is empty')

    if (process.env.AUTH_SECRET_KEY !== token)
      throw new Error('密钥无效 | Secret key is invalid')

    res.send({ status: 'Success', message: 'Verify successfully', data: null })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
})

app.use('', router)
app.use('/api', router)
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
