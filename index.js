const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();
var bodyParser = require('body-parser');


var jsonParser = bodyParser.json();
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


// Database Connection

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'dev321',
    database:'inventoryManagement'

});

// Check Error

db.connect(err=>{
   if(err){
    console.log(err);
   }
    console.log('database connected');
});

app.post('/Stocks',jsonParser, (req , res)=>{

    console.log(req.body, 'post data');
    let ItemId = req.body.ItemId;
    let ItemName = req.body.ItemName;
    let PricePerUnit = req.body.PricePerUnit;
    let ItemQuantity = req.body.ItemQuantity;
 
    let qr = `insert into Stocks(ItemId , ItemName, PricePerUnit, ItemQuantity)
                values('${ItemId}','${ItemName}', ${PricePerUnit}, ${ItemQuantity})`
        db.query(qr, (err, result)=>{
            // console.log("query ---",result)
            if(err){
            console.log(err);
                    }
            res.send({
                message: 'data inserted',
                  })
                    
                })
            });

  


app.get('/Stocks',(req , res)=>{
    let qr = `select * from Stocks`;
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err);
        }
      
            res.send({
               
                data : result
            })
    })
    console.log('get users');
})

app.post('/OrderLogs', (req , res)=>{

    console.log(req.body, 'post data');
    let OrderId = req.body.OrderId;
    let ItemId = req.body.ItemId;
    let Quantity = req.body.Quantity;
 
    let qr = `insert into OrderLog(OrderId , ItemId,Quantity )
                values('${OrderId}','${ItemId}',${Quantity})`
        db.query(qr, (err, result)=>{
            if(err){
            console.log(err);
                    }
            res.send({
                message: 'data inserted',
                  })
                    
                })
});

app.listen(3001 ,()=>{
    console.log('server running on port 3001')
});

app.post('/stockStatus', (req, res)=>{
    let ItemId = req.body.ItemId;
    let Status = req.body.Status;
    let NumberOfItemsLeft = req.body.NumberOfItemsLeft;
    let qr = `insert into StockStatus(ItemId , Status , NumberOfItemsLeft )
    values('${ItemId}','${Status}',${NumberOfItemsLeft})`
    db.query(qr, (err, result)=>{
    if(err){
        console.log(err);
        }
        res.send({
        message: 'data inserted',
        })
        
    })


})