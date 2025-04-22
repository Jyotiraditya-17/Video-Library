const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");

const port = "mongodb://127.0.0.1:27017";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let db;

mongodb.MongoClient.connect(port)
.then( client => {
    db = client.db("Video-Library");
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log(err);
})

app.get('/admin' , (req , res) => {
    db.collection("admin").find({}).toArray()
    .then(result => {
        res.send(result);
    })
})

app.get('/users' , (req , res) => {
    db.collection("users").find({}).toArray()
    .then(result => {
        res.send(result);
    })
})

app.get('/videos' , (req , res) => {
    db.collection("videos").find({}).toArray()
    .then(result => {
        res.send(result);
    })
})

app.get('/videos/:id' , (req , res) =>{
    var id = parseInt(req.params.id);
    
    db.collection("videos").findOne({video_id : id})
    .then(result => {
        res.send(result);
    })
})

app.get('/categories' , (req , res) => {
    db.collection("categories").find({}).toArray()
    .then(result => {
        res.send(result);
    })
})


app.get('/get-video/by-category' , (req , res) => {

    const categoryName = req.query.name;

    // return res.send("Category not found " + categoryName);

    db.collection("categories").findOne({category_name : {$regex : categoryName, $options : 'i'}})

    .then( category => {
        if(!category) {
            return res.status(404).send("Category not found");
        }

        db.collection("videos").find({category_id : category.category_id}).toArray()
        .then (videos => {
            res.send(videos);
        })
        .catch(err => console.log(err));
    })
    .catch(err => { console.log(err)});
})


app.get('/videos/search' , (req , res) => {
    const categoryName = req.query.name;

    return res.send("Category not found " + categoryName);

    console.log("Hello");

    db.collection("categories").findOne({category_name : categoryName})

    .then( category => {
        if(!category) {
            return res.status(404).send("Category not found");
        }

        db.collection("videos").find({category_id : category.category_id}).toArray()
        .then (videos => {
            res.send(videos);
        })
        .catch(err => console.log(err));
    })
    .catch(err => { console.log(err)});
})



app.post('/register-user' , (req , res) => {
    var user = {
        userid : req.body.userid,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    }

    db.collection("users").insertOne(user)
    .then( () => {
        console.log("User registered..")
        res.send();
    })
})



app.post('/add-video' , (req,res) => {
    var video = {
        video_id : parseInt(req.body.video_id),
        title : req.body.title,
        description : req.body.description,
        url : req.body.url,
        likes : parseInt(req.body.likes),
        dislikes : parseInt(req.body.dislikes),
        views : parseInt(req.body.views),
        category_id : parseInt(req.body.category_id)
    }

    db.collection("videos").insertOne(video)
    .then( () => {
        console.log("Video added..")
        res.send();
    })
})


/*app.post('/videos/:id/inc-views' , (req , res) => {
    const videoId = parseInt(req.params.id);

    db.collection("videos").updateOne(
        { video_id : videoId },
        { $inc : {views : 1} }
    )
    .then( () => {
        console.log("Views incremented..")
        res.send();
    })

}) */



app.put('/edit-video/:id' , (req , res) => {
    var id = parseInt(req.params.id);

    var video = {
        video_id : parseInt(req.body.video_id),
        title : req.body.title,
        description : req.body.description,
        url : req.body.url,
        likes : parseInt(req.body.likes),
        dislikes : parseInt(req.body.dislikes),
        views : parseInt(req.body.views),
        category_id : parseInt(req.body.category_id)
    }

    db.collection("videos").updateOne({video_id:id} , {$set : video})
    .then( () => {
        console.log("Video updated..");
        res.send();
    })
})


app.delete('/dlt-video/:id' , (req,res) => {
    var id = parseInt(req.params.id);
    db.collection("videos").deleteOne({video_id : id})
    .then( () => {
        console.log("Video deleted..");
        res.send();
    })
})

// app.listen(5050);
// console.log("Server started at port http://127.0.0.1:5050");

app.listen(5050, () => {
    console.log(`Server is running at http://localhost:5050`); 
  });