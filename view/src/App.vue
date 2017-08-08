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
		},
		computed: {
			...mapState(['profile'])
		},
		mounted () {
			window.addEventListener('click', (e) => {
				this.profile && this.storeCommit('toggleProfile')
			});
		}
	}
</script>
