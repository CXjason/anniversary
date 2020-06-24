<template>
	<view>
		<yu-toast
			:message="message"
			:verticalAlign="verticalAlign"
			ref="toast"
		></yu-toast>
	</view>
</template>

<script>
	import yuToast from '@/components/yu-toast/yu-toast';
	export default {
		props:{
			message:{
				type:[String],
				default:""
			},
			verticalAlign:{
				type:[String],
				default:"center"
			}
		},
		components:{
			yuToast
		},
		data() {
			return {
				
			}
		},
		methods: {
			show(){
				this.$refs.toast.show()
			}
		}
	}
</script>

<style>

</style>
