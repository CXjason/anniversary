

export default{
	state:{
		userInfo:{}
	},
	mutations:{
		setUserInfo(state,val){
			state.userInfo = val;
		}
	},
	actions:{
		
	},
	getters:{
		userInfo:state => state.userInfo
	},
}
