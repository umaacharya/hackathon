function groupTransactions(transactions) {
  const grouped = new Map()

  for (const tx of transactions) {
    if (!grouped.has(tx.accountId)) {
      grouped.set(tx.accountId, [])
    }

    grouped.get(tx.accountId).push({
      ...tx,
      time: new Date(tx.timestamp).getTime()
    })
  }

  for (const txs of grouped.values()) {
    txs.sort((a, b) => a.time - b.time)
  }

  return grouped
}

module.exports = groupTransactions