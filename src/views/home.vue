<template>
	<div class="home clear">
		<div class="goods1" v-for="(item,index) in goodslist" :key='index'>
			<div class="goodsimg">
				<img :src="item.goodsimg" />
			</div>
			<p class="goodstitle">{{item.goodsname}}</p>
			<p class="goodssku">颜色：<span v-for="(color,index) in item.goodssku" :key='index'>{{color}}，</span></p>
			<p class="goodsprice">{{item.goodsprice}}</p>
			<a href="javescript:;" class="goodsgm" @click.prevent="addcart(item)">加入购物车</a>
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
		computed:{
			isLogin1(){
				return this.$store.getters.isLogin1
			}
		},
		methods:{
			getgoodslist(){
				this.$http.get('/api/goods')
				.then(res=>{
					this.goodslist=res.data
				})
				.catch((err)=>console.log(err))
			},
			addcart(item){
				if(!this.isLogin1){
					return
				}
				this.$http.post('/api/cart/add',{itemcart:item})
				.then(res=>{
					this.getcartall()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			getcartall(){
				if(!this.isLogin1){
					return
				}
				this.$http.get('/api/cart/all')
				.then(res=>{
					//console.log(res.data.cartList)
					if(res.data.cartList.length==0){
						res.data.cartList=[]
					}
					let newcartdata=res.data.cartList
					this.$store.dispatch('setcartdata',newcartdata);
					if(newcartdata.length>0){
						let numcart=0
						newcartdata.forEach(item=>{
							numcart+=parseInt(item.productNum)
						})
						//console.log(numcart)
						this.$store.dispatch('setcartnum',numcart)
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
		},
		created(){
			this.getgoodslist();
			this.getcartall()
		}
	}
</script>

<style scoped>
	.home{width: 1100px;margin: 60px auto 0;}
	.home .goods1{width: 253px;float: left;margin: 0 10px 20px 10px;border: 1px solid #ccc;background: #fff;}
	.home .goods1 .goodsimg{width: 100%;height: 200px;}
	.home .goods1 .goodsimg img{width: 100%;height: 100%;}
	.home .goods1 .goodstitle{font-size: 16px;color: #333;line-height: 20px;height: 20px;overflow: hidden;padding-left: 10px;margin-top: 10px;}
	.home .goods1 .goodssku{font-size: 14px;color: #666;line-height: 20px;height: 20px;overflow: hidden;padding-left: 10px;margin-top: 10px;}
	.home .goods1 .goodsprice{font-size: 18px;color: red;line-height: 20px;height: 20px;overflow: hidden;padding-left: 10px;margin-top: 10px;}
	.home .goods1 .goodsgm{display: block;width: 100%;height: 36px;background: #008EDF;font-size: 14px;text-align: center;line-height: 36px;color: #fff;margin-top: 20px;}
</style>
