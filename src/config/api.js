export function fetchTrendingCoins(currency){
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=order_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
}