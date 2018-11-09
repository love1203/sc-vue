<template>
	<div class="tankuan">
		<h1>添加地址</h1>
		<form @submit.prevent='submit'>
			<div class="tkgroup">
				<span>收货人姓名</span>
				<input class="input1" type="text" v-model="newaddress.name" />
			</div>
			<div class="tkgroup">
				<span>收货人电话</span>
				<input class="input1" type="text" v-model="newaddress.phone" />
			</div>
			<div class="tkgroup">
				<span>收货地址</span>
				<input class="input1" type="text" v-model="newaddress.address" />
			</div>
			<input class="submit" type="submit" value="添加">
		</form>
		<b @click="closehanle">x</b>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				newaddress:{
					name:'',
					phone:'',
					address:''
				}
			}
		},
		methods:{
			closehanle(){
				this.$emit('closetk')
			},
			submit(){
				//console.log(this.newaddress)
				this.$http.post('/api/cart/address',this.newaddress)
				.then(res=>{
					console.log(res.data)
					this.$emit('closetk')
				})
				.catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.tankuan{width: 600px;background: #fff;position: absolute;border: 1px solid #ccc;padding: 40px;border-radius: 5px;top: 200px;left: 210px;}
	.tankuan h1{font-size: 20px;color: #333;text-align: center;}
	.tankuan .tkgroup{width: 100%;height: 30px;margin-top: 30px;}
	.tankuan .tkgroup span{float: left;line-height: 30px;font-size: 14px;color: #666;width: 100px;display: block;}
	.tankuan .tkgroup .input1{float: left;width: 490px!important;font-size: 14px;color: #666;width: 538px;height: 28px;display: block;border-radius: 3px;border: 1px solid #ccc;}
	.tankuan .submit{display: block;width: 400px;background: #008EDF;border: none;height: 40px;font-size: 14px;color: #fff;border-radius: 5px;margin: 40px auto 0;}
	.tankuan b{position: absolute;top: 10px;right: 20px;color: #666;font-size: 20px;cursor: pointer;}
</style>
