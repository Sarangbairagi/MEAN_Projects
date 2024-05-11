const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//npm install mongodb
const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017/";

const client = new MongoClient(URL);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DataBase Side API

// MongoDB Connection Signup collection 
async function GetConnection()
{
  console.log("Database Connected");
  let result = await client.connect();
  let db = result.db("DairyMilk");
  return db.collection("Signup");
}

// MongoDB Connection AdminLogin collection 
async function GetConnectionAdmin()
{
  console.log("Database Connected");
  let result = await client.connect();
  let db = result.db("DairyMilk");
  return db.collection("AdminLoginData");
}

// Insert Data into MongoDB from SignUp
async function SignupInsertData(iData)
{
  console.log("insert signup function");
  let data = await GetConnection();
  let result = await data.insertOne(iData);

  if (result.acknowledged) {
    console.log("Data inserted successfully");
  }
}

// Read Data into MongoDB from SignUp
async function SignupReadData() 
{
  console.log("sinup Read Data");
  let data = await GetConnection();
  data = await data.find().toArray();
  console.log("Data from the Signup Database is :");
  // console.log(data);
  return data;
}

// Read Data into MongoDB from AdminLogin
async function AdminLoginData() 
{
  console.log("sinup Read Data");
  let data = await GetConnectionAdmin();
  data = await data.find().toArray();
  console.log("Data from the Signup Database is :");
  // console.log(data);
  return data;
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server Side API

// insert Signup data
async function signupinsertdata(req, res) 
{
  let data = req.body;
  let SignUpData = [];
  let BOOL = true;
  
  console.log("InsertData function");

  console.log(data);
  
  SignUpData = await SignupReadData();

  for (i = 0; i < SignUpData.length; i++) 
  {
    if(data.email == SignUpData[i].email)
    {
      BOOL = false;
      return res.send(BOOL);
    }
  }

  if(BOOL == true)
  {
    // Insert data from MongoDB
    SignupInsertData(data);
    console.log("signup data Inserted")
    return res.send(true); 
  }
  
}


function verifyToken(req, res, next) 
{
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

function verifyTokenadmin(req, res, next) 
{
  if (!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') 
  {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) 
  {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

// Login Function 

async function loginCustomer(req, res) 
{
  let userData = req.body
  let i = 0;
  let sRet;
 
  console.log("Inside in loginCustomer");

  SignUpData = await SignupReadData();

  for (i = 0; i < SignUpData.length; i++) 
  {
    console.log("Inside in loginCustomer Loop");
    // console.log(SignUpData[i].email);
    if(userData.email == SignUpData[i].email) 
    {
      if(userData.password == SignUpData[i].password)
      {
        // console.log("Inside in loginCustomer IF Part");
        let payload = { subject: 1 }
        let token = jwt.sign(payload, 'secretKey')
        return res.status(200).send({token})
      }
      sRet = "Password Not Match";
      break;
    }
    sRet = "Id Not Match";
  }
  
  if(sRet == "Id Not Match")
  {
    return res.json("Id Not Match");
  }
  if(sRet =="Password Not Match")
  {
    return res.json("Password Not Match");
  }
}



async function AdminLogin(req, res)
{
    
  let userData = req.body
  let i = 0;
  let sRet;
 
  console.log("Inside in loginCustomer");

  AdminData = await AdminLoginData();

  for (i = 0; i < AdminData.length; i++) 
  {
    console.log("Inside in loginCustomer Loop");
    // console.log(SignUpData[i].email);
    if(userData.email == AdminData[i].email) 
    {
      if(userData.password == AdminData[i].password)
      {
        // console.log("Inside in loginCustomer IF Part");
        let payload = { subject: 1 }
        let token = jwt.sign(payload, 'secretKey')
        return res.status(200).send({token})
      }
      sRet = "Admin Password Not Match";
      break;
    }
    sRet = "Admin Id Not Match";
  }
  
  if(sRet == "Admin Id Not Match")
  {
    return res.json("Id Not Match");
  }
  if(sRet =="Admin Password Not Match")
  {
    return res.json("Password Not Match");
  }
}

async function dashboarddata(req, res) 
{

  console.log("in Dash board");
  let specialEvents = [
    {
      "_id": "1",
      "name": "IOT",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "2",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "3",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "4",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "5",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "6",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "6",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "6",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "6",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
  ]
  res.json(specialEvents);
}

async function admindata(req, res)
{
  let admindata = [
    {
      "_id": "1",
      "name": "IOT",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "2",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    }
  ]
  res.json(admindata);

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////
//  main
//  Entry point function
//////////////////////////////////////////////////////

function main() 
{
  GetConnection();

  router.post('/Insertsignupdata', signupinsertdata);

  router.post('/login', loginCustomer);

  router.post('/adminlogin', AdminLogin);

  router.get('/DashBoard', verifyToken, dashboarddata);

  router.get('/AdminDash', verifyTokenadmin, admindata);

}

main();


module.exports = router;