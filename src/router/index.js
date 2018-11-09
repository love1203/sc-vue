import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../views/admin'
import Adminhome from '../views/adminhome'
import Adminlogin from '../views/adminlogin'
import Addgoods from '../views/addgoods'
import Editgoods from '../views/bianjigoods'
import Index from '../views/index'
import Register from '../views/register'
import Home from '../views/home'
import Login from '../views/login'
import Cart from '../views/cart'
import Order from '../views/order'
import Checkout from '../views/checkout'
import Payment from '../views/payment'

Vue.use(Router);

let router=new Router({
  mode:'history',
  routes: [
		{ path: '*', redirect: '/' },
    {
      path: '/admin',
      component: Admin,
			children:[
				{
					path:'',
					component:Adminhome
				},
				{
					path:'adminlogin',
					component:Adminlogin
				},
				{
					path:'addgoods',
					component:Addgoods
				},
				{
					path:'editgoods/:id',
					component:Editgoods
				}
			]
    },
		{
			path:'/',
			component:Index,
			children:[
				{
					path:'',
					component:Home
				},
				{
					path:'register',
					component:Register
				},
				{
					path:'login',
					component:Login
				},
				{
					path:'cart',
					component:Cart
				},
				{
					path:'order',
					component:Order
				},
				{
					path:'checkout',
					component:Checkout
				},
				{
					path:'payment',
					component:Payment
				}
			]
		}
  ]
})


// router.beforeEach((to,from,next)=>{
// 	if(to.path=='/admin/adminlogin'||to.path=='/'||to.path=='/register'||to.path=='/login'){
// 		next()
// 	}else if(to.path=='/cart'||to.path=='/order'||to.path=='/checkout'||to.path=='/payment'){
// 		if(localStorage.jwt2){
// 			next()
// 		}else{
// 			next('/login')
// 		}
// 	}else{
// 		if(localStorage.jwt1){
// 			next()
// 		}else{
// 			next('/admin/adminlogin')
// 		}
// 	}
// })

export default router;
