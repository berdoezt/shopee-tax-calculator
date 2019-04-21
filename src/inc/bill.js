const Joi = require('joi')

function isValid(item)
{
    const schema = {
        name: Joi.string().required(),
        price: Joi.number().integer().min(0).required(),
        tax_code: Joi.number().integer().min(1).max(3).required()
    }

    return Joi.validate(item, schema)
}

function isRefundable(tax_code)
{
    if(tax_code == 1)
        return true
    else
        return false
}

function getType(tax_code)
{
    if(tax_code == 1)
        return "Food & Beverage"
    else if(tax_code == 2)
        return "Tobacco"
    else if(tax_code == 3)
        return "Entertainment"
}

function getTax(tax_code, price)
{
    if(tax_code == 1)
        return price * 0.1
    else if(tax_code == 2)
        return (price * 0.02) + 10
    else if(tax_code == 3)
    {
        if(price > 0 && price < 100)
            return 0
        else
            return 0.01 * (price - 10)
    }
}

function calculateAmount(price, tax)
{
    return price + tax
}

module.exports = {isRefundable, getType, getTax, calculateAmount, isValid}