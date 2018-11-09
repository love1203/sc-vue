<template>
	<div class="cart">
		<div class="carttop">
			<div class="checkedbox"></div>
			<div class="cartname">商品</div>
			<div class="danjia">单价</div>
			<div class="shuliang">数量</div>
			<div class="xiaoji">小计</div>
			<div class="shanchu">删除</div>
		</div>
		
		<div class="cartlist" v-for="(item,index) in cartdata" :key='index'>
			<div class="listchecked">
				<input type="checkbox" v-model="item.checked" @click="changechecked(item)">
			</div>
			<div class="listname">
				<img :src="item.productImage">
				<div class="listtext">
					<h3>{{item.productName}}</h3>
					<p>颜色:<span v-for="(color,index) in item.productsku" :key='index'>{{color}}，</span></p>
				</div>
			</div>
			<div class="listprice">{{item.salePrice}}</div>
			<div class="listnum">
				<div class="numwrap">
					<div class="numdele" @click="delecount(item)">-</div>
					<div class="numtext">{{item.productNum}}</div>
					<div class="numadd" @click="addcount(item)">+</div>
				</div>
			</div>
			<div class="xiaoji">￥{{xiaoji(item)}}</div>
			<div class="listshanchu" @click="removecart(item)">删除</div>
		</div>
		
		<div class="cartbottom">
			<div class="bott1">
				<input type="checkbox" v-model="allchecked" @click.prevent="allcheckedhandle">
				<span>全选</span>
			</div>
			<div class="bott3" @click="handlejisuan">去结算</div>
			<div class="bott2">总价：<span class="botttext2">￥{{checkedprice}}</span></div>
			<div class="bott2">已选择<span class="botttext1">{{checkedcount}}</span>件</div>
			
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				cartdata:[]
			}
		},
		computed:{
			allchecked(){
				let allchecked=true;
				this.cartdata.forEach(item=>{
					if(!item.checked){
						allchecked=false
						return
					}
				})
				return allchecked
			},
			checkedprice(){
				let allcheckedprice=0
				this.cartdata.forEach((item)=>{
					if(item.checked){
						allcheckedprice+=parseFloat(item.salePrice.replace(/[^\d]/g,""))*item.productNum
					}
				})
				return allcheckedprice
			},
			checkedcount(){
				let allcheckedcount=0
				this.cartdata.forEach((item)=>{
					if(item.checked){
						allcheckedcount+=parseInt(item.productNum)
					}
				})
				return allcheckedcount
			}
		},
		methods:{
			getcartall(){
				this.$http.get('/api/cart/all')
				.then(res=>{
					if(res.data.cartList.length==0){
						res.data.cartList=[]
					}
					this.cartdata=res.data.cartList
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
			},
			addcount(item){
				let itemcount=item.productNum++
				let itemchecked=item.checked
				this.$http.post('/api/cart/change',{itemcount:itemcount+1,productId:item.productId,itemchecked})
				.then(res=>{
					this.getcartall()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			delecount(item){
				let itemcount=item.productNum--
				
				if(item.productNum<1){
					itemcount=2
					item.productNum=1
				}
				//console.log(item.productNum)
				let itemchecked=item.checked
				this.$http.post('/api/cart/change',{itemcount:itemcount-1,productId:item.productId,itemchecked})
				.then(res=>{
					this.getcartall()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			changechecked(item){
				let itemchecked=!item.checked
				let itemcount=item.productNum
				this.$http.post('/api/cart/change',{itemchecked:itemchecked,productId:item.productId,itemcount:itemcount})
				.then(res=>{
					this.getcartall()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			allcheckedhandle(){
				let allchecked=!this.allchecked;
				this.cartdata.forEach(item=>{
					item.checked=allchecked
				})
				this.$http.post('/api/cart/allchange',{allchecked:allchecked})
				.then(res=>{
					this.getcartall()
				})
				.catch(err=>{
					console.log(err)
				})
				
			},
			xiaoji(item){
				return parseFloat(item.salePrice.replace(/[^\d]/g,""))*item.productNum
			},
			removecart(item){
				//console.log(item.productId)
				this.$http.post('/api/cart/removecart',{productId:item.productId})
				.then(res=>{
					this.getcartall()
				})
			},
			handlejisuan(){
				if(this.checkedcount==0){
					return
				}
				this.$router.push('/checkout')
			}
		},
		created(){
			this.getcartall()
		}
	}
</script>

<style scoped>
	.cart{width: 1100px;margin: 60px auto 0;}
	.cart .carttop{width: 100%;background: #f3f3f3;height: 40px;border-top: 1px solid #e9e9e9;border-bottom: 1px solid #e9e9e9;}
	.cart .carttop .checkedbox,.cart .carttop .cartname,.cart .carttop .danjia,.cart .carttop .shuliang,.cart .carttop .xiaoji,.cart .carttop .shanchu{float: left;font-size: 14px;color: #333;line-height: 40px;}
	.cart .carttop .checkedbox{width: 100px;height: 100%;}
	.cart .carttop .cartname{width: 500px;}
	.cart .carttop .danjia{width: 100px;text-align: center;}
	.cart .carttop .shuliang{width: 200px;text-align: center;}
	.cart .carttop .xiaoji{width: 100px;text-align: center;}
	.cart .carttop .shanchu{width: 100px;text-align: center;}
	
	
	.cartlist{width: 100%;background: #fff4e8;height: 100px;border-top: 1px solid #e9e9e9;border-bottom: 1px solid #e9e9e9;margin-top: 30px;}
	.cartlist .listchecked{width: 100px;float: left;height: 100%;}
	.cartlist .listchecked input{width: 16px;height: 16px;display: block;margin-top: 42px;margin-left: 20px;}
	.cartlist .listname{width: 500px;float: left;height: 100%;}
	.cartlist .listname img{width: 80px;height: 80px;float: left;margin-top: 10px;}
	.cartlist .listname .listtext{float: left;margin-left: 20px;}
	.cartlist .listname .listtext h3{font-size: 15px;font-weight: normal;color: #666;padding-top: 30px;}
	.cartlist .listname .listtext p{font-size: 14px;color: #888;line-height: 30px;}
	.cartlist .listprice{width: 100px;float: left;height: 100%;text-align: center;font-size: 14px;color: #666;line-height: 100px;}
	.cartlist .listnum{width: 200px;float: left;height: 100%;}
	.cartlist .listnum .numwrap{width: 90px;height: 30px;border: 1px solid #ccc;box-sizing: border-box;margin-top: 35px;margin-left: 55px;}
	.cartlist .listnum .numwrap .numdele{float: left;width: 30px;border-right: 1px solid #ccc;height: 100%;font-size: 18px;color: #666;text-align: center;line-height: 30px;
	box-sizing: border-box;cursor: pointer;}
	.cartlist .listnum .numwrap .numtext{float: left;width: 30px;border-right: 1px solid #ccc;height: 100%;font-size: 14px;color: #666;text-align: center;line-height: 30px;
	box-sizing: border-box;}
	.cartlist .listnum .numwrap .numadd{float: left;width: 28px;height: 100%;font-size: 18px;color: #666;text-align: center;line-height: 28px;cursor: pointer;}
	.cartlist .xiaoji{width: 100px;float: left;height: 100%;text-align: center;font-size: 14px;color: #666;line-height: 100px;}
	.cartlist .listshanchu{width: 100px;float: left;height: 100%;text-align: center;font-size: 14px;color: #666;line-height: 100px;cursor: pointer;}
	.cartlist .listshanchu:hover{color: red;}
	
	.cartbottom{width: 100%;background: #fff;height: 50px;border-top: 1px solid #e9e9e9;border-bottom: 1px solid #e9e9e9;margin-top: 30px;}
	.cartbottom .bott1{float: left;width: 100px;height: 100%;}
	.cartbottom .bott1 input{width: 16px;height: 16px;display: block;margin-top: 17px;margin-left: 20px;float: left;}
	.cartbottom .bott1 span{font-size: 14px;color: #333;line-height: 50px;float: left;margin-left: 10px;}
	.cartbottom .bott2{float: right;font-size: 14px;line-height: 50px;color: #333;padding: 0 20px;}
	.cartbottom .bott2 .botttext1{color: red;}
	.cartbottom .bott2 .botttext2{color: red;font-size: 15px;}
	.cartbottom .bott3{float: right;padding: 0 20px;background: red;font-size: 16px;color: #fff;line-height: 50px;margin-left: 20px;cursor: pointer;}
</style>
