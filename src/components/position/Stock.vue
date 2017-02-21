<template>
<!--持仓列表-->
<div id="stock-position">
	<!-- 股票持仓 -->
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
				<p class="hold-position">持仓/可用</p>
			</div>
			<div class="col-xs-3">
				<p class="">成本/现价</p>
			</div>
		</div>
		<div v-show="positions.length" v-for="position in positions" class="list-content text-center">
			<div class="row">
				<div class="col-xs-3">
					<p class="list-name">{{ position.stock_name }}</p>
					<p class="value">{{ position.market_value  }}</p>
				</div>
				<div class="col-xs-3">
					<p class="" style="color:#C72820;">{{ position.float_yk }}</p>
					<p class="" style="color:#C72820;">{{ position.float_yk_per }}</p>
				</div>
				<div class="col-xs-3">
					<p class="">{{ position.cost_amount }}</p>
					<p class="">{{ position.enable_amount }}</p>
				</div>
				<div class="col-xs-3">
					<p class="">{{ position.cost_price }}</p>
					<p class="">{{ position.last_price }}</p>
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
			getStocks() {
				var vm = this;
				vm.$services.getStocks(function(res){
					vm.positions = res.results;
					vm.$parent.st_va = parseFloat(0);
					vm.$parent.st_yk = parseFloat(0);
					for (var i = 0; i < vm.positions.length; i++) {
						vm.$parent.st_va += parseFloat(vm.positions[i].market_value);
						vm.$parent.st_yk += parseFloat(vm.positions[i].float_yk);
					}
				})
			}
		},
		created() {
			this.getStocks();
		}
	}
</script>
