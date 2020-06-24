<template>
	<view class="home-page">
		<view class="btns-wrapper">
			<button class="btns-item" type="primary" size="mini" @click="addTaskFn">添加</button>
		</view>
		<view class="cont-wrapper">
			<JasonTaskItem
				v-for="item in taskListData"
				:key="item.pk"
				:itemData="item"
				@delTaskFn="delTaskFn"
				@editTaskFn="editTaskFn"
			></JasonTaskItem>
		</view>
		
		<neil-modal 
			:show="addEditTaskModal" 
			@close="addEditTaskModalClose" 
			:title="this.addEditTaskData.pk ? '编辑任务' : '添加任务'" 
			@cancel="addEditTaskModalEv('cancel')" 
			@confirm="addEditTaskModalEv('confirm')"
		>
			<view class="add-edit-task-modal-wr">
					<view class="item-wr">
						<text>标题:</text>
						<textarea :value="addEditTaskData.title" maxlength="-1" auto-height="true" @input="updateaddEditTaskDataTitle"></textarea>
					</view>
					<view class="item-wr">
						<text>内容:</text>
						<textarea :value="addEditTaskData.task_content" maxlength="-1" auto-height="true" @input="updateaddEditTaskDataContent"></textarea>
					</view>
					<view class="item-wr">
						<text>奖励:</text>
						<input type="number" :value="addEditTaskData.reward" maxlength="-1" @input="updateaddEditTaskDataReward"></textarea>
					</view>
			</view>
	</neil-modal>
	
	<jasonToastCom
		:message="toastMsg"
		ref="jasonToastCom"
	></jasonToastCom>
	
	<uni-popup ref="delTaskPopup" type="dialog">
	    <uni-popup-dialog type="base" :content="delTaskPopupMsg" :duration="2000" @confirm="delTaskPopupConfirm"></uni-popup-dialog>
	</uni-popup>
	</view>
</template>

<script>
	import JasonTaskItem from "@/components/jason-task-item/index.vue";
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import jasonToastCom from '@/components/jason-toast/jason-toast.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	
	import { 
		prvTaskList,
		prvTaskAddItem,
		prvTaskEditItem,
	} from "@/fetch/urls.js";
	import { mapGetters } from 'vuex';
	import { 
		toastMsgShow,
		jsonClone,
	} from "@/utils/tools.js";
	export default {
		components:{
			JasonTaskItem,
			neilModal,
			jasonToastCom,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
		},
		mounted(){
			
			this.fetchTaskList();
			
			
		},
		data() {
			return {
				taskListData:[],// 任务列表数据
				addEditTaskModal:false, // 添加编辑的modal
				addEditTaskData:{}, // 添加编辑的数据
				toastMsg:"",// 提示消息
				delTaskPopupMsg:"",// 删除任务提示
				delTaskTempData:{},// 删除数据临时存储
			}
		},
		methods: {
			fetchTaskList(){ // 获取任务列表
				
				let params = {
					create_person_pk:this.userInfo.pk,
					status:1
				};
				
				this.$http({
					url:prvTaskList,
					method:"POST",
				},params).then(res => {
					
					console.log("获取任务列表")
					console.log(res);
					if(res.data.code == 0){
						this.taskListData = res.data.data;
					}
				}).catch(err => {
					
				});
				
			},
			fetchPrvTaskAddItem(params){ // 添加任务
				
				console.log(params);
				this.$http({
					url:prvTaskAddItem,
					method:"POST",
				},params).then(res => {
					
					console.log("添加任务")
					console.log(res);
					if(res.data.code == 0){
						this.toastMsg = "添加成功";
						toastMsgShow(this);
						
						this.fetchTaskList();
					};
					
				}).catch(err => {
					
				});
				
			},
			fetchPrvTaskEditItem(params){ // 修改数据
				
				this.$http({
					url: prvTaskEditItem,
					method:"POST",
				},params).then(res => {
					console.log("编辑任务");
					console.log(res);
					
					if(res.data.code == 0){
						
						this.toastMsg = "操作成功";
						toastMsgShow(this);
						this.fetchTaskList();
						
						
					}
				}).catch(err => {
					
				});
			},
			addEditTaskModalClose(){ // 关闭 添加编辑的
			
				this.addEditTaskModal = false;
				
			},
			addEditTaskModalEv(mode){ // 确定、取消 添加编辑的
				
				if(mode === "cancel"){
					
					this.addEditTaskModal = false;
					
				}else if(mode == "confirm"){
					
					// 内容不能为空
					if(!this.addEditTaskData.task_content){
						return;
					};
					
					this.addEditTaskModal = false;
					
					// 编辑
					if(this.addEditTaskData.pk){
						
						let params = jsonClone(this.addEditTaskData);
						this.fetchPrvTaskEditItem(params);
						
					}else{ // 添加
						let params = {
							...this.addEditTaskData,
							create_person_name:this.userInfo.username,
							create_person_pk:this.userInfo.pk
						}
						this.fetchPrvTaskAddItem(params);
					}
					
				};
				
			},
			initAddEditTaskData(){ // 初始化 添加编辑的数据
				this.addEditTaskData = {
					title:"",
					task_content:"",
					reward:""
				}
			},
			addTaskFn(){ // 添加任务
				
				this.initAddEditTaskData();
				this.addEditTaskModal = true;
			},
			updateaddEditTaskDataTitle(e){ // 修改 添加编辑任务的  标题
				this.addEditTaskData.title = e.detail.value;
			},
			updateaddEditTaskDataContent(e){ // 修改 添加编辑任务的  标题
				this.addEditTaskData.task_content = e.detail.value;
			},
			updateaddEditTaskDataReward(e){ // 修改 添加编辑任务的  标题
				this.addEditTaskData.reward = e.detail.value;
			},
			delTaskFn(taskItem){ // 删除任务
				console.log(taskItem);
				
				this.delTaskTempData = taskItem;
				this.delTaskPopupMsg = "是否删除 " + taskItem.title + " 任务";
				this.$nextTick(() => {
					this.$refs.delTaskPopup.open();
				})
				
				
			},
			delTaskPopupConfirm(done,value){// 删除任务 提示框确认
			
				let params = {
					pk:this.delTaskTempData.pk,
					status:0
				};
				
				this.fetchPrvTaskEditItem(params);
			
				this.$refs.delTaskPopup.close();
			},
			editTaskFn(taskItem){ // 编辑任务
				this.addEditTaskData = taskItem;
				this.addEditTaskModal = true;
			},
		},
		computed:{
			...mapGetters([
				"userInfo",
			])
		},
	}
</script>

<style lang="scss">

	@import "./index.scss"
	
</style>
