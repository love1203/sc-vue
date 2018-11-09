<template>
	<div class="adminlogin">
		<div class="loginbox">
			<h2>登录商城管理系统</h2>
			<form @submit.prevent="submit">
				<div class="inputgroup">
					<label>邮箱</label>
					<input type="email" placeholder="请输入邮箱" v-model="users.email">
				</div>
				<p class="errtext" v-if="errors.email">{{errors.email}}</p>
				<div class="inputgroup">
					<label>密码</label>
					<input type="password" placeholder="请输入密码" v-model="users.password">
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
				users:{
					email:'',
					password:''
				},
				errors:{}
			}
		},
		methods:{
			submit(){
				this.$axios.post('/api/users/admin',this.users)
				.then(res=>{
					const token=res.data.token
					localStorage.setItem('jwt1',token)
					//console.log(localStorage.jwt1)
					var decoded = jwt_decode(token);
					this.$store.dispatch('setusers',decoded);
					this.$store.dispatch('setisLogin',!this.isEmpty(decoded))
					this.$router.push('/admin')
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
	.adminlogin{position: absolute;top: 60px;width: 100%;height: 100%;background: #ccc;}
	.loginbox{width: 400px;padding: 40px 30px;margin: 60px auto 0;background: #fff;border-radius: 5px;}
	.loginbox h2{font-size: 20px;text-align: center;color: #333;font-weight: normal;}
	.loginbox .inputgroup{width: 100%;height: 40px;margin-top: 30px;}
	.loginbox .inputgroup label{float: left;display: block;width: 40px;height: 40px;line-height: 40px;font-size: 14px;color: #555;}
	.loginbox .inputgroup input{float: left;width: 338px;height: 38px;border: 1px solid #999;border-radius: 3px;font-size: 14px;color: #555;padding: 0 10px;}
	.errtext{font-size: 12px;color: red;margin-top: 6px;padding-left: 40px;}
	.submit{width: 100%;height: 40px;border-radius: 3px;background: #008EDF;font-size: 14px;text-align: center;line-height: 40px;color: #fff;box-shadow: 0;border: 0;margin-top: 30px;cursor: pointer;}
</style>
