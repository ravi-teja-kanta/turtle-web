export function toINR(n: Number) {
    return n.toLocaleString('en-IN', { style: "currency", currency: "INR" ,maximumFractionDigits: 0 })
}