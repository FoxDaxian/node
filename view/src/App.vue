<style lang="scss" scoped>

</style>

<template>
	<div id="app">
		<my-head @outer="outerFn"></my-head>
		<my-content :onoff="outerOnoff"></my-content>
		<my-footer></my-footer>
	</div>
</template>

<script>
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
				outerOnoff: false
			}
		},
		methods:{
			outerFn () {
				this.outerOnoff = !this.outerOnoff
			},
			async ajax () {
				try {
					const res = await this.$http({
						method: 'post',
						url: `${this.url}get`,
						body: {
							name: '冯世雨',
							age: ~~(Math.random() * 10)
						}
					})
					console.log(res)
					console.log(JSON.stringify(res, null, 4))
				} catch (err) {
					console.log(err)
				}
			}
		},
		mounted () {
			this.ajax()
			window.addEventListener('click', (e) => {
				this.outerOnoff && (this.outerOnoff = false)
			});
		}
	}
</script>
