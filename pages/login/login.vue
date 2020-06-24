<template>
	<view class="login-wrapper" :style={backgroundImage:pageBgImg}>
	    <form @submit="formSubmit" class="form-wr">
			  <view class="uni-form-item uni-column">
				  <view class="title">账号:</view>
				  <input :value="username" class="uni-input bg-none" name="username" placeholder="账号" @input="changeUserName"/>
			  </view>
			  <view class="uni-form-item uni-column">
				  <view class="title">密码:</view>
				  <input :value="password" class="uni-input  bg-none" name="password" placeholder="密码" password @input="changePassword"/>
			  </view>
				<view class="submit-btn-wr">
					<button type="primary" form-type="submit" :disabled="username == '' || password == ''">登录</button>
				</view>
		</form>
		<jasonToastCom
			:message="toastMsg"
			ref="jasonToastCom"
		></jasonToastCom>
	</view>
</template>

<script>
	import { userList,login,loginRecordAddItem } from '../../fetch/urls.js';
	import jasonToastCom from '../../components/jason-toast/jason-toast.vue';
	import { mapGetters } from 'vuex';
	import { toastMsgShow } from "@/utils/tools.js";
	import { loginStorageKey } from "@/config/index.js";
	export default {
		components:{
			jasonToastCom
		},
		onReady(){
		
		},
		mounted(){
			
			let loginInfo = this.getStorage();
			if(loginInfo){
				this.username = loginInfo.username;
				this.password = loginInfo.password;
			}
			//this.formSubmit();
		},
		computed:{
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				username:"",  // 账号
				password:"", // 密码
				pageBgImg:'url("../../static/image/my/1.jpg")' ,// 页面背景图
				toastMsg:"",// 提示框内容
			};
		},
		methods:{
			formSubmit(event){ // 登录
			
				var params = {
					username:this.username,
					password:this.password
				};
				
				this.$http({
					url:login,
					method:"POST"
				},params).then(res => {
					
					console.log("登录")
					console.log(res)
					
					if(res.data.code == 0){
						this.toastMsg = "";
						var data = res.data.data;
						if(this.username != data.username){
							this.toastMsg = "用户名或密码错误";
							toastMsgShow(this);
						}else{
							if(data["pk"]){ // 登录成功
								this.$store.commit("setUserInfo",data);
							
								// 添加一条登录记录
								this.fetchLoginRecordAddItem(data);
								
								// 存入缓存
								this.setStorage(this.username,this.password);
								
								uni.navigateTo({
										url: '/pages/home/home',
								});	
							};
						};
						
						
					}
				});
				
				
			},
			fetchLoginRecordAddItem(userInfo){ // 添加一条登录记录
				
				var params = {
					username:userInfo.username,
					user_pk:userInfo.pk
				};
				
							
				this.$http({
					url:loginRecordAddItem,
					method:"POST"
				},params);
			},
			changeUserName(event){ // 更换用户名称
			
				this.username = event.detail.value;
				
			},
			changePassword(event){
				this.password = event.target.value;
			},
			setStorage(username,password){ // 登录信息设置缓存
				uni.setStorageSync(loginStorageKey,{
					username,
					password
				});
			},
			getStorage(){ // 登录信息获取缓存
				return uni.getStorageSync(loginStorageKey);
				
			},
		}
	}
</script>

<style lang="scss">
	
	/*@import "./login.css";*/
	@import url("login.scss");

</style>
