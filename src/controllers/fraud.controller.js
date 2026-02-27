const FraudDetector = require("../services/FraudDetector")

function detectFraud(req, res) {
  try {
    const transactions = req.body

    if (!Array.isArray(transactions)) {
      return res.status(400).json({ error: "Input must be an array of transactions" })
    }

    const detector = new FraudDetector(transactions)
    const result = detector.detect()

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = {
  detectFraud
}