<template>
	<div class="adminlogin">
		<div class="loginbox">
			<h2>登录</h2>
			<form @submit.prevent="submit">
				<div class="inputgroup">
					<label>邮箱</label>
					<input type="email" placeholder="请输入邮箱" v-model="newuser.email">
				</div>
				<p class="errtext" v-if="errors.email">{{errors.email}}</p>
				<div class="inputgroup">
					<label>密码</label>
					<input type="password" placeholder="请输入密码" v-model="newuser.password">
				</div>
				<p class="errtext" v-if="errors.password">{{errors.password}}</p>
				<input type="submit" class="submit" value="登录">
			</form>
		</div>
	</div>
</template>

<script>
	import jwt_decode from 'jwt-decode'
	export default {
		data(){
			return {
				newuser:{
					email:'',
					password:''
				},
				errors:{}
			}
		},
		methods:{
			submit(){
				this.$http.post('/api/users/login',this.newuser)
				.then(res=>{
					const token=res.data.token
					localStorage.setItem('jwt2',token)
					var decoded = jwt_decode(token);
					this.$store.dispatch('setusers1',decoded);
					this.$store.dispatch('setisLogin1',!this.isEmpty(decoded))
					this.$router.push('/')
					this.errors={}
				})
				.catch(err=>{
					this.errors=err.response.data
				})
			},
			isEmpty(value){
				return value === undefined || value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.trim().length === 0)
			}
		}
	}
</script>

<style scoped>
	.adminlogin{}
	.loginbox{width: 400px;padding: 40px 30px;margin: 120px auto 0;background: #fff;border-radius: 5px;border: 1px solid #ccc;}
	.loginbox h2{font-size: 20px;text-align: center;color: #333;font-weight: normal;}
	.loginbox .inputgroup{width: 100%;height: 40px;margin-top: 30px;}
	.loginbox .inputgroup label{float: left;display: block;width: 70px;height: 40px;line-height: 40px;font-size: 14px;color: #555;}
	.loginbox .inputgroup input{float: left;width: 308px;height: 38px;border: 1px solid #999;border-radius: 3px;font-size: 14px;color: #555;padding: 0 10px;}
	.errtext{font-size: 12px;color: red;margin-top: 6px;padding-left: 70px;}
	.submit{width: 100%;height: 40px;border-radius: 3px;background: #008EDF;font-size: 14px;text-align: center;line-height: 40px;color: #fff;box-shadow: 0;border: 0;margin-top: 30px;cursor: pointer;}
</style>
