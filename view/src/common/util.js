function canvasText(canvas, text, speedRange, range, stopRange) {
    const ctx = canvas.getContext("2d");
    //写文字
    ctx.font = "36px Microsoft YaHei";
    ctx.fillStyle = "rgb(76, 78, 99)"; //紫灰色
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    //获取imageData
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);


    //获取每一个点的颜色
    const initArr = [];
    var x = 0,
    y = 0,
    x_len = canvasData.data.length / canvas.height;
    for (; y < canvas.height; y++) {
        x = 0;
        for (; x < x_len; x += 4) {
            var tempArr = [];
            if (canvasData.data[x + y * x_len + 3]) {
                tempArr.push([canvasData.data[x + y * x_len], canvasData.data[x + y * x_len + 1], canvasData.data[x + y * x_len + 2], canvasData.data[x + y * x_len + 3]]);
                tempArr.x = x / 4;
                tempArr.y = y;
                initArr.push(tempArr);
            }
        }
    }

    //动画
    var speedInit = 0, //初始化
        inSpeedRange = speedRange, //上下摆动速度
        inRange = range, //上下摆动幅度
        inStopRange = stopRange, //流畅程度和曲线程度
        len = initArr.length;

        function canvasAnimation() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var i = 0;
            for (; i < len; i++) {
                ctx.fillStyle = `rgba(${initArr[i][0].join(",")})`;
            //原理：以X来区分不同列，然后做波浪运动
            ctx.fillRect(initArr[i].x, initArr[i].y + Math.ceil(Math.sin(2 * Math.PI / inStopRange * (initArr[i].x + speedInit)) * inRange), 1, 1);
        }
        speedInit += inSpeedRange;
        requestAnimationFrame(canvasAnimation);
    }
    canvasAnimation();
    //hover的时候，让文字停下来
}
export { canvasText };
