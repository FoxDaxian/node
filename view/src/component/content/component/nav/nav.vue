<style lang="scss" scoped>
	@import "../../../../assets/index.scss";
	@import "../../../../common/style.scss";
	@import "./nav.scss";
</style>

<template>
	<div class="navWrap">
		<router-link to="/" tag="div" class="link">
			<div class="iconWrap">
				<div class="icon_tag"></div>
			</div>
			<div class="value">页面1</div>
		</router-link>
		<router-link to="/a" tag="div" class="link">
			<div class="iconWrap">
				<div class="icon_tag"></div>
			</div>
			<div class="value">页面2</div>
		</router-link>
		<router-link to="/aa" tag="div" class="link">
			<div class="iconWrap">
				<div class="icon_tag"></div>
			</div>
			<div class="value">页面3</div>
		</router-link>
		<router-link to="/aaa" tag="div" class="link">
			<div class="iconWrap">
				<div class="icon_tag"></div>
			</div>
			<div class="value">页面4</div>
		</router-link>
		<router-link to="/aaaa" tag="div" class="link">
			<div class="iconWrap">
				<div class="icon_tag"></div>
			</div>
			<div class="value">页面5</div>
		</router-link>
	</div>
</template>

<script>
	export default {

		name: 'nav',

		data () {
			return {

			};
		}
	};
</script>