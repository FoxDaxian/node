<style lang="scss" scoped>
	@import "../../common/style.scss";
	.topLoader{
		height: 8px;
		background-color: $main-color;
		.activeBar{
			height: 100%;
			width: 0;
			transition:0.3s;
		}
		.blueBar{
			background-color: #BFC9FE;
		}
		.greenBar{
			background-color: #13CE66;
		}
		.yellowBar{
			background-color: #F7BA2A;
		}
		.redBar{
			background-color: #FF4949;
		}
	}
</style>

<template>
	<div class="topLoader">
		<div class="activeBar" :style="{width:barWidth}" :class="[barClass]"></div>
	</div>
</template>

<script>
	export default {

		name: 'topLoader',

		data () {
			return {
				barWidth:"0",
				barClass:""
			};
		},
		mounted(){
			this.barWidth = "50%";
			this.barClass = "blueBar";
			setTimeout(() => {
				this.barWidth = "100%";
				this.barClass = "redBar";
			}, 200);
			// 再变回初始的颜色
		}
	};
</script>