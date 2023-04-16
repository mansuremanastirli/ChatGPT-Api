const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const fetch = require("node-fetch")

dotenv.config()

const app = express()

const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(express.json())

// http://localhost:5000/completions

app.post("/completions", async (req, res) => {
    try {
        const { message } = req.body

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-0301",
                messages: [{ role: "user", content: `${message}` }],
                max_tokens: 100
            })
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()

        res.send(data)

    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`${PORT}. Port Dinleniyor`)
})