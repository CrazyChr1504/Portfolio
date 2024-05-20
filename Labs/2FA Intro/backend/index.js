const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000
const pool = require("./db")

app.use(cors())
app.use(express.json())

function randomizeCode() {
  return code
}
const FACode = "NTI2FA"

app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const account = await pool.query(
    `SELECT * FROM accounts WHERE email='${email}' AND password='${password}'`
  )
  res.json(account)
})

app.post("/getEmail", async (req, res) => {
  const { id } = req.body
  const email = await pool.query(
    `SELECT email FROM accounts WHERE id = '${id}'`
  )
  res.json(email.rows[0].email)
})

app.post("/sendEmail", async (req, res) => {
  const { id } = req.body
  const code = FACode
  const email = await pool.query(
    `SELECT email FROM accounts WHERE id = '${id}'`
  )
  res.json([email.rows[0].email, code])
})

app.listen(port, () => {
  console.log("server started on port:", port)
})