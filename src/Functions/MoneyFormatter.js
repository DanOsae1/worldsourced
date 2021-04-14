export default function (amount, currency) {

    if (currency) {
        return amount
    }

    return "£" + (amount / 10).toFixed(2)
}