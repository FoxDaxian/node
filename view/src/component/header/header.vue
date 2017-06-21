<style lang="scss" scoped>
	@import "../../common/style.scss";
	@import "./header.scss";
</style>

<template>
	<header>
		<canvas class="logo" ref="canvas"></canvas>
		<div class="user_panel" @click="switchOuter">登录/注册</div>
	</header>
</template>

<script>
	import { canvasText } from "@/common/util";
	export default {

		name: 'header',

		data () {
			return {

			};
		},
		methods:{
			switchOuter( e ){
				const ev = e || window.event;
				this.$emit('outer');
				ev.stopPropagation();
			}
		},
		mounted(){
			const canvas = this.$refs.canvas;
			canvas.width = 80;//三个字正好80，改变字数，改变宽度
			canvas.height = 40;
			//hover 文字静止效果
			//摆动速度，摆动幅度，流畅程度和曲线程度
			canvasText( canvas, "F o x", 1, 3, 150 );
		}
	};
</script>