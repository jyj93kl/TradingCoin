const sharedObject = {
    selectMarkets : "upbit/markets",
    selectMarket : "upbit/market",
    accounts : "accounts",
    uuidv4 : "uuidv4",
    marketOrders : "upbit/coin/orders",
    marketOrder : "upbit/coin/order",
}

const serverMessage = {
    holdAssets      : "upbit/holdAssets",
    orders          : "upbit/orders",
    order           : "upbit/order",
    orderChance     : "upbit/orderChance",
    marketAll       : "upbit/marketAll",
    ticker          : "upbit/ticker",
    uuidv4          : "upbit/uuidv4",
    dayCandle          : "upbit/dayCandle"
}

module.exports = {
    sharedObject : sharedObject,
    serverMessage : serverMessage
}

