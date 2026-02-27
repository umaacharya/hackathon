const { GEO_WINDOW_MS } = require("../config/constants")

function geoAnomalyRule(grouped) {
  const flagged = new Set()

  for (const [accountId, txs] of grouped.entries()) {
    let left = 0
    const cityMap = new Map()

    for (let right = 0; right < txs.length; right++) {
      const city = txs[right].city
      cityMap.set(city, (cityMap.get(city) || 0) + 1)

      while (txs[right].time - txs[left].time > GEO_WINDOW_MS) {
        const leftCity = txs[left].city
        cityMap.set(leftCity, cityMap.get(leftCity) - 1)

        if (cityMap.get(leftCity) === 0) {
          cityMap.delete(leftCity)
        }

        left++
      }

      if (cityMap.size > 1) {
        flagged.add(accountId)
        break
      }
    }
  }

  return flagged
}

module.exports = geoAnomalyRule