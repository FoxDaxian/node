<style lang="scss" scoped>
	@import "../../common/style.scss";
	@import "./header.scss";
</style>

<template>
	<header>
		<canvas class="logo" ref="canvas" @click="backHome"></canvas>
		<div class="user_panel" @click="interactiveEvent">登录/注册</div>
	</header>
</template>

<script>
	import { canvasText } from "@/common/util"
	import { mapState } from 'vuex'

	export default {

		name: 'header',

		data () {
			return {

			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods:{
			backHome () {
				this.$router.push({
					name: 'home'
				})
			},
			// 用户互动, 根据store里有没有用户信息来决定header按钮的行为
			interactiveEvent () {
				if (Object.keys(this.userInfo).length) {
					this.switchOuter()
				} else {	
					this.$router.push({
						name: 'account'
					})
				}
			},
			// 切换 outer 组件的
			switchOuter ( e ) {
				const ev = e || window.event
				this.$emit('outer')
				ev.stopPropagation()
			}
		},
		mounted () {
			const canvas = this.$refs.canvas
			canvas.width = 80//三个字正好80，改变字数，改变宽度
			canvas.height = 40
			//还差 hover 文字静止效果
			//摆动速度，摆动幅度，流畅程度和曲线程度
			canvasText( canvas, "F o x", 1, 3, 150 )
		}
	}
</script>
