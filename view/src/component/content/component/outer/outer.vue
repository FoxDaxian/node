<style lang="scss" scoped>
	@import "./outer.scss";
</style>

<template>
	<div class="outerWrap" :style="{right:`${right}px`,transform:`translateX(${constRight}px)`}" ref="outerWrap" @click="stopPropagation">

	</div>
</template>

<script>
	//点击从右侧边出来的东西
	export default {

		name: 'outer',
		props:["onoff"],
		data () {
			return {
				constRight:0,
				right:0,
			};
		},
		methods:{
			stopPropagation( e ){
				const ev = e || window.event;
				ev.stopPropagation();
			}
		},
		watch:{
			onoff( val, old ){
				this.right = val ? this.$refs.outerWrap.offsetWidth : 0;
			}
		},
		computed:{

		},
		mounted(){
			this.constRight = this.$refs.outerWrap.offsetWidth;
		}
	};
</script>