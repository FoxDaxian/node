<style lang="scss" scoped>

</style>

<template>
	<div id="app">
		<div v-for="item in ajaxData">
			{{item.name}}{{item.age}}
		</div >
		<div class="insert">
			<div class="name">
				<input type="text" v-model="name" id="name">
				<label for="name"></label>
			</div>
			<div class="age">
				<input type="text" id="age" v-model="age">
				<label for="age"></label>
			</div>
			<input type="submit" @click="submit">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return {
				ajaxData:[],
				name:"啦啦啦",
				age:"44"
			}
		},
		methods:{
			submit(){
				this.$http({
					method:"post",
					url:"http://localhost:3000/insert",
					body:{
						name:this.name,
						age:this.age
					},
					emulateJSON: false
				}).then(function(data) {
					console.log(data);
				},function(data) {
					console.log(data);
				});
			}
		},
		mounted(){
			this.$http({
				method:"get",
				url:"http://localhost:3000/",

			}).then((data) => {
				data.body.forEach(( el, i ) => {
					this.ajaxData.push({
						name:el.name,
						age:el.age,
					});
				});
			},(data) => {
				console.log(data);
			});
		}

	}
</script>
