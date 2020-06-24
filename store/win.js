


const state = {
	screen:{
		width:0,
		height:0,
		mode:true
	}
};


const actions = {
	
};

const mutations = {
	screen(state,screen){
		state.screen = screen;
	}
}


const getters = {
	getScrren:state => state.screen,
};


export default {
	state,
	actions,
	mutations,
	getters
}