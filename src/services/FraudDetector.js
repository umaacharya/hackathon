const groupTransactions = require("../utils/groupTransactions")
const dailyAmountRule = require("../rules/dailyAmountRule.")
const rapidTransactionRule = require("../rules/rapidTransactionRule")
const geoAnomalyRule = require("../rules/geoAnomalyRule")

class FraudDetector {
  constructor(transactions) {
    this.transactions = transactions || []
  }

  detect() {
    const grouped = groupTransactions(this.transactions)

    const dailyFlags = dailyAmountRule(grouped)
    const rapidFlags = rapidTransactionRule(grouped)
    const geoFlags = geoAnomalyRule(grouped)

    const result = new Map()

    const merge = (flags, reason) => {
      for (const accountId of flags) {
        if (!result.has(accountId)) {
          result.set(accountId, new Set())
        }
        result.get(accountId).add(reason)
      }
    }

    merge(dailyFlags, "High daily amount")
    merge(rapidFlags, "Multiple transactions in short time")
    merge(geoFlags, "Different cities within short duration")

    return Array.from(result.entries()).map(([accountId, reasons]) => ({
      accountId,
      reasons: Array.from(reasons)
    }))
  }
}

module.exports = FraudDetector