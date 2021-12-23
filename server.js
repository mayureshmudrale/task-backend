import express from 'express'
import cors from 'cors'
import  mongoose  from 'mongoose'
import Pusher from 'pusher'
import dbModel  from './dbModel.js'
import dbModel2 from './dbModel2.js'
//app config 

const app = express();
const port = process.env.PORT || 8080;






//middleware 
app.use(express.json())
app.use(cors())


//DB config 
const connection_url ='mongodb+srv://mayureshmudrale:Akaishuichi@cluster0.13zpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connection_url)

mongoose.connection.once('open',()=>{
    console.log("db connected")

    
})




app.get('/',(req , res )=>res.status(200).send('hello world')) 

app.post("/upload",(req,res)=>{
    const body = req.body;

    dbModel.create(body,(err,data)=>{
        if(err){
            res.status(500).send(err);

        }else{
            res.status(201).send(data);
        }
    });


    




});

app.put("/",(req,res)=>{
    const body = req.body;
    console.log("update body ", body?._id);
    //res.status(200).send('hello world')
    dbModel.findOne({_id:body?._id},(err,data)=>{
    console.log({data})
        data.movie = body.movie;
        data.rating=body.rating;
        data.save();
        if(err){
            res.status(500).send(err);

        }
    })
    res.status(201).send("hello");
})
app.get("/sync",(req,res)=>{
    dbModel.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.get("/count",(req,res)=>{
    dbModel2.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });

})

app.get('/count/Add',(req,res)=>{
    dbModel2.findOneAndUpdate({_id:"61c4671f200d7a26cad6a554"},{ $inc: { add_api_count: 1 } }, {new: true },(err,data)=>{
        
        if(err){
            res.status(500).send(err);

        }else{
            res.status(201).send(data);
        }
    })
})

app.get('/count/update',(req,res)=>{
    dbModel2.findOneAndUpdate({_id:"61c4671f200d7a26cad6a554"},{ $inc: { update_api_count: 1 } }, {new: true },(err,data)=>{
    
        if(err){
            res.status(500).send(err);

        }else{
            res.status(201).send(data);
        }
    })
})

app.post('/count',(req,res)=>{
    const body = req.body;
    dbModel2.create(body,(err,data)=>{
        if(err){
            res.status(500).send(err);

        }else{
            res.status(201).send(data);
        }
    })
})


app.listen(port,()=>console.log(`listening on localhost :${port}`));