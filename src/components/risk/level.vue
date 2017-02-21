<template>
<div class="container-fluid ywbl_fxcp_fxlevel" id="ywbl_fxcp_fxlevel">
	<div id="render" class="fxcpPage page-content">
		<header class="header fxlevel-header">
			<span class="logo fxlevel-logo"></span>
			<p class="level">客户风险承受能力等级： <span id="rating_lvl_name">{{level}}</span></p>
			<p style="margin:10px 0;">风险测评时间 : <span class='rating_date'>{{date}}</span></p>
		</header>
		<div class="main">
			<div class="investment-horizon">
				<span class="text-left">投资期限:</span>
				<span class="text-right duration">{{duration}}</span>
			</div>
			<div class="investment-kind">
				<p>投资品种:</p>
				<p ><span class="types"></span>{{type}}</p>
			</div>
		</div>
	</div>
	<router-link to='/business' class="btn btn-lg fxLevelBtn">确&nbsp;&nbsp;定</router-link>
</div>
</template>
<script>
	export default {
		data() {
				return {
					level: this.$cache.get('riskLevel'),
					type: this.$cache.get('riskType'),
					date: this.$cache.get('riskDate'),
					duration: this.$cache.get('riskDuration'),
				}
			}
	}
</script>
<style >
.fxlevel-header{
	min-height: 17rem!important;
}
#ywbl_fxcp_fxlevel .main{
	min-height: calc(100vh - 26.5rem);
}
.fxlevel-logo{
		background:url(../../assets/img/fxcp-logo.png) no-repeat 0 0;
		background-size: 100% 100%;
		border: none;
}
.level{
	font-size:1.5rem;
	font-weight:700;
}
.investment-horizon{
	height: 5rem;
	line-height: 5rem;
	padding:0 1rem;
	margin-bottom:1rem;
	background:#fff;
}
.text-left{
	float: left;
}
.text-right{
	float:right;
}
.investment-kind{
	background:#fff;
	padding: 1rem;
}
.investment-kind p:first-child{
	font-size:1.5rem;
	margin-bottom:1rem;
}
.investment-kind p:last-child{
	text-indent:2em;
}
</style>
