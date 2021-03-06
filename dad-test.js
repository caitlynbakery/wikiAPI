//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
        
    });
});

app.post("/articles", (req, res)=> {
    console.log(req.body.title);
    console.log(req.body.content);
    const article = new Article({
        'title': req.body.title,
        'content': req.body.content
    });
    article.save((err)=> {
        if (!err) {
            res.send(req.body.title);
        } else {
            res.send(err);
        }
    });
});

app.delete("/articles", (req, res)=> {
    console.log("delete db");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});