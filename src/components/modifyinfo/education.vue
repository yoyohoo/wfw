<template>
<div class="edu-picker" :class="cls">
	<div class="edu-btn">
		<div @click="cancel">取消</div>
		<div @click="select" style="float:right">选择</div>
	</div>
	<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
</div>
</template>
<script>
	import { Picker } from 'mint-ui';
	export default {
		methods: {
			onValuesChange(picker, values) {
				this.val = values[0];
			},
			show() {
				this.cls = 'animated slideInUp'
			},
			hide() {
				this.cls = 'animated slideOutDown'
			},
			select() {
				this.$parent.education = this.val || this.slots[0].values[0];
				this.hide();
			},
			cancel() {
				this.hide();
			},
		},
		data() {
			return {
				val: '',
				cls: 'hide',
				slots: [{
					flex: 1,
					defaultIndex: 0,
					values: this.$statics.Education.getData(),
					className: 'slot1',
					textAlign: 'center'
				}]
			};
		},
		watch: {
			val(value){
				this.$children[0].setSlotValue(0, value);
			}
		}
	};
</script>
<style>
	.edu-picker {
		position: fixed;
		left: 0;
		bottom:0;
		background-color: #f2f2f2;
		opacity: 1;
		width: 100%;
		height: auto;
	}
	.edu-picker .edu-btn {
	    padding: .75rem;
	    border-bottom: solid 1px #ddd;
	}
	.edu-picker .edu-btn div {
		display: inline-block;
		width: 4rem;
		text-align: center;
	    color: #333;
	}
	.animated {
		-webkit-animation-duration: .5s;
    	animation-duration: .5s;
	}
	.hide {
		display: none;
	}
</style>