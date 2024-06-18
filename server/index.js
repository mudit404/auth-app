const express= require('express');
const app= express();
const cors= require('cors');
const mongoose= require('mongoose')
const User= require('./models/user.model')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth-app')

app.post('/api/register', async (req, res)=>{
    const newPassword= await bcrypt.hash(req.body.password, 10);
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({status: 'ok'})
    }catch(err){
        console.log(err)
        res.json({status: 'error', error: 'Duplicte E-mail'})
    }
});

app.post('/api/login', async (req, res)=>{
    const user= await User.findOne({
        email: req.body.email,
    })

    if(!user){
        return res.json({status: 'error', error: 'Invalid Login'})
    }

    const isPasswordValid= await bcrypt.compare(req.body.password, user.password)

    if(isPasswordValid){
        const token= jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'qsxcefgvb'
        )
        return res.json({status: 'ok', user: token})
    }else{
        return res.json({status: 'error', user: false})
    }
});

app.get('/api/quote', async (req, res)=>{
    const token= req.headers['x-access-token']

    try{
        const decoded= jwt.verify(token, 'qsxcefgvb')
        const email= decoded.email
        const user= await User.findOne({email: email})

        return res.json({ status: 'ok', quote: user.quote, name: user.name})
    }catch(err){
        console.log(err)
        res.json({status: 'error', error:'invalid token'})
    }
});

app.post('/api/quote', async (req, res)=>{
    const token= req.headers['x-access-token']

    try{
        const decoded= jwt.verify(token, 'qsxcefgvb')
        const email= decoded.email
        await User.updateOne(
            {email: email},
            {$set: {quote: req.body.quote}},
        )

        return res.json({ status: 'ok'})
    }catch(err){
        console.log(err)
        res.json({status: 'error', error:'invalid token'})
    }
});

app.listen(1337, ()=> {
    console.log('sever started at 1337');
})
