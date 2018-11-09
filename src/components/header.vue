<template>
  <div class="adminheader">
    <div class="adheaderbox">
      <ul class="aheadercenter">
        <li>购物商场</li>
				<router-link tag='li' class="active1" to='/'>商品管理</router-link>
        <li>用户管理</li>
      </ul>
			
			<router-link to='/login' class="login" v-if='!isLogin1'>登录</router-link>
			<router-link to='/register' class="register" v-if='!isLogin1'>注册</router-link>
			<div class="loginout"  v-if='isLogin1'>
				<div class="avatarimg">
					<img :src="users1.avatar" @click="touxianghanle">
				</div>
				<span @click="loginout">退出</span>
			</div>
			<router-link class="gwcimg" tag='div' to='/cart'>
				<img src="../assets/img/gwc.png" />
				<span v-if='isLogin1'>{{cartnum}}</span>
			</router-link>
			
    </div>
  </div>
</template>

<script>
    export default {
        name: "adminheader",
		computed:{
			isLogin1(){
				return this.$store.state.isLogin1
			},
			users1(){
				return this.$store.state.users1
			},
			cartnum(){
				return this.$store.getters.cartnum
			}
		},
		methods:{
			loginout(){
				localStorage.removeItem('jwt2')
				this.$store.dispatch('clearuser1')
				this.$router.push('/login')
			},
			touxianghanle(){
				this.$router.push('/order')
			}
		}
    }
</script>

<style scoped>
.adminheader{width: 100%;height: 60px;background: #333;}
.adminheader .adheaderbox{width: 1100px;height: 100%;margin: 0 auto;}
.adminheader .adheaderbox .aheadercenter {font-size: 14px;float: left;height: 100%;}
.adminheader .adheaderbox .aheadercenter li{float: left;line-height: 60px;color: #fff;padding: 0 20px;height: 60px;}
.adminheader .adheaderbox .aheadercenter .active1{background: #444;}
.adminheader .adheaderbox .login{display: block;float: right;padding: 0 40px;height: 60px;font-size: 14px;color: #fff;background: #008edf;line-height: 60px;color: #fff;}
.adminheader .adheaderbox .register{display: block;float: right;padding: 0 40px;height: 60px;font-size: 14px;color: #fff;line-height: 60px;color: #fff;}
.adminheader .adheaderbox .loginout{float: right;height: 60px;margin-left: 20px;}
.adminheader .adheaderbox .loginout .avatarimg{width: 40px;height: 40px;background: #008EDF;float: left;margin-top: 10px;position: relative;overflow: hidden;border-radius: 50%;}
.adminheader .adheaderbox .loginout .avatarimg img{width: 40px;height: 40px;position: absolute;}
.adminheader .adheaderbox .loginout span{float: left;line-height: 60px;font-size: 14px;color: #fff;margin-left: 10px;cursor: pointer;}
.gwcimg{float: right;width: 30px;height: 26px;margin-top: 17px;position: relative;cursor: pointer;}
.gwcimg img{position: absolute;width: 100%;height: 100%;}
.gwcimg span{position: absolute;top: -10px;right: -10px;display: block;width: 20px;height: 20px;background: red;border-radius: 50%;font-size: 14px;color: #fff;
text-align: center;line-height: 20px;}
</style>
