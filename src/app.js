const express = require("express")
const fraudRoutes = require("./routes/fraud.routes")

const app = express()

app.use(express.json())

app.use("/api/fraud", fraudRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Fraud Detection API Running" })
})
module.exports = app    
