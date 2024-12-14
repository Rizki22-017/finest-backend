const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()

const db=mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

async function testconnection() {
    try {
        await db.getConnection()
        console.log("Database connected");
    } catch (error) {
        console.log("Connection failed", error)
    }
}

async function query(command, value) {
    try {
        const [value]=await db.query(command, value ?? [])
        return value
    } catch (error) {
        console.log(error)
    }
}

module.exports = {testconnection,query}