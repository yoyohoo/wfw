<template>
<!-- 输入密码查看相关内容 -->
<div class="box-mask">
	<div class="box">
		<span class="closedown" onclick="WeixinJSBridge.call('closeWindow');">X</span>
		<h5 style="font-size:17px;">密码验证</h5>
		<h5>资金账号:<span id="fundNUm"></span></h5>
		<form>
			<label for="ipt">
				<ul>
					<li v-for="i in items.length">{{items[i-1]}}</li>
				</ul>
			</label>
			<input v-on:input="inputPwd" type="tel" id="ipt" maxlength="6" v-model:value="pwd" autofocus="true">
		</form>
	</div>
	<div id="keyboardDIV"></div>
	<v-tips v-show="showTips"></v-tips>
	<v-loading v-show="showLoading"></v-loading>
</div>
</template>
<script>
	import VLoading from '../common/Loading'
	import VTips from '../common/tips'
    import Encryptor from '../../assets/lib/encryptor'

	export default {
		data() {
				return {
					showLoading: false,
					items: ['','','','','',''],
					user: {},
					pwd: '',
					tipsMsg:'',
					showTips: false
				}
			},
			components: {
				VLoading,
				VTips
			},
			methods: {
				inputPwd(e) {},
				RSAEncrypt(str) {
					var entry = this.$services.getEncryptKey(),
						key = Encryptor.getKeyPair('10001', '', entry),
						pwd = Encryptor.encryptedString(key, str);
					return pwd;
				},
				hideTips() {
					this.showTips = false;
				},
				getUser() {
					var vm = this;
					vm.user = JSON.parse(vm.$services.getCookie('user'));
					if(!vm.user)
						vm.$router.push('login');
					vm.$services.getUserInfo(function(res){
						vm.user = res.firstData;
					})
				},
				validPwd() {
					var vm = this;
					var params = {
						username: vm.user.khzh,
						password: vm.RSAEncrypt(this.pwd)
					}
					vm.showLoading = true;
					vm.$services.validPassword(params,function(res){
						vm.showLoading = false;
						if (res.error) {
							vm.tipsMsg = res.message;
							vm.showTips = true;
						} else {
							vm.$parent.showvg = false;
							vm.$parent.showpwd = false;
							vm.$services.setCookie('isLogin',true);
						}
					},function(res){
						vm.showLoading = false;
						vm.tipsMsg = res.message || '出错了，请重试！';
						vm.showTips = true;
					})
				},
			},
			watch: {
				pwd: function() {
					var l = this.pwd.length,
						c = this.items.length;
					for (var i = 0; i < c; i++) {
						if (i < l)
							this.items[i] = '*';
						else
							this.items[i] = '';
					}
					this.$forceUpdate();
					if (l == 6) {
						this.validPwd();
					}
				}
			},
			created() {
				this.getUser();
			}
	}
</script>
<style>
	.box-mask {
		display: block;
	}
	.box-mask .box {
		width: 80%;
		z-index: 9998;
	}
	.box-mask .box li{
		width: 35px;
    	height: 35px;
	}
	.box-mask form {
		margin-top:20px;
	}
	.box-mask .box .closedown {
		display: inline-block;
	    position: absolute;
	    left: 0;
	    top: 0;
	    font-size: 17px!important;
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    color: #B6B6B6;
	}
</style>