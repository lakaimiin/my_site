export function moneyWithComma(data){
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function moneyWithTwoDecimal(data){
    return data.toFixed(2)
}