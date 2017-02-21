<template>
<div class="container-fluid" id="kf_relieve">
	<div class="text-center">
		<div class="account-head relieve">
			<i id="release" class="account-img"></i>
			<p class="head-p">客户号:<span>{{mask}}</span></p>
		</div>
	</div>
	<div class="row main">
		<div class="col-xs-12 accounts" >
			<p >资金账号：<span class="pull-right">{{mask}}</span></p>
			<p >融资融券账户：<span class="pull-right">无</span></p>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="container">
				<button @click="logout" type="button" class="btn btn-lg btn-danger btn-block queren">解除绑定</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import {
		MessageBox
	} from 'mint-ui';
	export default {
		data() {
			return {
				mask: '',
				account: JSON.parse(this.$services.getCookie('user')).khzh
			}
		},
		methods: {
			logout() {
				var vm = this;
				var callback = function(res){
					// vm.$services.deleteCookie('user');
					MessageBox({
						title: '提示',
						message: res.message,
					}).then(action => {
						WeixinJSBridge.invoke('closeWindow', {}, function(res) {
							//alert(res.err_msg);
						});
					});
				}
				vm.$services.logout(callback);
			}
		},
		mounted() {
			var a = this.account,
				b = a.substr(0, 4),
				c = a.substr(a.length - 3),
				d = '*****';
			this.mask = b + d + c;
		}
	}
</script>
<style>
	#release {
	    background-image: url(../../assets/img/accountManager-img.png);
	    background-position: 0 0;
	    background-repeat: no-repeat;
	    background-size: cover;
	}
	#release	button {
		margin: 1rem auto;
		width: 90%;
		border-radius: 5px;
		font-size: 1.5rem;
		height: 3rem;
	}
	#kf_relieve .main{
		min-height: calc(100vh - 270px);
	}
	.relieve {
	    background-image: url(../../assets/img/relieve.png);
	    background-position: 0 0;
	    background-repeat: no-repeat;
	    background-size: 100% 100%;
	}
	.accounts {
    padding-top: 2rem;
}

.queren {
    width: 90%!important;
    margin: 2rem auto;
		/*font-size: 18px;
		padding:10px 0;*/
}

.accounts > p {
    padding: 0 2.4rem;
    height: 4.5rem;
    line-height: 4.5rem;
    margin-bottom: 2px;
    background-color: #fff;
}

.accounts > input {
    margin-bottom: 3px;
}
</style>
