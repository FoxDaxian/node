<style lang="scss" scoped>
	@import "./content.scss";
</style>

<template>
	<div class="contentWrap">
		<router-view name="crumbs"></router-view>
		<div class="content">
			<router-view name="nav"></router-view>
			<router-view name="article"></router-view>
			<router-view name="sidebar"></router-view>
		</div>
		<outer :onoff="onoff"></outer>
	</div>
</template>

<script>
	import outer from "./component/outer/outer";
	export default {

		name: 'content',
		props:["onoff"],
		components:{
			outer
		},
		data () {
			return {

			};
		}
	};
</script>