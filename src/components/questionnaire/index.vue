<template>
<div class="questionnaire">
	<h5>尊敬的用户：</h5>
	<p>您好！感谢您参与存量客户回访调查，请根据实际情况填写下列问题：</p>
	<div v-for="item in questions">
		<mt-radio
		:title="item.question"
		v-model="item.answer"
		:options="item.options"
		@change="selectRadio">
		</mt-radio>
	</div>
	<div class="submit-quest">
		<input class="btn btn-lg" @click="submitQuestions" type="button" value="提    交" name="">
	</div>
	<v-loading v-show="showLoading"></v-loading>
    <v-toast v-show="showToast"></v-toast>
	<v-preloading v-show="showPreloading"></v-preloading>
</div>
</template>
<script>
	import {
		Radio
	} from 'mint-ui';
	import {
		MessageBox
	} from 'mint-ui';
	import VLoading from '../common/loading'
    import VToast from '../common/toast'
	import VPreloading from '../common/preloading'

	export default {
		data() {
				return {
					showLoading: false,
					showPreloading: false,
					showToast: false,
					reason: '',
					questions: []
				}
			},
			components: {
				VLoading,
				VToast,
				Radio,
				VPreloading
			},
			mounted() {
				this.questions = [{
					index: 1,
					question: '1、 为了保障账户安全，请问您在我公司开立的证券账户是由您本人操作的吗？',
					options: ['A、是本人操作', 'B、不是本人操作，目前由朋友代为操作', 'C、不是本人操作，目前由华西证券工作人员代为操作'],
					reason: false,
					answer: ''
				}, {
					index: 2,
					question: '2、为了能够更好地为您服务，请问您对目前我们营业部的服务感到满意吗？',
					options: [{
						label: 'A、满意',
						value: 'A'
					}, 'B、一般', 'C、不满意（请填写原因）'],
					reason: true,
					answer: ''
				}]
			},
			methods: {
				toast(msg) {
					var vm = this;
					vm.showToast = true;
					if(vm.lock) return;
					vm.lock = true;
					vm.$children[1].msg = msg
					setTimeout(function(){
						vm.showToast = false
						vm.lock = false
					},5000)
				},
				selectRadio(value) {
					var vm = this,
						el = this.$el;
					if(value=='C、不满意（请填写原因）' && !el.querySelectorAll('.reason').length){
						var reason = document.createElement('input');
						reason.className = 'reason';
						reason.onchange = function() {
							vm.reason = this.value;
						}
						el.querySelectorAll('.mint-radiolist-label')[5].appendChild(reason);
					}
				},
				quertQuestions() {
					var vm = this;
					var params = {
						'operation': 'C',
						'funcNo': 2000128,
						'khzzh': JSON.parse(vm.$services.getCookie('user')).khzh,
					};
					this.$services.questionnaire(params, function(res) {
						vm.status = parseInt(res.results[0].khstatus);
						vm.status && vm.toast("已完成过答题！");
					})
				},
				submitQuestions() {
					var vm = this,
						result = '',
						els = document.querySelectorAll('input:checked');
					if(els.length<2){
						vm.toast("未完成所有答题！");
						return false;
					}
					result += els[0].value + '|' + els[1].value + this.reason;
					var params = {
						'operation': 'T',
						'funcNo': 2000128,
						'khzzh': JSON.parse(vm.$services.getCookie('user')).khzh,
						'answerlist': result
					};

					vm.showLoading = true;
					this.$services.questionnaire(params, function(res) {
						vm.showLoading = false;
						var msg = parseInt(res.error_no)?res.error_info:res.message;
						// vm.toast(msg);
						MessageBox({
							title: '问卷已提交',
							message: '感谢您参与本次回访',
							confirmButtonText: '我知道了'
						}).then(actions=>{
							WeixinJSBridge.invoke('closeWindow', {}, function(res) {
								//alert(res.err_msg);
							});
						});
					})
				}
			},
	}
</script>
<style>
	.questionnaire {
		background-color: #fafafa;
		width: 100%;
		min-height: 100%;
		padding: 1rem;
		box-sizing: border-box;
		display: block;
	}
	.questionnaire p {
		padding-left: 2rem;
	}
	.questionnaire .mint-cell-wrapper {
		font-size: 1rem;
	}
	.questionnaire .mint-radio-label {
		color: #333;
	}
	.questionnaire input.reason {
	    display: inline-block;
	    width: 6rem;
	    color: #000;
	    font-weight: 700;
	    border: none;
	    margin-top: 5px;
	    border-bottom: 1px solid #333;
	}
	.questionnaire .submit-quest {
		margin: 1rem auto;
		text-align: center;
		width: 100%;
		box-sizing: border-box;
	}
	.questionnaire .submit-quest input {
		color: #fff;
		font-weight: 700;
		width: 90%;
		border-radius: 15px;
		background-color: #c52727;
		font-size: 1.6rem!important;
	}
	.mint-radio-input:checked + .mint-radio-core {
	    background-color: #c52727;
    	border-color: #c52727;
	}
	.mint-msgbox-btn {
    	color: #c52727;
	}
</style>
