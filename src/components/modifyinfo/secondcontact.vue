<template>
	<div class="nd-contact">
		<div class="delxr-header">第二联系人信息</div>
		<div class="delxrmain">
			<mt-field label="第二联系人姓名" placeholder="请输入姓名" maxlength='11' type="text" v-model="secondcontact.full_name_2"></mt-field>
			<mt-field label="第二联系人手机" placeholder="请输入手机号" type="tel" v-model="secondcontact.mobile_no_2"></mt-field>
			<mt-field label="第二联系人座机" placeholder="请输入座机号" type="tel" v-model="secondcontact.tel_no_2"></mt-field>
			<mt-field label="第二联系人邮箱" placeholder="请输入邮箱" type="email" v-model="secondcontact.email_no_2"></mt-field>
		</div>
		<mt-button @click="updateContact" type="default" class="delxrCheckBtn">提&nbsp;&nbsp;交</mt-button>
		<v-loading v-show="showLoading"></v-loading>
		<v-toast v-show="showToast"></v-toast>
	</div>
</template>
<script>
	import {
		Field,
		Button,
		MessageBox
	} from 'mint-ui';

	import VToast from '../common/toast'
	import VLoading from '../common/loading'

	export default {
		data() {
				return {
					showLoading: false,
					showToast: false,
					secondcontact: {}
				}
			},
			components: {
				Field,
				VToast,
				VLoading
			},
			methods: {
				toast(msg) {
					var vm = this;
					vm.showToast = true
					vm.$children[6].msg = msg
					setTimeout(function() {
						vm.showToast = false
					}, 5000)
				},
				updateContact() {
					var vm = this;
					vm.showLoading = true;
					vm.$services.updateSecondContact(vm.secondcontact, function(res) {
						vm.showLoading = false;
						// vm.toast(res.message)
						MessageBox('提示', res.message).then(function() {
							vm.$router.push('modifyinfohome');
						})
					})
				}
			},
			mounted() {
				var vm = this;
				vm.$services.getSecondContact(function(res) {
					vm.secondcontact = res.results[0]
				})
			}
	}
</script>
<style>
.delxrmain{
	min-height:calc(100vh - 15.8rem) ;
}
.delxr-header{
	font-size: 1.6rem;
	height: 5rem;
	line-height: 5rem;
	text-align: center;
	background:#fff;
	margin-top:1rem;
	margin-bottom: .5rem;
}
.delxrmain .mint-cell-wrapper{
	font-size: 1.4rem;
}
	.nd-contact {
		width: 100%;
		text-align: center;
	}
	.nd-contact .mint-cell-title {
	    width: 10rem !important;
	    color: #333 !important;
	}
	.mint-cell-title:after{
		content: '';
	}
	.nd-contact .mint-cell-value {
	    color: #333 !important;
			border-left: 1px solid #f2f2f2;
			margin-left: 1rem;
			height: 3rem;
	}
	.nd-contact .mint-cell-value input {
		text-align: right !important;
	}
	.nd-contact .mint-button {
		margin: 2rem auto;
		color: #fff;
		background-color: #C7322F;
	}
	label{
		margin-bottom: 0;
	}
</style>
