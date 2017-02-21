<template>
<div id="licai-position" style="display:none;">
	<!-- 基金持仓 -->
	<!--持仓名称及数量-->
	<div class="list-head text-center">
		<div class="row">
			<div class="col-xs-3">
				<p class="position-name">名称/市值</p>
			</div>
			<div class="col-xs-3">
				<p class="">盈亏</p>
			</div>
			<div class="col-xs-3">
				<p class="hold-position">持仓份额</p>
			</div>
			<div class="col-xs-3">
				<p class="">成本/现价</p>
			</div>
		</div>
		<div v-show="positions.length" v-for="position in positions" class="list-content text-center">
			<div class="row">
				<div class="col-xs-3">
					<p class="list-name">{{ position.fund_name }}</p>
					<p class="value">{{ position.market_value }}</p>
				</div>
				<div class="col-xs-3">
					<p class="" style="color:#C72820;margin-top: 10px;">{{ position.income_balance }}</p>
					<p class="" style="color:#C72820;">{{ position.float_per }}</p>
				</div>
				<div class="col-xs-3">
					<p class="" style="margin-top: 10px;">{{ position.enable_amount }}</p>
				</div>
				<div class="col-xs-3">
					<p class="">{{ position.cost_price }}</p>
					<p class="">{{ position.nav }}
					</p>
				</div>
			</div>
		</div>
	</div>
	<div v-show="!positions.length" class="noInfo">
		<div><img src="../../assets/img/emp-box.png"></div>
		无相关信息！
	</div>
</div>
</template>
<script>
	export default {
		data() {
			return {
				positions: []
			}
		},
		methods: {
			getFuns() {
				var vm = this;
				vm.$services.getFuns(function(res){
					vm.positions = res.results;
					vm.$parent.fd_va = parseFloat(0);
					vm.$parent.fd_yk = parseFloat(0);
					for (var i = 0; i < vm.positions.length; i++) {
						vm.$parent.fd_va += parseFloat(vm.positions[i].market_value);
						vm.$parent.fd_yk += parseFloat(vm.positions[i].income_balance);
					}
				})
			}
		},
		created() {
			this.getFuns();
		}
	}
</script>
