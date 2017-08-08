<style lang="scss" scoped>
    @import "~common";
	@import "./outer.scss";
</style>

<template>
	<div 
	tabindex="0" 
	hidefocus="true"
	class="outerWrap" 
	:style="{right:`${right}px`,transform:`translateX(${constRight}px)`}" 
	ref="outerWrap" 
	@click="stopPropagation"
	@keydown="hidePanel"
	>
		<p v-text="userInfo.username ? userInfo.username : userInfo.account"></p>
		<p v-text="userInfo.email"></p>
		<button @click="gotothe">点击</button>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	//点击从右侧边出来的东西
	export default {

		name: 'outer',
		data () {
			return {
				constRight:0
			}
		},
		methods: {
			stopPropagation (e) {
				const ev = e || window.event
				ev.stopPropagation()
			},
			// 为什么用keydown而不用keypress？
			// 因为键盘上非字符的键位不会触发keypress
			hidePanel (e) {
				const ev = e || window.event
				if (ev.keyCode === 27) {
					this.profile && this.storeCommit('toggleProfile')
				}
			},
			gotothe () {
				this.storeCommit('toggleProfile')
			}
		},
		computed: {
			...mapState(['userInfo', 'profile']),
			right () {
				if (this.profile) {
					this.$refs.outerWrap.focus()
				}
				return this.profile ? this.$refs.outerWrap.offsetWidth : 0
			}
		},
		mounted () {
			this.constRight = this.$refs.outerWrap.offsetWidth
		}
	}
</script>
