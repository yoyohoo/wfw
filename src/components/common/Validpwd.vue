<template>
	<div id="valid-pwd" class="box">
		<p class="mmxg_box_warn">请输入您的密码：</p>
		<form>
			<label for="ipt">
				<ul>
					<li v-for="i in items.length">{{items[i-1]}}</li>
				</ul>
			</label>
			<input v-on:input="inputPwd" class="pwdInput" type="tel" id="ipt" maxlength="6" v-model:value="pwd" autofocus="true">
		</form>
		<p class="response_err">{{errMsg}}</p>
		<v-loading v-show="showLoading"></v-loading>
    	<v-toast v-show="showToast"></v-toast>
	</div>
</template>
<script>
	import VLoading from '../common/Loading'
    import VToast from '../common/toast'
    import Encryptor from '../../assets/lib/encryptor'

	export default {
		data() {
				return {
					user: {},
					showLoading: false,
					showToast: false,
					items: ['', '', '', '', '', ''],
					pwd: '',
					errMsg: '',
				}
			},
			components: {
				VLoading,
				VToast
			},
			methods: {
				inputPwd(e) {},
				RSAEncrypt(str) {
					var entry = this.$services.getEncryptKey(),
						key = Encryptor.getKeyPair('10001', '', entry),
						pwd = Encryptor.encryptedString(key, str);
					return pwd;
				},
				getUser() {
					var vm = this;
					vm.user = JSON.parse(vm.$services.getCookie('user'));
					if (!vm.user)
						vm.$router.push('login');
					vm.$services.getUser(function(res) {
						vm.user = res.firstData;
					})
				},
				toast(msg) {
					var vm = this;
					vm.showToast = true
					vm.$children[1].msg = msg
					setTimeout(function() {
						vm.showToast = false
					}, 5000)
				},
				validPwd() {
					var vm = this;
					var params = {
						username: vm.user.khzh,
						password: vm.RSAEncrypt(this.pwd)
					}
					vm.showLoading = true;
					vm.$services.validPassword(params, function(res) {
						vm.showLoading = false;
						if (res.error) {
							vm.errMsg = res.message;
							vm.toast(vm.errMsg)
						} else {
							vm.errMsg = '';
							// vm.$parent.update(params.password)
							vm.$parent.pwd = params.password
							vm.$parent.showpwd = false
							vm.$parent.showInfo = true
							vm.pwd = ''
						}
					}, function(res) {
						vm.showLoading = false;
						vm.errMsg = res.message || '出错了，请重试！';
						vm.toast(vm.errMsg)
					})
				},
			},
			watch: {
				pwd: function() {
					var l = this.pwd.length,
						c = this.items.length;
					for (var i = 0; i < c; i++) {
						if (i < l)
							this.items[i] = '•';
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
	#valid-pwd {
	    position: absolute;
	    top: 0;
	    left: 0;
	    margin: 0 auto;
	    display: block;
	    width: 100%;
	    height: auto;
	    z-index: 10000;
	    padding: 5rem 1rem;
	    text-align: center;
        background-color: #f2f2f2;
	}
	#valid-pwd li{
		background-color: #fff;
		width: 4rem;
    	height: 4rem;
	    line-height: 4.5rem;
	}
	#valid-pwd form {
		margin-top:20px;
	}
	#valid-pwd .response_err {
		color: #C7322F;
	}
	#valid-pwd button {
		height: 40px;
	}
	.pwdInput {
    position: absolute;
    top: 0;
    left: -5rem;
    margin: 0;
    padding: 0;
    width: 1px;
    opacity: 0;
    height: 1px;
    border: none;
}
</style>
