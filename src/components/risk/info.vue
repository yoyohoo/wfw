<template>
<div class="risk-quest">
<div v-for="item in riskQuestions">
	<mt-radio
	:title="item.question"
	:options="item.answers">
	</mt-radio>
</div>
<button @click="commit"  type="button" class="btn btn-danger btn-block">提&nbsp;&nbsp;交</button>
<v-toast v-show="showToast"></v-toast>
<v-loading v-show="showLoading"></v-loading>
</div>
</template>
<script>
	import {
		Radio,
		MessageBox
	} from 'mint-ui';
	import VToast from '../common/toast'
	import VLoading from '../common/loading'

	export default {
		data() {
				return {
					showLoading: false,
					showToast: false,
					riskQuestions: []
				}
			},
			components: {
				VLoading,
				VToast
			},
			methods: {
				toast(msg, cb) {
					var vm = this;
					vm.showToast = true
					vm.$children[0].msg = msg
					setTimeout(function() {
						vm.showToast = false
						cb&&cb()
					}, 1000)
				},
				commit() {
					var answers = document.querySelectorAll('.mint-radio-input:checked');
					if (answers.length < 8) {
						// this.toast('请完成所有答题！')
						MessageBox('提示','请完成所有答题！')
						return false;
					}
					var key = '',
						value = '';
					for (var i = 0; i < answers.length; i++) {
						key += (i + 1) + '|'
						value += answers[i].value + '|'
					}
					var vm = this;
					var params = {
						keyValue: value,
						subriskSn: key
					}
					var type = vm.types[answers[2].value-1],
						duration = vm.durations[answers[2].value-1];
					vm.$cache.set('riskType',type)
					vm.$cache.set('riskDuration',duration)
					vm.showLoading = true;
					vm.$services.sendRiskResult(params, function(res){
						vm.showLoading = false;
						var cb = function(){
							vm.$cache.set('riskDate', new Date().Format('yyyyMMdd'))
							vm.$cache.set('riskLevel', res.results[0].rating_lvl_name)
							vm.$router.push('risklevel');
						}
						if(res.error) {
							// vm.toast(res.message)
							MessageBox('提示', res.message)
						}else{
							// vm.toast(res.message, cb)
							MessageBox('提示', res.message).then(cb)

						}
					})
				}
			},
			mounted() {
					var formatQuestions = function(data) {
					var arr = [],
						types = [],
						durations = [],
						count = data[data.length - 1].survey_col;
					for (var a = 1; a <= count; a++) {
						var newQuest = {
							question: '',
							answers: []
						};
						for (var i = 0; i < data.length; i++) {
							var quest = data[i];
							if(quest.survey_col=='3' && !types.Contains(quest.survey_cell_text)) types.push(quest.survey_cell_text);
							if(quest.survey_col=='2' && !durations.Contains(quest.survey_cell_text)) durations.push(quest.survey_cell_text);
							if (quest.survey_col == a) {
								newQuest.question = quest.survey_col_text;
								newQuest.answers.push({
									label: quest.survey_cell_text,
									value: quest.survey_cell
								});
							}
						}
						vm.types = types;
						vm.durations = durations;
						arr.push(newQuest)
					}
					return arr
				}
				var vm = this;
				vm.showLoading = true;
				vm.$services.getRiskQuestions(function(res) {
					vm.showLoading = false;
					vm.riskQuestions = formatQuestions(res.results)
				})
			}
	}
</script>
<style>
.mint-radio-input:checked + .mint-radio-core{
	background-color: #C73232;
	border-color: #C73232;
}
.mint-radiolist-title{
	font-size: 1.4rem;
	color: #000;
}
	.risk-quest .mint-radio-label {
		display: inline-block;
		width: 88%;
		color: #333;
		position: relative;
		top: 0;
		left: 0;
		padding:.5rem 0 .5rem;
		font-size: 1.2rem;
		line-height: 1.5;
	}
	.mint-cell{
		font-size: 1rem;
		height: auto!important;
	}
	.mint-cell-wrapper{
		min-height: 5rem;
		height: auto;
	}
	.risk-quest button {
		font-size:1.6rem;
		background:#C7322F;
		height: 48px;
		width: 90%;
		margin:2rem 5% 24px;
		border: none;
		color: #fff;
		border-radius: 15px;
	}
	.risk-quest label{
		font-weight: normal;
	}
</style>
