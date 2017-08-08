<style lang="scss" scoped>
	@import "../../common/style.scss";
	@import "./content.scss";
</style>

<template>
	<div class="contentWrap">
		<crumbs></crumbs>
		<div class="content">
			<router-view name="nav"></router-view>
			<router-view name="article"></router-view>
			<router-view name="sidebar"></router-view>
			<router-view></router-view>
		</div>
		<outer></outer>
	</div>
</template>

<script>
	import outer from './component/outer/outer'
	import crumbs from '@/component/content/component/crumbs/crumbs'

	export default {

		name: 'content',
		components:{
			outer, crumbs
		},
		data () {
			return {

			};
		}
	};
</script>