<template>
<div class="container-fluid" id="kf_accountManager">
	<div class="fundAccount">
		<router-link to="/release"><a style="color:#000000;">资金账号：<span class="pull-right gt"></span><span class="pull-right">{{account}}</span></a></router-link>
	</div>
	<div class="row">
		<div class="col-xs-12" v-for="item in items">
			<div v-show="item.isshow" class="manager-list clearfix">
				<div>
					<h4>{{item.pmname}}</h4>
					<p>{{item.pmdesc}}</p>
				</div>
				<!-- <div> -->
					<a v-on:click="subscribe(item)" class="btn sub-btn pull-right subscibe" :class="item.subscibed?'subscibed':''" href="javascript:">{{item.action}}</a>
				<!-- </div> -->
			</div>
		</div>
	</div>
	<v-toast v-show="showToast"></v-toast>
	<v-loading v-show="showLoading"></v-loading>
</div>
</template>
<script>
	import VToast from '../common/toast'
	import VLoading from '../common/loading'

	export default {
		data() {
				return {
					showToast: false,
					showLoading: false,
					account: '',
					lock: false,
					items: []
				}
			},
			components: {
				VToast,
				VLoading
			},
			methods: {
				toast(msg) {
					var vm = this;
					vm.showToast = true
					vm.$children[1].msg = msg
					setTimeout(function() {
						vm.showToast = false
						vm.lock = false;
					}, 1000)
				},
				getAccount() {
					var a = this.$services.getCookie('user');
					if (a) {
						this.account = JSON.parse(a).khzh;
						this.getProducts();
					} else {
						this.$router.push('login')
					}
				},
				getProducts() {
					var vm = this;
					vm.$services.getProducts(function(res) {
						var items = res.results;
						for (var i in items) {
							var item = items[i];
							if (item.isshow) {
								item.subscibed = item.status == 2;
								item.action = item.subscibed ? '已订阅' : '订阅';
								vm.items.push(item);
							}
						}
					})
				},
				subscribe(item) {
					var vm = this,
						msg = ['已订阅成功！', '已取消订阅！'],
						callback = function(res) {
							item.subscibed = !item.subscibed;
							item.action = item.subscibed ? '已订阅' : '订阅';
							vm.toast(item.subscibed ? msg[0] : msg[1]);
							vm.showLoading = false;
						},
						errCallback = function(res) {
							vm.showLoading = false;
						};
					if(vm.lock) return false;
					vm.lock = true;
					vm.showLoading = true;
					var params = {
						pmid: item.pmid
					}
					if (item.subscibed) {
						vm.$services.unSubscribeProd(params, callback, errCallback)
					} else {
						vm.$services.subscribeProd(params, callback, errCallback)
					}
				}
			},
			created() {
				this.getAccount();
			}
	}
</script>
<style>
.relieve{
    background-image: url(../../assets/img/relieve.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.gt{
    display:inline-block;
    margin-left: 3rem;
}
.fundAccount{
    margin-top: 1.4rem;
    margin-bottom:4.1rem;
    padding-right:1.4rem;
    padding-left:1.4rem;
    height:4.1rem;
    line-height:4.1rem;
    background-color: #ffffff;
}
.fundAccount a{
    display: block;
}
.manager-list{
    padding:2rem 2.4rem;
    background-color: #ffffff;
    margin-bottom:2px;

}
.manager-list > div:first-child {
    float: left;

}
.manager-list > div:last-child {
    float: right;

}
.manager-list h4{
    font-weight:900;
}
.manager-list p{
    font-size:0.8rem;
    color:#414141;
}
.subscibe {
		background-color: #C7322F;
		color: #ffffff;
		width: 58px;
		height: 32px;
		position: absolute;
		top: 30%;
		right: 8%;
		margin-top: -15px;
		border-radius: 1.5rem;
		padding: 0.5rem 0.12px;
}
.subscibe:link,
.subscibe:visited,
.subscibe:hover,
.subscibe:active {
    color: #ffffff;
}
.subscibed {
    background-color: #ccc!important;
}

#kf_accountManager .sub-btn {
	margin: 0 auto;
	width: 58px!important;
	display: block;
	height: 33px;
    font-size: 1.2rem !important;
    color:#fff;
    background-color: #D13B36;
}

.gt {
		display: inline-block;
		margin-left: 3rem;
    margin-top: 15px;
    line-height: 100%;
    width: 8px;
    height: 16px;
    background-image: url(../../assets/img/arr.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
