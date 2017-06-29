<style lang="scss" scoped>
	@import "../../../../assets/index.scss";
	@import "../../../../common/style.scss";
	@import "./sidebar.scss";
</style>

<template>
	<div class="sidebarWrap">
		<router-link to="a" tag="div" class="link" data-text="随便写点">
			<div class="iconWrap">
				<div class="icon_right"></div>
			</div>
			<span>随便写点</span>
		</router-link>
		<router-link to="a" tag="div" class="link" data-text="javascript">
			<div class="iconWrap">
				<div class="icon_right"></div>
			</div>
			<span>javascript</span>
		</router-link>
		<router-link to="a" tag="div" class="link" data-text="css">
			<div class="iconWrap">
				<div class="icon_right"></div>
			</div>
			<span>css</span>
		</router-link>
	</div>
</template>

<script>
	export default {

		name: 'sidebar',

		data () {
			return {

			};
		}
	};
</script>