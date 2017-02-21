<template>
<div>
	<div class="container-fluid" id="kf_fundquery">
		<div class="text-center">
			<div class="account-head ">
				<i class="account-img fundquery-img"></i>
				<p class="head-p">账户资金</p>
			</div>
		</div>
		<div class="fund-list" id="fund-list">
			<div class="row">
				<div class="col-xs-12">
					<p>资产总值：<span class="text-right">{{money.assert_val}}元</span></p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<p>股票市值：<span class="text-right"> {{money.market_val}}元</span></p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<p>理财市值：<span class="text-right"> {{money.fund_val}} 元</span></p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<p>资金余额：<span class="text-right">{{money.current_balance}} 元</span></p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<p>可用金额：<span class="text-right">{{money.enable_balance}}元</span></p>
				</div>
			</div>
		</div>
	</div>
	<v-loading v-show="showLoading"></v-loading>
	<vague v-show="showvg"></vague>
	<v-maskpwd v-show="showpwd"></v-maskpwd>
</div>
</template>
<script>
	import VLoading from '../common/Loading'
	import VTips from '../common/tips'
	import Vague from '../common/Vague'
	import VMaskpwd from '../common/Maskpwd'

	export default {
		data() {
				return {
					isLogin: JSON.parse(this.$services.getCookie('isLogin')),
					showvg: false,
					showpwd: false,
					showLoading: false,
					tipsMsg:'',
					showTips: false,
					showRetry: false,
					funs: {},
					stocks: {},
					money: {}
				}
			},
			components: {
				VLoading,
				VTips,
				Vague,
				VMaskpwd
			},
			methods: {
				getMoney() {
					var vm = this;
					vm.showLoading = true;
					vm.$services.getMoney(function(res){
						vm.showLoading = false;
						vm.money = res.firstData;
					})
				}
			},
			created() {
				this.getMoney();
				if(!this.isLogin) {
					this.$showvg = true;
					this.$showpwd = true;
				}
			},
	}
</script>
<style >
.fundquery-img {
		background-image: url(../../assets/img/fundquery-img.png);
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: cover;
}
.fund-list {
    margin-top: 2rem;
}

.fund-list p {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    height: 4.1rem;
    line-height: 4.1rem;
    background-color: #ffffff;
    margin-bottom: 2px;
}

.fund-list p > span {
    float: right;
}
</style>
