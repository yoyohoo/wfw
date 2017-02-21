<template>
<div style="text-align:center; margin:0 auto;">
	<img style="margin:3rem auto;" :src="NotFound" alt="">
</div>
</template>
<script>
export default {
	data() {
		return {
			NotFound: require('../../assets/img/404.png')
		}
	}
}
</script>
<style scoped>
		img{
			width: 40%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-100%);
		}
</style>
