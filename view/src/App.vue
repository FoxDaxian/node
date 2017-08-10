<style lang="scss" scoped>

</style>

<template>
	<div id="app">
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
		name: 'app',
		components:{
			myHead, myContent, myFooter
		},
		data () {
			return {
			}
		},
		methods:{
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
			...mapState(['profile'])
		},
		mounted () {
			// this.fn()
			window.addEventListener('click', (e) => {
				this.profile && this.storeCommit('toggleProfile')
			});
		}
	}
</script>
