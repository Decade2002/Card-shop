import mysql from 'mysql'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
var router = express.Router()
var server = express()
// var query2 ='SELECT guest_id, picture_urls FROM user.reservations'
import db from './config/database.js'

server.use(cors({
    origin: '*'
}))
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
db.connect(function(err) {
  if (err) throw err;
});
server.post(`/users`, function(req, res) {
    var text = `INSERT INTO user (account, password, userName, address, phoneNumber) values (?, ?, ?, ? ,?)`
    var value = [req.body.account, req.body.password, req.body.userName, req.body.address, req.body.phoneNumber]
    db.query(text, value)
    console.log(req.body)
    return res.json({
        error: false,
        message: 'OK'
    })
})

server.post(`/users/update`, function(req, res) {
    var text = `UPDATE user SET userName = ?, address = ?, phoneNumber = ?, password = ? WHERE userID = ?`
    var value = [req.body.userName, req.body.address, req.body.phoneNumber, req.body.password, req.body.userID]
    db.query(text, value)
    console.log(req.body)
    return res.json({
        err: false,
        message: 'OK'
    })
})

server.get(`/users/update`, function(req, res) {
    return res.json({
        err: false,
        message: 'ok'
    })
})

server.post(`/receipt`, function(req, res) {
    var text = `INSERT INTO receipt (userID, date) values (?, ?)`
    var value = [req.body.userID, req.body.date]
    db.query(text, value)
    db.query(`SELECT MAX(receiptID) AS maxReceiptID FROM receipt`, function(err, data) {
        if(err) throw err
        var max = data
        console.log(max)
        return res.json({
            error: false,
            data: max
        })
    })
})

server.get(`/receipt`, function(req, res) {
    db.query(`SELECT * FROM yugioh.receipt`, function(error, data) {
        if(error) throw error
        var arr = data
        return res.json({
            err: false,
            data: arr
        })
    })
    console.log(req.params)
})

server.post(`/receiptCart`, function(req, res) {
    // console.log(req.body.array)
    var arr = req.body.array
    for(let i = 0; i < arr.length; i ++) {
        var text = `INSERT INTO receiptCart (receiptID, productID, number, totalPrice) values (?, ?, ?, ?)`
        var value = [arr[i].receiptID, arr[i].productID, arr[i].number, arr[i].totalPrice]
        console.log(value)
        db.query(text, value)
    }
    //console.log(req.body)
    return res.json({
        error: false,
        message: 'OK'
    })
})

server.get(`/receiptCart`, function(req, res) {
    db.query(`SELECT * FROM yugioh.receiptCart`, function(error, data) {
        if(error) throw error
        var arr = data
        return res.json({
            err: false,
            data: arr
        })
    })
    console.log(req.params)
})

server.get(`/users`, function(req, res) {
    db.query(`SELECT * FROM yugioh.user`, function(error, data) {
        if(error) throw error
        var arr = data
        // console.log(arr)
        return res.json({
            error: false,
            data: arr,
        })
    })
    console.log(req.params)
})

server.get('/products', function(req, res) {
    db.query(`SELECT * FROM yugioh.product`, function(error, data) {
        if(error) throw error
        var arr = data
        return res.json({
            error: false,
            data: arr,
        })
    })
    // console.log(req.params.name)
})

server.listen(3000, function() {
    console.log('start at 3000')
})

