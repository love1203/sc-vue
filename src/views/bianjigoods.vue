<template>
	<div class="adminhomebox">
		<div class="adminhome">
			<h1 class="adminhometitle">编辑商品</h1>
			<span @click.prevent="$router.go(-1)" class="goback">后退</span>
			<div class="addwarp">
				<form @submit.prevent="submit">
					<div class="inputgroup">
						<label>商品名称</label>
						<input type="text" placeholder="请输入商品名称" v-model="newgoods.goodsname">
					</div>
					<p class="errtext" v-if="errors.goodsname">{{errors.goodsname}}</p>
					<div class="inputgroup">
						<label>商品图片</label>
						<input type="text" placeholder="请输入商品图片" v-model="newgoods.goodsimg">
					</div>
					<p class="errtext" v-if="errors.goodsimg">{{errors.goodsimg}}</p>
					<div class="inputgroup">
						<label>商品价格</label>
						<input type="text" placeholder="请输入商品价格" v-model="newgoods.goodsprice">
					</div>
					<p class="errtext" v-if="errors.goodsprice">{{errors.goodsprice}}</p>
					<div class="inputgroup">
						<label>商品颜色</label>
						<input type="text" placeholder="请输入商品颜色" v-model="newgoods.goodssku">
					</div>
					<p class="errtext" v-if="errors.goodssku">{{errors.goodssku}}</p>
					<input type="submit" class="submit" value="确定">
				</form>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return {
				newgoods:{
					id:'',
					goodsname:'',
					goodsimg:'',
					goodsprice:'',
					goodssku:''
				},
				errors:{}
			}
		},
		
		methods:{
			submit(){
				this.$axios.post(`/api/goods/${this.newgoods.id}`,this.newgoods)
				.then(res=>{
					this.errors={}
					this.$router.push('/admin')
					
				})
				.catch(err=>this.errors=err.response.data)
			},
			geteditgoods(id){
				this.$axios.get(`/api/goods/${id}`)
				.then(res=>{
					//console.log(res.data)
					this.newgoods.id=res.data._id
					this.newgoods.goodsname=res.data.goodsname
					this.newgoods.goodsimg=res.data.goodsimg
					this.newgoods.goodsprice=res.data.goodsprice
					this.newgoods.goodssku=res.data.goodssku.join('，')
				})
				.catch(err=>console.log(err))
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm=>{
				vm.geteditgoods(to.params.id)
			})
		}
	}
	
</script>

<style scoped>
	.adminhomebox{width: 100%;background: #ccc;position: absolute;width: 100%;height: 100%;padding: 50px 0;}
	.adminhomebox .adminhome{width: 1020px;margin: 0 auto;background: #fff;padding: 40px;border-radius: 6px;position: relative;height: 700px;}
	.adminhomebox .adminhome .adminhometitle{font-size: 40px;text-align: center;color: #333;font-weight: normal;}
	.adminhomebox .adminhome .goback{position: absolute;top: 40px;left: 40px;display: block;width: 70px;height: 40px;background: #ccc;text-align: center;line-height: 40px;font-size: 14px;color: #666;border-radius: 5px;cursor: pointer;}
	
	.addwarp{margin-top: 50px;}
	.addwarp .inputgroup{width: 100%;height: 40px;margin-top: 30px;}
	.addwarp .inputgroup label{float: left;display: block;width: 9%;height: 40px;line-height: 40px;font-size: 14px;color: #555;}
	.addwarp .inputgroup input{float: left;width: 91%;height: 38px;border: 1px solid #999;border-radius: 3px;font-size: 14px;color: #555;padding: 0 10px;box-sizing: border-box;}
	.errtext{font-size: 12px;color: red;margin-top: 6px;padding-left: 9%;}
	.submit{width: 100%;height: 40px;border-radius: 3px;background: #008EDF;font-size: 14px;text-align: center;line-height: 40px;color: #fff;box-shadow: 0;border: 0;margin-top: 30px;cursor: pointer;}
</style>
