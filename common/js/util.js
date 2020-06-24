
import moment from '../../lib/moment';

// 只要日期
var formatDate = function(arr,keys){
	
	for(var item of arr){
		
		keys.forEach(key => {
				
			if(item[key]){
				
				item[key] = moment(item[key]).format("YYYY-MM-DD");
			}
		});
	}
	
}

module.exports = {
	formatDate
}









