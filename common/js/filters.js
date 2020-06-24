
import moment from "moment";

let formatTime = function(val,format="YYYY-MM-DD HH:mm:ss"){
	
	if(val){
		return moment(val).format(format);
	}
	
	return val;
};


export default{
	formatTime
};




