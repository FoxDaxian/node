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
	<img :src="userInfo.avator" alt="" v-if="userInfo.avator">
	<img :src="require(`@/assets/default-avator.png`)" alt="" v-else>
	<p v-text="userInfo.username ? userInfo.username : userInfo.account"></p>
	<p v-text="moment(userInfo.create_at).format('YYYY-MM-DD HH:mm:ss')"></p>
	<div class="profile">个人信息</div>
	<div class="signOut" @click="signOut">退出</div>
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
			async signOut () {
				try {
					this.progress.start()
					const res = await this.$http({
					    method: 'get',
					    url: `${this.url}signout`
					})
					this.storeCommit('serUserInfo')
					this.storeCommit('toggleProfile')
                    this.notice.msg(res.body.msg, 'success', 1)
	                this.progress.done()
				} catch (err) {
                    this.notice.msg(err.body.msg, 'danger', 1)
	                this.progress.done('fail')
				}
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
