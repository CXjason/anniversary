
let jsonClone = function(json){
	
	return JSON.parse(JSON.stringify(json));
}


// 消息提示
let toastMsgShow = function(vm){
	vm.$refs.jasonToastCom.show()
}

export{
	jsonClone,
	toastMsgShow,
}



