<script>
	import { updateApp,tipsUrl } from './fetch/urls.js';
	export default {
		mounted(){
			var that = this;
			(function screenListener(){
				uni.onWindowResize((res) => {
					that.$store.commit('screen',{width:res.size.windowWidth,height:res.size.windowHeight});
				})
			})
		},
		onLaunch: function() {
			
			// 如果未登录跳转到登录页
			if(!this.$store.state.user.userInfo.pk){
				uni.navigateTo({
					url:"/pages/login/login"
				});
			};
			
			console.log('App Launch');
			
			this.updateProject(() => {
				// 显示提示语
				this.showTipsFn();
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			updateProject(callback){ // 更新apk
						
				// #ifdef H5
				callback();
				// #endif
				
				
				
					// #ifdef APP-PLUS
					plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => { 
						
						let params = {
							version: widgetInfo.version,
							name: widgetInfo.name  
						};
						console.log(params)
						this.$http({  
								url: updateApp, 
								method:"POST",  
						},params).then(res => {
							
							console.log("更新apk");
							console.log(res);
							
							var result = res.data;
							
							if(result.code == 0){
								var data = result.data;
								if (data.update && data.wgtUrl) { 
									
									uni.showModal({
										title: '提示',
										content: data.msg,
										success: function (modalRes) {
											if (modalRes.confirm) { // 确定更新
												uni.downloadFile({
														url: data.wgtUrl,  
														success: (downloadResult) => {  
															console.log(downloadResult)
															if (downloadResult.statusCode == 200) {  
																	plus.runtime.install(downloadResult.tempFilePath, {  
																			force: false  
																	}, function() {  
																			console.log('install success...');  
																			plus.runtime.restart();  
																	}, function(e) {  
																			console.error('install fail...');  
																	});  
															}  
														}  
													});  
													
													callback();
												} else if (modalRes.cancel) { // 取消更新
														console.log('用户点击取消');
														
														callback();
												}
										}
									});
										
								}else{
									callback();
								}
							}
						});  
					});  
					// #endif 
				},
				showTipsFn(){ // 如果后台有提示语则提示
				
					this.$http({
						url:tipsUrl,
						method:"POST"
					}).then(res => {
						
						console.log(res);
						let tipMsg = res.data.data.tips;
						if(tipMsg){
							uni.showModal({
								title:"提示",
								content:tipMsg,
								showCancel:false,
								success:function(modalRes){
									
									//console.log(modalRes);
									
								}
							})
						}
						
						
					}).catch(err => {
						
					});
				},
		}
	
	}
</script>

<style>
	/*每个页面公共css */
	/*每个页面公共css */
		@import "./common/uni.css";
		@import "./common/css/iconfont.css"; 
		@import "./common/css/tui.css";
		@import "./common/css/public.css";
		
		@font-face {
		font-family: 'iconfont';
	        src: url('https://at.alicdn.com/t/font_920574_ma6qmi3qok.ttf') format('truetype');
	    }
	    .iconfont  {
			font-size: 1.4em;
	        font-family: iconfont;
	    }
	/* 	    @font-face {
	        font-family: 'iconfont';
	        src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
	    }
	    .iconfont{
	        font-family: iconfont;
	    } */
		/* 以下样式用于 hello uni-app 演示所需 */
		page {
			color: #666;
			background-color:#F4F5F6;
			height: 100%;
			font-size:28upx;
			overflow:hidden;
		}
		.page-body{
			padding: 0;
			margin: 0;
			justify-content:space-between;
			flex-direction: column;
			align-content: ;
			height: 100vh;
			box-sizing:border-box;
			display: flex;
		}
	/* 	.main-content{
			margin-bottom: 100upx;
			text-align: center;
			width: 100%;
			flex:1;
			overflow-y:auto;
			box-sizing:border-box;
		} */
		.uni-input-group .uni-input-row:after {
			right: 10upx;
			left: 10upx;
		}
		.uni-input-row input{
			flex: 1;
			padding:0 10upx;
			border-radius: 6upx;
			background: #E9E9E9;
		}
	
		.uni-input-row .uni-label {
			text-indent:0;
			flex-direction: column;
			display: flex;
			justify-content: center;
			text-align: center;
		}
</style>
