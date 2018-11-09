<template>
    <div class="admin">
      <admin-header></admin-header>
			<router-view></router-view>
    </div>
</template>

<script>
  import AdminHeader from '../components/adminheader'
	import jwt_decode from 'jwt-decode'
    export default {
      name: "admin",
      components:{
        AdminHeader
      },
			created(){
				if(localStorage.jwt1){
					let nowdata=Date.now()/1000
					var decoded = jwt_decode(localStorage.jwt1);
					if(nowdata>decoded.exp){
						this.$store.dispatch('clearuser')
						localStorage.removeItem('jwt1')
						this.$router.push('/admin/adminlogin')
					}else{
						this.$store.dispatch('setusers',decoded);
						this.$store.dispatch('setisLogin',!this.isEmpty(decoded))
					}
				}
			},
			methods:{
				isEmpty(value){
					return value === undefined || value === null ||
						(typeof value === "object" && Object.keys(value).length === 0) ||
						(typeof value === "string" && value.trim().length === 0)
				}
			}
    }
</script>

<style scoped>
.admin{position: absolute;width: 100%;height: 100%;overflow: hidden;}
</style>
