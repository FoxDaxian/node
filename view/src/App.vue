<style lang="scss" scoped>

</style>

<template>
	<div id="app">
		<div v-for="(item,index) in ajaxData" :data-id="item._id" @click="deleteFn($event, index)">
			年龄：{{item.name}}
			<br>
			年纪{{item.age}}
		</div >
		<div class="insert">
			<form >
				<div class="name">
					<input type="text" v-model="name" id="name">
					<label for="name"></label>
				</div>
				<div class="age">
					<input type="text" id="age" v-model="age">
					<label for="age"></label>
				</div>
				<input type="submit" @click="submit">
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return {
				ajaxData:[],
				name:"",
				age:""
			}
		},
		methods:{
			submit(e){
				this.$http({
					method:"post",
					url:"http://localhost:3000/insert",
					body:{
						name:this.name,
						age:this.age
					},
					emulateJSON: false
				}).then((data) => {
					if( data.body.code === 1 ){
						console.log('添加成功')
						this.ajaxData.push({
							name:this.name,
							age:this.age,
							_id:data.body._id
						});
						this.name = "";
						this.age = "";
					}
				},function(data) {
					console.log(data);
				});
				e.preventDefault();
			},
			deleteFn( e, index ){
				this.$http({
					method:"post",
					url:"http://localhost:3000/delete",
					body:{
						id:e.target.dataset.id
					}
				}).then((data) => {
					if( data.body.code === 1 ){
						console.log('删除成功');
						this.ajaxData.splice(index,1);
					}
				},(data) => {
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
						_id:el._id
					});
				});
			},(data) => {
				console.log(data);
			});
		}
	}
</script>
