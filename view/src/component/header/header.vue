<style lang="scss" scoped>
	@import "./header.scss";
</style>

<template>
	<header>
		<canvas class="logo" ref="canvas"></canvas>
		<div>登录</div>
	</header>
</template>

<script>
	export default {

		name: 'header',

		data () {
			return {

			};
		},
		mounted(){
			const canvas = this.$refs.canvas;
			canvas.width = 100;
			canvas.height = 50;
			const ctx = canvas.getContext("2d");


			ctx.font = "bold 40px Microsoft YaHei";
			ctx.fillStyle = "rgba(168,168,168,1)";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("f o x", canvas.width / 2, canvas.height / 2);



			var data = ctx.getImageData(0,0,canvas.width,canvas.height);
			console.log(data.data.length / canvas.height);


			//获取每一个点的颜色
			var initArr = [];	
			var x = 0, y = 0, x_len = data.data.length / canvas.height;
			for( ; y < canvas.height ; y++){
				x = 0;
				for( ; x < x_len; x+=4 ){
					var tempArr = [];
					tempArr.push([data.data[x + y * x_len],data.data[x + y * x_len + 1],data.data[x + y * x_len + 2],data.data[x + y * x_len + 3]]);
					tempArr.x = x / 4;
					tempArr.y = y;
					initArr.push(tempArr);
				}
			}


			function canvasAnimation() {
				ctx.clearRect(0,0,canvas.width,canvas.height);
				var i = 0, len = initArr.length;
				for( ; i < len; i++ ){
					ctx.fillStyle = `rgba(${initArr[i][0].join(",")})`;
					//还差波浪
					ctx.fillRect(initArr[i].x,initArr[i].y + Math.ceil(Math.random() * 4),1,1);
				}
				requestAnimationFrame(canvasAnimation);
			}
			canvasAnimation();
			




			
		}
	};
</script>