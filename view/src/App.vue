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
			
		},
		mounted () {
			window.addEventListener('click', (e) => {
				this.outerOnoff && (this.outerOnoff = false)
			});
		}
	}
</script>
