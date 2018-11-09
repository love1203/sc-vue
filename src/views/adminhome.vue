<template>
	<div class="adminhomebox">
		<div class="adminhome">
			<h1 class="adminhometitle">商品管理</h1>
			<router-link tag='span' to='/admin/addgoods' class="addbtn">添加</router-link>
			<table class="goodstable">
				<tr class="goodstabletop">
					<td class="td1">商品名称</td>
					<td class="td2">图片地址</td>
					<td class="td3">商品价格</td>
					<td class="td4">商品颜色</td>
					<td class="td5">编辑商品</td>
				</tr>
				<tr v-for="(item,index) in goodslist" :key="index">
					<td><p class="td1">{{item.goodsname}}</p></td>
					<td><p class="td2">{{item.goodsimg}}</p></td>
					<td><p class="td3">{{item.goodsprice}}</p></td>
					<td class="td4">
						<p class="td4">
						 <span v-if="item.goodssku" v-for="(color,index1) in item.goodssku" :key='index1'>{{color}}，</span>
						 </p>
					</td>
					<td class="td5">
						
						<router-link class="bianji" :to='`/admin/editgoods/${item._id}`'>编辑</router-link>
						<a href="javescript:;" class="dele" @click.prevent="delegoods(item._id)">删除</a>
					</td>
				</tr>
				
			</table>
		</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return {
				goodslist:[]
			}
		},
		
		methods:{
			getgoods(){
				this.$axios.get('/api/goods')
				.then(res=>{
					//console.log(res.data)
					this.goodslist=res.data
				})
				.catch(err=>console.log(err))
			},
			//删除商品
			delegoods(id){
				this.$axios.delete(`/api/goods/de/${id}`)
				.then(res=>{
					this.getgoods()
				})
				.catch(err=>console.log(err))
			}
		},
		created(){
			this.getgoods()
		}
	}
	
</script>

<style scoped>
	.adminhomebox{width: 100%;background: #ccc;position: absolute;width: 100%;height: 100%;padding: 50px 0;}
	.adminhomebox .adminhome{width: 1020px;margin: 0 auto;background: #fff;padding: 40px;border-radius: 6px;position: relative;height: 700px;overflow-y: scroll;}
	.adminhomebox .adminhome .adminhometitle{font-size: 40px;text-align: center;color: #333;font-weight: normal;}
	.adminhomebox .adminhome .addbtn{position: absolute;top: 40px;right: 40px;display: block;width: 70px;height: 40px;background: #008EDF;text-align: center;line-height: 40px;font-size: 14px;color: #fff;border-radius: 5px;cursor: pointer;}
	
	.goodstable{width: 100%;font-size: 14px;color: #666;margin-top: 60px;text-align: center;border-collapse: collapse;border: 1px solid #ccc;}
	.goodstable tr{}
	.goodstable .goodstabletop{background: #008EDF;color: #fff;}
	.goodstable tr td{border: 1px solid #ccc;padding: 10px 10px;}
	.goodstable tr td .td1{width: 150px;height: 20px;line-height: 20px;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;margin: 0 auto;}
	.goodstable tr td .td2{width: 350px;height: 20px;line-height: 20px;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;margin: 0 auto;}
	.goodstable tr td .td3{width: 80px;height: 20px;line-height: 20px;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;margin: 0 auto;}
	.goodstable tr td .td4{width: 180px;height: 20px;line-height: 20px;white-space:nowrap;overflow: hidden;text-overflow:ellipsis;margin: 0 auto;}
	.goodstable tr .bianji{display: inline-block;width: 50px;height: 30px;background: green;color: #fff;text-align: center;line-height: 30px;border-radius: 4px;margin-right: 5px;}
	.goodstable tr .dele{display: inline-block;width: 50px;height: 30px;background: red;color: #fff;text-align: center;line-height: 30px;border-radius: 4px;margin-left: 5px;}
</style>
