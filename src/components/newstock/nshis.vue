<template>
<div>
	<v-header></v-header>
	<div id="main" class="main history-main-content">
		<div id="history-time" class="history-content">
			<img :src="his_icon">
			<span class="history-time"></span>
		</div>
		<div class="row history-list">
			<div class="col-xs-4">
				名称/代码
			</div>
			<div class="col-xs-4">
				发行价格(元)
			</div>
			<div class="col-xs-4">
				申购日期
			</div>
		</div>
		<div id="history-item" class="history-item">
		</div>
	</div>
	<v-preloading v-show="showPreLoading"></v-preloading>
</div>
</template>
<script>
    import VPreloading from '../common/preloading'
    import VHeader from './head'
    import History from './history.js'

    export default {
    	data() {
    			return {
                    showPreLoading: false,
    				his_icon: require('assets/img/icon_2')
    			}
    		},
    		components: {
    			VPreloading,
    			VHeader
    		},
    		mounted() {
    			History.init();
    		},
    		methods: {}
    }
</script>