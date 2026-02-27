const { DAILY_LIMIT } = require("../config/constants")

function dailyAmountRule(grouped) {
  const flagged = new Set()

  for (const [accountId, txs] of grouped.entries()) {
    const dailyMap = new Map()

    for (const tx of txs) {
      const date = new Date(tx.time).toISOString().split("T")[0]

      if (!dailyMap.has(date)) {
        dailyMap.set(date, 0)
      }

      dailyMap.set(date, dailyMap.get(date) + tx.amount)

      if (dailyMap.get(date) > DAILY_LIMIT) {
        flagged.add(accountId)
      }
    }
  }

  return flagged
}

module.exports = dailyAmountRule