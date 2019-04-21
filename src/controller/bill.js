const express = require('express')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const router = express.Router()
const bill = require('../../models').bill
const billInc = require('../inc/bill')

router.get('/', (req, res, next) => {
    bill.findAll({
        where: {
            state: {
                [Op.eq] : 1
            }
        }
    })
        .then(bills => {
            var response = {
                error: false,
                message: "Successfully get bills",
                data: {
                    count: bills.length,
                    items: [],
                    price_subtotal: 0,
                    tax_subtotal: 0,
                    grand_total: 0
                }
            }

            for (var bill of bills) 
            {
                var temp = {}
                temp.id = bill.id
                temp.name = bill.name
                temp.tax_code = bill.tax_code
                temp.price = parseInt(bill.price)
                temp.isRefundable = billInc.isRefundable(bill.tax_code)
                temp.type = billInc.getType(bill.tax_code)
                temp.tax = billInc.getTax(bill.tax_code, bill.price)
                temp.amount = billInc.calculateAmount(temp.price, temp.tax)
                temp.created_date = bill.created_date
                temp.updated_date = bill.updated_date
                
                response.data.price_subtotal += temp.price
                response.data.tax_subtotal += temp.tax
                response.data.grand_total += temp.amount
                response.data.items.push(temp)
            }

            res.status(200).send(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.get('/:id', (req, res, next) => {
    bill.findOne({
        where: {
            id: req.params.id,
            state: {
                [Op.eq] : 1
            }
        }
    })
        .then(bill => {
            if(bill)
            {
                var response = {
                    error : false,
                    message : "Successfully get bill item",
                    data : {}
                }

                var temp = {}
                temp.id = bill.id
                temp.name = bill.name,
                temp.tax_code = bill.tax_code
                temp.price = parseInt(bill.price)
                temp.isRefundable = billInc.isRefundable(bill.tax_code)
                temp.type = billInc.getType(bill.tax_code)
                temp.tax = billInc.getTax(bill.tax_code, bill.price)
                temp.amount = billInc.calculateAmount(temp.price, temp.tax)
                temp.created_date = bill.created_date
                temp.updated_date = bill.updated_date

                response.data = temp
                res.status(200).json(response)
            }
            else
            {
                var error = new Error()
                error.message = "Not found"
                error.status = 404
                next(error)
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.post('/', (req, res, next) => {
    var isValid = billInc.isValid(req.body)

    if(isValid.error)
    {
        var error = {}
        error.message = isValid.error.details[0].message
        error.status = 400
        next(error)

        return
    }

    bill.build({
        name: req.body.name,
        tax_code: req.body.tax_code,
        price: req.body.price
    })
        .save()
        .then(bill => {
            var response = {
                error : false,
                message : "Successfully create bill item",
                data : {}
            }

            var temp = {}
            temp.id = bill.id
            temp.name = bill.name,
            temp.tax_code = bill.tax_code
            temp.price = parseInt(bill.price)
            temp.isRefundable = billInc.isRefundable(bill.tax_code)
            temp.type = billInc.getType(bill.tax_code)
            temp.tax = billInc.getTax(bill.tax_code, bill.price)
            temp.amount = billInc.calculateAmount(temp.price, temp.tax)
            temp.created_date = bill.created_date
            temp.updated_date = bill.updated_date

            response.data = temp
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })

})

router.patch('/:id', (req, res, next) => {
    var isValid = billInc.isValid(req.body)

    if(isValid.error)
    {
        var error = {}
        error.message = isValid.error.details[0].message
        error.status = 400
        next(error)

        return
    }

    bill.update({
        name: req.body.name,
        tax_code: req.body.tax_code,
        price: req.body.price,
        updated_date: Date.now()
    },
    {
        where:{
            id: req.params.id,
            state: {
                [Op.eq] : 1
            }
        }
    })
        .then((bill) => {
            if(bill[0])
            {
                var response = {
                    error : false,
                    message : "Successfully update bill item"
                }
    
                res.status(200).json(response)
            }
            else
            {
                var error = new Error()
                error.message = "Not found"
                error.status = 404
                next(error)
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.delete('/:id', (req, res, next) => {
    bill.update({
        state: 4,
        updated_date: Date.now()
    },
    {
        where:{
            id: req.params.id,
            state: {
                [Op.eq]: 1
            }
        }
    })
        .then((bill) => {
            if(bill[0])
            {
                var response = {
                    error : false,
                    message : "Successfully delete bill item"
                }
                res.status(200).json(response)
            }
            else
            {
                var error = new Error()
                error.message = "Not found"
                error.status = 404
                next(error)
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
})

module.exports = router