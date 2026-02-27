const FraudDetector = require("./services/FraudDetector")

function detectFraud(transactions) {
  const detector = new FraudDetector(transactions)
  return detector.detect()
}

if (require.main === module) {
  const sampleInput = [
    { accountId: "A1", amount: 20000, timestamp: "2026-02-27T10:00:00Z", city: "Kolkata" },
    { accountId: "A1", amount: 20000, timestamp: "2026-02-27T10:00:30Z", city: "Kolkata" },
    { accountId: "A1", amount: 20000, timestamp: "2026-02-27T10:00:50Z", city: "Delhi" },
    { accountId: "A1", amount: 10000, timestamp: "2026-02-27T10:01:00Z", city: "Delhi" },
    { accountId: "A2", amount: 1000, timestamp: "2026-02-27T12:00:00Z", city: "Mumbai" }
  ]

  const result = detectFraud(sampleInput)
  console.log(JSON.stringify(result, null, 2))
}

module.exports = detectFraud