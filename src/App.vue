<template>
    <router-view></router-view>
</template>
<script>
    import 'assets/lib/jquery'

    export default {
    	data: function() {
    		return {
    			transitionName: 'slide-left'
    		}
    	},
    	watch: {
    		'$route' (to, from) {
    			const toDepth = to.path.split('/').length;
    			const fromDepth = from.path.split('/').length;
    			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    		}
    	},
    }
</script>
<style>
	  @import 'assets/css/bootstrap';
    @import 'assets/css/mint.style';
    @import 'assets/css/common';
    @import 'assets/css/animate.min';
</style>
