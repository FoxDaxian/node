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
			async fn () {
                try {
                    this.progress.start()
                    const res = await this.$http({
                        method: 'get',
                        url: `${this.url}authentication`
                    })
                    console.log(res)
                } catch (err) {
                    console.log(err)
                    this.progress.done('fail')
                }
            }
		},
		mounted () {
			// 进行身份验证的地方
			this.fn()
			window.addEventListener('click', (e) => {
				this.outerOnoff && (this.outerOnoff = false)
			});
		}
	}
</script>
