<template>
	<div>
		<nav-header></nav-header>
		<router-view></router-view>
	</div>
</template>

<script>
	import NavHeader from '../components/header'
	import jwt_decode from 'jwt-decode'
	export default {
		components:{
			NavHeader
		},
		created(){
			if(localStorage.jwt2){
				let nowdata=Date.now()/1000
				var decoded = jwt_decode(localStorage.jwt2);
				if(nowdata>decoded.exp){
					this.$store.dispatch('clearuser1')
					localStorage.removeItem('jwt2')
					this.$router.push('/login')
				}else{
					this.$store.dispatch('setusers1',decoded);
					this.$store.dispatch('setisLogin1',!this.isEmpty(decoded))
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

<style>
</style>
