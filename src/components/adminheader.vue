<template>
  <div class="adminheader">
    <div class="adheaderbox">
      <ul class="aheadercenter">
        <li>商城管理系统</li>
        <li class="active1">商品管理</li>
        <li>用户管理</li>
      </ul>
			<router-link to='/admin/adminlogin' class="login" v-if='!isLogin'>登录</router-link>
			<div class="loginout" v-if="isLogin">
				<div class="avatarimg">
					<img :src="users.avatar">
				</div>
				<span @click="loginout">退出</span>
			</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "adminheader",
				computed:{
					isLogin(){
						return this.$store.getters.isLogin
					},
					users(){
						return this.$store.getters.users
					}
				},
				methods:{
					loginout(){
						localStorage.removeItem('jwt1')
						this.$store.dispatch('clearuser')
						this.$router.push('/admin/adminlogin')
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
.adminheader .adheaderbox .loginout{float: right;height: 60px;}
.adminheader .adheaderbox .loginout .avatarimg{width: 40px;height: 40px;background: #008EDF;float: left;margin-top: 10px;position: relative;overflow: hidden;border-radius: 50%;}
.adminheader .adheaderbox .loginout .avatarimg img{width: 40px;height: 40px;position: absolute;}
.adminheader .adheaderbox .loginout span{float: left;line-height: 60px;font-size: 14px;color: #fff;margin-left: 10px;cursor: pointer;}
</style>
