const { RAPID_TX_LIMIT, RAPID_WINDOW_MS } = require("../config/constants")

function rapidTransactionRule(grouped) {
  const flagged = new Set()

  for (const [accountId, txs] of grouped.entries()) {
    let left = 0

    for (let right = 0; right < txs.length; right++) {
      while (txs[right].time - txs[left].time > RAPID_WINDOW_MS) {
        left++
      }

      if (right - left + 1 > RAPID_TX_LIMIT) {
        flagged.add(accountId)
        break
      }
    }
  }

  return flagged
}

module.exports = rapidTransactionRule