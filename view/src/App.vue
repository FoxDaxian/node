<style lang="scss" scoped>

</style>

<template>
	<div id="app">
		<top-loader></top-loader>
		<my-head></my-head>
	</div>
</template>

<script>
	import myHead from "@/component/header/header";
	import topLoader from "@/component/topLoader/topLoader";
	export default {
		name: 'app',
		components:{
			myHead,topLoader
		},
		data(){
			return {

			}
		},
		mounted(){

		}
	}
</script>
