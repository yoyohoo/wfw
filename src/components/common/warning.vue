<template>
	<!-- 重试警告框 -->
	<div class="pop-mask">
		<div class="pop-up text-center">
			<p class="pop-head">温馨提示</p>
			<p class="pop-content"></p>
			<div class="btn-gp">
				<button id="cancel" onclick="WeixinJSBridge.call('closeWindow');">取消</button>
				<button id="retry">重试</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:['warn_title','warn_btn_cancel','warn_btn_retry']
	}
</script>
<style>
.pop-mask {
    display:none;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.pop-up {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 20rem;
    height: 12rem;
    margin-top: -6rem;
    margin-left: -10rem;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
}

.pop-head {
    padding-top: 1rem;
}

.pop-content {
    padding: 1rem;
}

.btn-gp {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #CCCCCC;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    overflow: hidden;
    color:#C7322F;
}

.btn-gp > button:first-child {
    border-right: 1px solid #cccccc;
}

.btn-gp > button {
    background-color: #fff;
    border: none;
    width: 50%;
    float: left;
    height: 3.5rem;
    /*border-radius: 1rem;*/
}
	.text-center {
		border-radius:1rem;
		height:18rem;
		margin-top:-10rem;
	}
</style>