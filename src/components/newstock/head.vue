<template>
<header class="ns-head">
	<div>
		<b class="logo"></b>
		<b class="department">{{title}}</b>
	</div>
	<div class="time">
	</div>
	<div class="zjzh">
		资金账号：<span id="extraInfo">{{account}}</span>
	</div>
</header>
</template>
<script>
	export default {
		data() {
			return {
				title: '北京营业部',
				account: ''// JSON.parse(this.$services.getCookie('user')).khzh
			}
		}
	}
</script>
<style>
	.ns-head .logo{
		display: inline-block;
	    width: 10px;
	    height: 10px;
	    border-radius: 5px;
	    border: 3px solid rgba(255,255,255,.5);
     	margin: 0 auto; 
	}
	.ns-head {
	    height: 2rem;
	    text-align: center;
	    font-size: .2rem !important;
	    background: #D13B36;
	    color: #fff;
	}
	.ns-head div {
		height: auto;
	}
</style>