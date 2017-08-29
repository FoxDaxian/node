<style lang="scss" scoped>

</style>

<template>
	<div id="appWrap">
		<my-head></my-head>
		<my-content></my-content>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import myHead from "@/component/header/header"
	import myContent from "@/component/content/content"
	import myFooter from "@/component/footer/footer"

	export default {
		name: 'index',
		components:{
			myHead, myContent, myFooter
		},
		data () {
			return {
			}
		},
		methods:{
			async authentication ()  {
				try {
					this.progress.start()
					const res = await this.$http({
						method: 'get',
						url: `${this.url}authentication`
					})
					if (res.data.token) {
						this.$storeCommit('serUserInfo', res.data.token)
					} else {
						this.$storeCommit('serUserInfo', {})
					}
					this.progress.done()
				} catch (err) {
					this.progress.done('fail')
					console.log(err)
				}
			},
			async fn () {
				try {
					const res = await this.$http({
						method: 'get',
						url: `${ this.testUrl }`
					})
					console.log('七牛测试', res)
					console.log('http://oqvlh6ipq.bkt.clouddn.com/');
				} catch (err) {
					console.log('七牛测试失败', JSON.stringify(err, null, 4))
				}
			}
		},
		computed: {
			...mapState(['panelStatus'])
		},
		mounted () {
			this.authentication()
			// this.fn()
			window.addEventListener('click', (e) => {
				this.panelStatus && this.$storeCommit('togglePanel')
			});
		}
	}
</script>
