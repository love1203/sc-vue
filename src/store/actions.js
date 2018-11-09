export const setisLogin=({commit},data)=>{
	commit('setisLogin',data)
}

export const setusers=({commit},data)=>{
	commit('setusers',data)
}

export const clearuser=({commit},data)=>{
	commit('setisLogin',false)
	commit('setusers',{})
}



export const setisLogin1=({commit},data)=>{
	commit('setisLogin1',data)
}

export const setusers1=({commit},data)=>{
	commit('setusers1',data)
}




export const setcartdata=({commit},data)=>{
	commit('setcartdata',data)
}

export const setcartnum=({commit},data)=>{
	commit('setcartnum',data)
}

export const clearuser1=({commit},data)=>{
	commit('setisLogin1',false)
	commit('setusers1',{})
	commit('setcartdata',[])
	commit('setcartnum',0)
}