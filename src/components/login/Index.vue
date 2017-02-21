<template>
<div class="container-fluid" id="login" data-hasbindevent="yes">
	<div class="row">
		<div class="col-xs-12 text-center">
			<div class="account-head">
				<i class="account-img bind-img"></i>
				<p class="head-p">
					普通账户绑定
				</p>
			</div>
		</div>
	</div>
	<form class="row">
		<div class="col-xs-12 accounts">
			<input id="account" v-model="account" class=" text-center input login_txt" type="text" maxlength="12" placeholder="请输入资金账号"><input v-model="pwd" id="pwd" class="text-center input login_txt" type="password" maxlength="6" placeholder="请输入交易密码">
		</div>
		<div class="col-xs-12">
			<div style="background-color:#ffffff;width:100%;text-align:center;">
				<input v-model="code" maxlength="4" class="login-input input login-short-txt" type="tel" placeholder="请输入验证码" style="width:59%;padding-left:3rem;text-align:center;"><b class="height-line"></b><a class="get-cout pull-right">
				<img v-on:click="flashVerifiImg" class="yzma-img" :src="verifiImg.img" style="width:6rem;height:2.5rem;margin-top:0.6rem;"></a>
			</div>
		</div>
		<div class="col-xs-12">
			<div class="container">
				<div class="checkbox">
					<label><input v-bind:checked="checked" v-on:change="checkAgree" id="checkbox" type="checkbox">我已同意</label> <a  id="agreement" style="color:#CC4441;" href="javascript:void(0);">《微信服务协议》</a>
				</div>
				<p id="warning" style="color:red; text-align: center;margin-top: 1rem;height:20px;">
				</p>
			</div>
		</div>
	</form>
	<input v-on:click="wxLogin" type="button" id="bind" class="btn btn-danger btn-lg btn-block queren" :disabled="!Boolean(checked)" value="确认绑定">
	<v-tips v-show="showTips"></v-tips>
	<v-loading v-show="showLoading"></v-loading>
    <v-toast v-show="showToast"></v-toast>
	<WXservice v-show="showWXservice"></WXservice>
</div>
</template>
<script>
	import VLoading from '../common/loading'
    import VToast from '../common/toast'
	import VTips from '../common/tips'
	import WXservice from '../agreement/wxservice'
    import Encryptor from '../../assets/lib/encryptor'
    import Actions from './actions'
	import {
		MessageBox
	} from 'mint-ui';
	export default {
		data() {
				return {
					showLoading: false,
					showToast: false,
					showWXservice: false,
					account: '',
					pwd: '',
					code: '',
					verifiImg: {
						img: '',
						randCode: ''
					},
					checked: '',
					tipsMsg: '',
					showTips: false
				}
			},
			components: {
				VLoading,
				VToast,
				VTips,
				WXservice
			},
			methods: {
				flashVerifiImg() {
					var vm = this;
					vm.$services.getVerifiImg(function(res) {
						var result = res.firstData;
						result.img = 'data:image/png;base64,' + result.img;
						vm.verifiImg = result;
					})
				},
				RSAEncrypt(str) {
					var entry = this.$services.getEncryptKey(),
						key = Encryptor.getKeyPair('10001', '', entry),
						pwd = Encryptor.encryptedString(key, str);
					return pwd;
				},
				checkAgree(e) {
					this.checked = this.checked === '' ? 'checked' : '';

				},
				validation() {
					return this.account.trim().length && this.pwd.trim().length;
				},
				showTips() {
					this.showTips = true;
				},
				hideTips() {
					this.showTips = false;
				},
				toast(msg) {
					var vm = this;
					vm.showToast = true
					vm.$children[2].msg = msg
					setTimeout(function() {
						vm.showToast = false
					}, 5000)
				},
				wxLogin() {
					var vm = this;
					if (!vm.validation()) {
						MessageBox('提示', '账号密码格式不对！')
						return false;
					}
					if(this.code.trim() !== this.verifiImg.randCode) {
						MessageBox('提示', '验证码不对！')
						return false;
					}
					var params = {
						accountType: 0,
						username: this.account,
						password: this.RSAEncrypt(this.pwd),
						randKey: Math.random(),
						source: 'PC' || 'WX',
						captcha: this.verifiImg.code,
						rememberMe: false
					}
					vm.showLoading = true;
					vm.$services.login(params, function(res) {
						vm.showLoading = false;
						if (res.error) {
							vm.checked = false;
							var msg = res.message;
							msg = msg ? msg.substr(msg.indexOf(']') + 1) : null
							MessageBox('提示', msg || '服务器出错啦！')
						} else {
							vm.$services.setCookie('user', JSON.stringify(res.firstData));
							MessageBox({
								title: '提示',
								message: '您已成功绑定资金账号，可以享受我们提供的个性化账户服务',
								confirmButtonText: '我知道了'
							}).then(actions => {
								var page = localStorage.getItem('page');
								vm.$router.push(page || 'account')
							});
						}
					}, function(err) {
						vm.toast(err)
					})
				}
			},
			created() {
				this.flashVerifiImg();
			},
			mounted() {
				Actions.init();
			}
	}
