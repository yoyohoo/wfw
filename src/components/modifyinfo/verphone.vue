<template>
<div class="verphone">
	<div class="mainverphpne">
		<mt-cell title="需要使用新手机验证后，才能修改手机号："></mt-cell>
		<mt-field v-model="vercode" :attr="{maxlength:6}" placeholder="请输入验证码">
			<input @click="getVerCode" :class="verdis" class="ver" type="button" v-model="vertxt" :disabled="lock">
		</mt-field>
	</div>
	<button @click="save" type="button" class="btn btn-lg btn-danger btn-block submityzm">确认修改</button>
</div>
</template>
<script>
	import {
		MessageBox
	} from 'mint-ui';
	export default {
		data() {
			return {
				vertxt: '获取验证码',
				lock: false,
				vercode:'',
				verdis:''
			}
		},
		methods: {
			getVerCode() {
				var timer = null,
					count = 60,
					vm = this;

				function ver() {
					if (count > 1) {
						vm.lock = true;
						count--;
						vm.verdis = 'ver-dis'
						vm.vertxt = count + '秒后重试'
					} else {
						vm.lock = false;
						vm.verdis = ''
						vm.vertxt = '获取验证码'
					}
					return true;
				};
				ver() && (timer = setInterval(ver, 1000))

				vm.$services.getPhoneVerCode('?phone=13686420108', function(res) {
					if(res.error) {
						MessageBox('出错了', res.message)
					}else{
						vm.sercode = res.results[0].vcode;
					}
				})
			},
			clear() {
				this.vercode = ''
				this.sercode = ''
			},
			save() {
				if(this.vercode!=this.sercode){
					MessageBox('提示','验证码不正确，请重试！');
				}else{
					this.$parent.showInfo=true;
					this.$parent.showverphone=false;
					this.$parent.account.mobile = this.$parent.mobile
				 	this.$forceUpdate()
					this.$parent.save();
				}
			}
		}
	}
</script>
<style>
	.verphone .mint-cell-title{
		text-align: center;
		padding: 1rem;
		font-size:1.4rem;
	}
	.verphone .mint-field-core{
		padding-left: 22%;
	}
	.verphone .mint-cell{
		margin-bottom: 1rem;
	}
	.mainverphpne{
		min-height: calc(100vh - 90px);
	}
	.verphone {
		width: 100%;
		height: 100%;
	}
	.verphone span,
	.verphone input{
		color:#333;
	}
	.verphone .mint-field-other,
	.verphone .ver {
		width: 8rem;
		margin-top: 1px;
		height: 96%;
		color: #c73232;
		background-color: #fff;
	}
	.verphone button{
		margin: 1rem auto;
		width: 90%;
		border-radius: 5px;
		font-size: 1.6rem;
		height: 4rem;
	}
	.verphone .ver-dis {
		color: #000;
	}
	.verphone .is-nolabel .mint-cell-wrapper{
		min-height: 4rem!important;
		height: auto!important;
	}
	.mainverphpne .is-nolabel .mint-cell-value:after{
		content: '';
		display: inline-block;
		position: relative;
		right: 8rem;
		border-left: 1px solid #aaa;
		height: 27px;
	}
</style>
