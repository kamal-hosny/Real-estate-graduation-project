const CURRENCY_FORMATTER = new Intl.NumberFormat('en-EG', {
    currency: "EGP",
    style: "currency",
});

const formatCurrency = (number: number): string => {
    return CURRENCY_FORMATTER.format(number);
};

export default formatCurrency;
