const express = require("express")
const app = express()
const cors = require("cors")
const port = 5000
const pool = require("./db")

app.use(cors())
app.use(express.json())
// create a new account

function decrypt(string) {
  const key = process.env.REACT_APP_SECURITY
  let result = '';
    for (let i = 0; i < string.length; i++) {
        const charCode = string.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result.split(", ")
}
function encrypt(string) {
  const key = process.env.REACT_APP_SECURITY
  let result = '';
    for (let i = 0; i < string.length; i++) {
        const charCode = string.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result
}
app.post("/create", async (req, res) => {
    const { userData } = req.body
    const newUser = decrypt(userData)
    const username = newUser[0]
    const email = newUser[1]
    const password = newUser[2]
    const role = newUser[3]
    
    try {
    
        const newAccount = await pool.query(
            `INSERT INTO accounts (username, password, email, role) VALUES('${username}', '${password}', '${email}', '${role}') RETURNING *`
        )
        res.json(newAccount)
    } catch (err) {
        console.error(err.message)
        
    }
})

// get all accounts
app.get("/accounts", async (req, res) => {
    const allAccounts = await pool.query("SELECT * FROM accounts ORDER BY id DESC")
    res.json(allAccounts.rows)
})

// uppdate name
app.post("/update/name", async (req, res) => {
    const { id, username } = req.body
    const updateAccount = await pool.query(
        `UPDATE accounts SET username = '${username}' WHERE id = ${id}`
    )
    res.json(updateAccount)
})

// update password
app.post("/update/password", async (req, res) => {
    const { id, password } = req.body
    const updateAccount = await pool.query(
        `UPDATE accounts SET password = '${password}' WHERE id = ${id}`
    )
    res.json(updateAccount)
})

// update email
app.post("/update/email", async (req, res) => {
    const { id, email } = req.body
    const updateAccount = await pool.query(
        `UPDATE accounts SET email = '${email}' WHERE id = ${id}`
    )
    
})

// get week
function getWeek() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
    
    return Math.ceil(days / 7);
}

// get day
function getDay() {
    let day;
    switch (new Date().getDay()) {
        case 0: 
            day = "sunday" 
            break;
        case 1: 
            day = "monday" 
            break;
        case 2: 
            day = "tuesday"
            break;
        case 3: 
            day = "wednesday"
            break;
        case 4: 
            day = "thursday"
            break;
        case 5: 
            day = "friday"
            break;
        case 6: 
            day = "saturday"
            break;
    }
    return day;
}

// checkin with week
app.post("/weekly/checkin", async (req, res) => {
    const { id, name} = req.body
    let fullDate = new Date().toLocaleString()
    let time = fullDate.slice(11, 16)
    let week = getWeek()
    const day = getDay()
    const dayInsert =  "19:00"
    const weeks = await pool.query(`SELECT * FROM weekly WHERE user_id = ${id} AND week = '${week}'`)
    if (weeks.rows.length === 0) {
        console.log("no week")
        const newWeek = await pool.query(
            `INSERT INTO weekly (user_id, username, week, ${day}) VALUES (${id}, '${name}', ${week}, ARRAY['${time}', '${dayInsert}']) RETURNING *`
        )
        res.json(newWeek.rows[0])
    } else {
        const newWeek = await pool.query(
            `UPDATE weekly SET ${day} = ARRAY['${time}', '${dayInsert}'] WHERE user_id = ${id} AND week = '${week}'`
        )
        res.json(newWeek.rows[0])
    }
})

// checkout with week
app.post("/weekly/checkout", async (req, res) => {
    const { id, name} = req.body
    let fullDate = new Date().toLocaleString()
    let time = fullDate.slice(11, 16)
    const week = getWeek()
    const day = getDay()
    const weeks = await pool.query(
        `UPDATE weekly SET ${day}[2] = '${time}' WHERE user_id = ${id} AND username = '${name}' AND week = '${week}'`
    )
    res.json(weeks.rows[0])
})

// get all weekly
app.get("/weekly", async (req, res) => {
    const allWeekly = await pool.query("SELECT * FROM weekly")
    res.json(allWeekly.rows)
})

// get all weekly this week
app.get("/weekly/thisweek", async (req, res) => {
    const week = getWeek()
    const allWeekly = await pool.query(`SELECT * FROM weekly WHERE week = '${week}'`)
    res.json(allWeekly.rows)
})

// get three weeks
app.post("/weekly/threeweeks", async (req, res) => {
    const { id } = req.body
    const week = getWeek()
    const allWeekly = await pool.query(`SELECT * FROM weekly WHERE week = '${week}' AND user_id = '${id}' OR week = '${week - 1}' AND user_id = '${id}' OR week = '${week - 2}' AND user_id = '${id}' ORDER BY week ASC`)
    res.json(allWeekly.rows)
})

// get week of specific user
app.post("/weekly/user", async (req, res) => {
    const { id } = req.body
    const week = getWeek()
    const allWeekly = await pool.query(`SELECT * FROM weekly WHERE user_id = ${id} AND week = '${week}'`)
    res.json(allWeekly.rows)
})

// make sick
app.post("/weekly/sick", async (req, res) => {
    const { id } = req.body
    const week = getWeek()
    const day = getDay()
    const allWeekly = await pool.query(`UPDATE weekly SET ${day} = ARRAY['sick', 'sick'] WHERE user_id = ${id} AND week = '${week}'`)
    res.json(allWeekly.rows)
})

// get email from specific teacher
app.post("/email", async (req, res) => {
      const email = await pool.query(`SELECT * FROM accounts WHERE role = 'Teacher'`)
      res.json(email.rows)
    })
    

// login
app.post("/login", async (req, res) => {
    const { userData } = req.body
    const user = decrypt(userData)
    const email = user[0]
    const password = user[1]
    
    const account = await pool.query(
        `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`
    )
    const string = `${account.rows[0].email}, ${account.rows[0].password}`
    const encryptRes = encrypt(string)
    res.json(encryptRes)
})

// app.post("/")
app.listen(port, () => {
    console.log("server started on port:", port)
})