const express = require("express")
const app = express();
const port = 3000
const bodyParser = require("body-parser")

const users = [{
    name: "JOHN",
    kidneys: [{
        healthy:false
    }]
}]  

app.use(bodyParser.json())
app.get ("/",function(req,res){

    const johnKidneys = users[0].kidneys;
    const numofkidneys = johnKidneys.length;
    let numofHealthyKidneys = 0;
    for (i = 0 ; i < johnKidneys.length ; i++){
        if (johnKidneys[i].healthy){
            numofHealthyKidneys = numofHealthyKidneys + 1 ;
        }
    }
    const numberofunHealthyKidneys = numofkidneys - numofHealthyKidneys;

    res.json({
        numofkidneys,
        numberofunHealthyKidneys,
        numofHealthyKidneys
})
})
app.post("/", function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg:"Done"
    })
})

app.put("/",function(req,res){
    for ( i = 0 ; i < users[0].kidneys.length ; i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({
        msg: "done"
    })
})

app.delete("/",function(req,res){
    const newKidneys = [];
    for (i = 0 ; i < users[0].kidneys.length ; i++ ){
        if( users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg: "done"
    })
}  )

app.listen(port, ()=> {
    console.log(`app is listening on ${port}`)
})