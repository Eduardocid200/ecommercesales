export const formatPrice=
(amount: number)=>{
return new Intl.NumberFormat
    ('es-AR', {
        style:'currency',
        currency:'usd'
    }).format(amount)
}
