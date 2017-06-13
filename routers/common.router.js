const express = require("express");
const router = express.Router();

router.use( ( req, res, next ) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers",'x-requested-with, accept, origin, content-type');//处理发送json数据，非简单请求
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");//不缓存即不会出现304
	next();
});


module.exports = router;