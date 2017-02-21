<template>
<div id="container" class="index container">
	<v-header></v-header>
	<div v-show="showInfo" id="main" class="main">
		<div class="row list">
			<div class="col-xs-3">名称/代码</div>
			<div class="col-xs-4">发行价格(元)</div>
			<div class="col-xs-3">申购日期</div>
			<div class="col-xs-2">选项</div>
		</div>
		<div id="stock-list" class="stock-list">
            <div v-for="stock in stocks" class="row stock-items">
                <div class="col-xs-3">
                    <span>{{stock.stkname}}</span>
                    <br>
                    <span>{{stock.stkcode}}</span>
                </div>
                <div class="col-xs-4 v-middle prize">
                    <span>{{stock.fixprice}}</span>
                </div>
                <div class="col-xs-3 v-middle">
                    <span>{{new Date(stock.issuedate).Format('MM月dd日')}} </span>
                </div>
                <div class="col-xs-2 v-middle">
                    <input class="checkbox" type="checkbox" :value="stock.stkcode" name="stock" checked="checked">
                </div>
            </div>
		</div>
		<p id="warn" style="text-align: center;color:#C7322F;margin:.1rem 0;font-size:.12rem;"></p>
		<div class="submit">
			<button @click="submit" id="sub-btn" class="btn btn-lg sub-btn">确认提交申购</button>
			<router-link class="history-link" to="/history">查看申购历史</router-link>
		</div>
	</div>
	<v-footer></v-footer>
    <validpwd v-show="showpwd"></validpwd>
	<v-preloading v-show="showPreLoading"></v-preloading>
</div>
</template>
<script>
    import VPreloading from '../common/preloading'
    import Validpwd from '../common/validpwd'
    import VHeader from './head'
    import VFooter from './foot'
    import Encryptor from '../../assets/lib/encryptor'

    export default {
        data() {
                return {
                    showPreLoading: false,
                    pwd: '',
                    showInfo: true,
                    showpwd: false,
                    stocks: ''
                }
            },
            components: {
                VPreloading,
                Validpwd,
                VHeader,
                VFooter
            },
            methods: {
                RSAEncrypt(str) {
                    var entry = this.$services.getEncryptKey(),
                        key = Encryptor.getKeyPair('10001', '', entry),
                        pwd = Encryptor.encryptedString(key, str);
                    return pwd;
                },
                getNewStock() {
                    var vm = this;
                    var params = '?param=123&pageIndex=1&pageSize=1000'
                    vm.$services.getNewStock(params, function(res) {
                        vm.showPreLoading = false;
                        vm.stocks = res.results;
                    })
                },
                submit() {
                    if (this.pwd) {
                        this.update(this.pwd)
                    } else {
                        this.showInfo = false
                        this.showpwd = true
                    }
                },
                update() {
                    var sel = [],
                    vm=this,
                        arr = document.querySelectorAll('input.checkbox:checked');
                    for (var i = 0; i < arr.length; i++) {
                        sel.push(arr[i].value)
                    }
                    var params = {
                        param: vm.RSAEncrypt(JSON.parse(vm.$services.getCookie('user')).khzh),
                        pw: this.pwd,
                        stocks: sel
                    }
                    vm.$services.orderNewStock(params, function(res) {

                        console.info(res)
                    })
                }
            },
            refresh() {},
            mounted() {
                this.getNewStock()
            },
            destroyed() {},
            watch: {
                pwd() {
                    console.info(this.pwd)
                    this.update()
                }
            }
    }

</script>
<style>
	.sub-btn {
		margin: 0 auto;
		width: 90%;
		display: block;
		height: 30px;
	    font-size: .2rem !important;
	    color:#fff;
	    background-color: #D13B36;
	}
</style>