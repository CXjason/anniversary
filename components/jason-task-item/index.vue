<template>
	<view class="jason-task-item">
		<view class="header-wr clearfix">
			<view class="tit">{{ itemData.title }}</view>
			<view class="time">{{ itemData.create_time | formatTime("YYYY-MM-DD")}}</view>
		</view>
		<view class="content">
			{{ itemData.task_content }}
		</view>
		<view class="func-btns clearfix">
			<text class="reward fl">奖励:{{ itemData.reward ? itemData.reward + '元' : '无' }} </text>
			<view class="btns-rg fr">
				<button class="btn-item" type="primary" size="mini" @click="editTaskFn">编辑</button>
				<button class="btn-item" type="warn" size="mini" @click="delTaskFn">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['itemData'],
		mounted(){
			console.log(this.itemData)
		},
		data() {
			return {
				
			};
		},
		methods:{
			delTaskFn(){
				this.$emit("delTaskFn",this.itemData);
			},
			editTaskFn(){
				this.$emit("editTaskFn",this.itemData);
			},
		}
	}
</script>

<style lang="scss">
	
	.jason-task-item{
		margin:10px;
		padding:0 6px;
		border:1px solid #ccc;
		border-radius:5px;
		
		.header-wr{
			padding:6px 0;
			font-size:16px;
			
			.tit{
				float:left;
				max-width:60%;
				overflow:hidden;
			}
			.time{
				float:right;
			}
		}
		
		.content{
			font-size:14px;
		}
		
		.func-btns{
			padding:6px 0;
			text-align:right;
			
			.reward{
				line-height:32px;
			}
			
			.btn-item{
				margin-left:8px;
			}
		}
	}

</style>
