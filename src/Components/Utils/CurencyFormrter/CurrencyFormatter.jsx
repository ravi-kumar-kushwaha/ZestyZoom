import React from 'react'

const CurrencyFormatter = new Intl.NumberFormat('INR', {
    style: 'currency',
    currency: 'INR',
})
export default CurrencyFormatter
