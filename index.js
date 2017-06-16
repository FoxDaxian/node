const express = require("express");
const app = express();
const bodyParser = require('body-parser');//需要这个中间件来处理post请求
const config = require("./config/");

const {Blog} = require("./model/");

//连接数据库
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog");
const db = mongoose.connection;
db.on("error",function(error) {
	console.log(`连接数据库失败：${error}`);
});
db.on("open",function() {
	console.log("连接数据库成功");
});

app.use(express.static("public"));//设置资源目录

//处理json与formData数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const commonRouter = require("./routers/common.router.js");


app.use( commonRouter );

app.get("/",function( req, res ) {
	Blog.find(function( err, data ) {
		if( err ){
			console.log("查询数据库失败");
			return
		}
		res.send(data);
	});
});

app.get("/get",function( req, res ) {
	Blog.find(function( err, data ) {
		if( err ){
			console.log("查询数据库失败");
			return
		}
		res.send(data);
	});
});
app.post("/insert",function( req, res ) {
	var data = req.body;
	var temp = new Blog({
		name:data.name,
		age:data.age
	});
	temp.save().then( ( data ) => {
		res.send({
			code:1,
			data
		});
	});
});
app.post("/delete",function( req, res ) {
	var data = req.body;
	Blog.remove( {_id:data.id}, ( err ) => {
		if( err ){
			console.log(err);
			res.send({
				code:0
			});

		}else{
			res.send({
				code:1
			});
		}
	});
});


app.listen(config.port);