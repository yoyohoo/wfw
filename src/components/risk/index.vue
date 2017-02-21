<template>
<div class="risk-result">
    <div class="text" style="padding: 1rem 1.5rem;font-size:1.4rem;margin-bottom:100px;">
        <p style="text-align: center;font-weight:900;font-size:1.5rem;margin-top: 1.5rem;">
            客户风险承受能力等级：
            <span class="rating_lvl">
                {{riskResult.rating_lvl_name}}
            </span>
        </p>
        <p style="text-align: center;font-weight:900;font-size:1.2rem;color:#7D7D7D;margin: .5rem;">
            风险测评时间 :
            <span class="rating_date">
                {{riskResult.exp_date}}
            </span>
        </p>
        <div style="width: 100%;height: 0;border-bottom:1px solid #eee;margin: .8rem 0 2rem;">
        </div>
        <p style="text-indent:2em;color:#7D7D7D;">
            本问卷旨在了解您可承受的风险水平，从而协助您选择合适的金融产品和金融服务。为了保障您的权益，请您如实向本公司提供相关信息，并对所提供的信息和证明材料的真实性、准确性、完整性负责。
        </p>
        <p style="text-indent:2em;color:#7D7D7D;">
            本公司特别提醒您：风险承受能力评估等适当性管理服务，并不能取代您自己的投资判断，也不会降低金融产品和服务的固有风险。同时，与金融产品和服务相关的投资风险、履约责任以及费用等将由您自行承担。
        </p>
        <p style="text-indent:2em;color:#7D7D7D;">
            本公司建议：当您的各项状况发生重大变化时，需要重新进行测评，以确保您的投资与您的风险承受能力保持一致。
        </p>
        <p style="text-indent:2em;color:#7D7D7D;">
            您在本问卷中所提供的一切信息，本公司将严格按照法律法规要求承担保密义务。
        </p>
        <p style="text-indent:2em;color:#7D7D7D;">
            请您根据自身的风险承受能力选择适合的金融产品和服务。
        </p>
    </div>
    <router-link to="riskinfo" class="fl">
		<button type="button" class="btn btn-danger btn-block fxLevelBtn">同&nbsp;&nbsp;意</button>
	</router-link>
</div>
</template>
<script>
	export default {
		data() {
			return {
				riskResult: {}
			}
		},
		methods: {

		},
		mounted() {
			var vm = this;
			vm.$services.getRiskResult(function(res){
				vm.riskResult = res.results[0]
			})
		}
	}
</script>
<style>
	.risk-result {
		padding-bottom:100px;
		position:relative;
		-webkit-overflow-scrolling: touch;
		width: 100%;
		height: 100%;
	}
  .fl{

  }
	.risk-result button {
    position: fixed;
    bottom:1rem;
    left: 5%;
		margin: 2rem auto;
	}
  .risk-quest{
    padding-bottom: 1px;
  }
</style>
