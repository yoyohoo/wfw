<template>
	<!-- 绑定提示信息 -->
	<div class="warn-mask">
		<div class="warn-up text-center" style="border-radius:1rem;">
			<p class="warn-title">提示</p>
			<p id="warn-content" class="warn-content">{{msg}}</p>
			<div class="understand">
				<button id="warn-btn" @click="btnClick">确定</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: ''
			}
		},
		methods: {
			btnClick(e) {
				this.$parent.hideTips();
			}
		}
	}
</script>
<style>
	.warn-mask {
		display: block;
	}
</style>