</script>
<style>
#login {
	height: 100%;
}

#login form {
	min-height: calc(100vh - 270px);
}

#login .account-head {
	padding-top: 3rem;
	min-height: 185px;
	background-color: #C73232;
}

#login .head-p {
	padding-bottom: 1.4rem;
	padding-top: 1.4rem;
	color: #fff;
	font-size: 16px;
}

#login .account-img {
	margin: 0 auto;
	display: block;
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
}

#login .bind-img {
	background-image: url('../../assets/img/bind-img.png');
	background-position: 0 0;
	background-repeat: no-repeat;
	background-size: cover;
}

#login .accounts {
	padding-top: 2rem;
}

#login .accounts > input {
	margin-bottom: 3px;
}

#login .input {
	height: 4.5rem;
	padding: 5px 0;
	border: none;
	width: 100%;
}

#login .login_txt,#login .login-short-txt {
	border-radius: 0!important;
}

#login .height-line {
	display: inline-block;
	position: relative;
	top: 0.6rem;
	left: 0;
	border-left: 1px solid #eee;
	height: 2rem;
}

.get-cout {
	height: 4.1rem;
	width: 38%;
}

.warn-mask {
	display: block;
}
/*复选框*/
#checkbox {
	-webkit-appearance: none;
	-moz-appearance: none;
	margin-top: 3px;
}

input[type="checkbox"] {
	-webkit-appearance: none;
	background: #ffffff;
	height: 15px;
	vertical-align: middle;
	width: 15px;
	border-radius: 4px;
	outline: none;
	border: none;
}

input[type="checkbox"]:checked {
	background-image: url('../../assets/img/checkbox.png');
	background-position: 0 0;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.login-short-txt {
	border-right-color: #000000!important;
}

.queren {
	width: 90%!important;
	margin: 0 5% 2rem !important;
}

.checkbox {
	margin-left: 15px;
	margin-right: 15px;
}

.agreement-body {
	overflow: scroll;
	display: none;
	position: absolute;
	top: 0;
	left: 0;
    /*right: 0;
    bottom: 0;*/
	width: 100%;
	height: 100%;
	background-color: #eee;
	z-index: 199999;
}

.swiper-slide {
	padding: 10px;
}

#deal {
	height: 4rem;
	position: fixed;
	margin-top: 20px;
	bottom: 10px;
	width: 94%;
	margin-left: 3%;
	display: none;
	z-index: 1999999;
}
/************height-line***************/
.height-line {
	display: inline-block;
	position: relative;
	top: 0.6rem;
	left: 0;
	border-left: 1px solid #eee;
	height: 2rem;
}

.show {
	-webkit-animation-name: show;
    /* Chrome, Safari, Opera */
	-webkit-animation-duration: 0.5s;
    /* Chrome, Safari, Opera */
	animation-name: show;
	animation-duration: 0.5s;
}


/* Chrome, Safari, Opera */

@-webkit-keyframes show {
	from {
		-webkit-transform: scale(0);
	}

	to {
		-webkit-transform: scale(1);
	}
}

@keyframes show {
	from {
		transform: scale(0);
	}

	to {
		transform: scale(1);
	}
}
</style>
