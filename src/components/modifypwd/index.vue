<template>
	<div id="modify-pwd" class="box">
		<p v-if="step==1" class="mmxg_box_title">{{state1.boxTitle}}</p>
		<p v-else class="mmxg_box_title">{{state2.boxTitle}}</p>
		<p class="mmxg_box_warn">(请您定期修改交易密码，保证账户安全)</p>
		<form>
			<label for="ipt">
				<ul>
					<li v-for="i in items.length">{{items[i-1]}}</li>
				</ul>
			</label>
			<input v-on:input="inputPwd" class="pwdInput" type="tel" id="ipt" maxlength="6" v-model:value="pwd" autofocus="true">
		</form>
		<p class="response_err">{{errMsg}}</p>
		<button v-if="step==1" disabled class="mmxgNext">下一步</button>
		<button v-else class="mmxgNext">下一步</button>
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
					items: ['', '', '', '', '', ''],
					user: {},
					pwd: '',
					errMsg: '',
					tipsMsg: '',
					step: 1,
					showTips: false,
					state1: {
						boxTitle: '请输入原有密码，完成身份验证',
						pwd: '',
						disabled: true,
					},
					state2: {
						boxTitle: '请输入六位数字新密码',
						disabled: false,
					}
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
							vm.errMsg = res.message;
							vm.showTips = true;
						} else {
							vm.errMsg ='';
							vm.goNext();
						}
					},function(res){
						vm.showLoading = false;
						vm.errMsg = res.message || '出错了，请重试！';
					})
				},
				goNext() {
					this.state1.pwd = this.pwd;
					this.pwd = '';
					this.step++;
				},
				modifyPwd() {
					var vm = this;
					var params = {
						'oldPw': vm.RSAEncrypt(vm.state1.pwd),
						'newPw': vm.RSAEncrypt(vm.pwd)
					}
					vm.showLoading = true;
					vm.$services.modifyPwd(params, function(res){
						vm.showLoading = false;
						console.info(res)
					}, function(err) {
						vm.showLoading = false;

					})
				}
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
						switch(this.step) {
							case 1: return this.validPwd();
							case 2: return this.modifyPwd();
						}
					}
				}
			},
			created() {
				this.getUser();
			}
	}
</script>
<style>
	#modify-pwd {
	    position: relative;
	    top: 0;
	    left: 0;
	    margin: 0 auto;
	    display: block;
	    width: 100%;
	    height: auto;
	    padding: 10px;
	    text-align: center;
        background-color: #f2f2f2;
	}
	#modify-pwd li{
		width: 4rem;
    	height: 4rem;
	}
	#modify-pwd form {
		margin-top:20px;
	}
	#modify-pwd .response_err {
		color: #C7322F;
	}
	#modify-pwd button {
		/*height: 40px;*/
	}
	.box h1 {
    font-size: .14rem;
    font-weight: 400;
    text-align: center;
    color: #ff6600;
    padding: 0 0 .20rem;
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
.box {
    width: 100%;
    height: auto;
    padding: 10px;
    text-align: center;
    z-index: 9999;
}
.box label {
    display: block;
}

.box ul {
    border: 1px solid #c8c8c8;
    font-size: 0;
    display: inline-block;
    position: relative;

}

.box ul li {
		background: #fff;
    display: inline-block;
    width: 4.8rem;
    height: 4rem;
    font-size: 3.5rem;
    font-weight: 700;
    text-align: center;
    line-height: 4.5rem;
    border-left: 1px solid #e6e6e6;
    vertical-align: middle;
    overflow: hidden;
}

.box ul li:first-child {
    border-left: none;
}
.mmxgNext,.mmxgCheckChange{
	font-size:1.6rem;
	background:#C7322F;
	height: 48px;
	width: 90%;
	margin:2rem 5% 2rem;
	border: none;
	color: #fff;
	border-radius: 15px;
}
.mmxg_box_title{
	font-size:1.5rem;
	font-weight: 500;
}
.mmxg_box_warn{
	font-size:1.3rem;
	color:#A8A8A8;
}
</style>
