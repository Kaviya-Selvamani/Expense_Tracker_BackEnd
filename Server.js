const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Expense = require("./model/Schema");
app.use(express.json());
const cors = require('cors');
app.use(cors());
// const { useState, useId } = require('react');

const PORT = 4500;

mongoose.connect("mongodb+srv://kaviyaselvamani18_db_user:137872@cluster0.ladxejc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to MongoDB");    
}).catch((error)=>{
    console.log(error.message)
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.get("/get", async (req,res)=>{
    try{
        const expenses = await Expense.find();
        res.json({expenses})
    }catch(error){
            res.json({Message: error.message});
        }
    });

app.post("/post", async (req,res)=>{
    try{
        const {title, amount} = req.body;
        const NewExpense = new Expense({
            title, 
            amount
        });
        await NewExpense.save();
        res.json({Message: "Expense added successfully"})
    }
    catch(error){
        console.log(error.message);
        res.json({Message: error.message})
    }
});

app.delete("/delete/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        await Expense.findByIdAndDelete(id);
        res.json({Message: "Expense deleted successfully"})
    }catch(error){
        res.json({Message: error.message})
    }
});

// function ExpenseContainer(){
// const Expense = [
//     {
//         title: "Groceries", 
//         amount: 50
//     },
//     {
//         title: "Utilities", 
//         amount: 100
//     },
//     {
//         id: uuidv4(), 
//         title: "Rent", 
//         amount: 500
//     },
// ]
