<template>
	<div>
		<div class="container-fluid" id="kf_offeringBallot">
        <div class="" style="width:100%;height:100%;">
            <div class="text-center">
                <div class="account-head">
                    <i class="account-img offering-img"></i>
                    <p class="head-p">中签明细</p>
                </div>
            </div>
            <div id="render">
				<div v-show="allocation.length" class="row">
					<div v-for="item in allocation" class="col-xs-12">
						<div class="ballot-list">
							<p class="text-center solid">{{item.stock_name}}</p>
							<p class="dashed">股票代码： <span class="pull-right">{{item.stock_code}}</span></p>
							<p class="dashed">中签数量： <span class="pull-right">{{item.hitqty}}股</span></p>
							<p class="dashed">中签金额： <span class="pull-right">{{item.pending_payment}}元</span></p>
							<p class="dashed">成交价格： <span class="pull-right">{{item.matchprice}}元</span></p>
							<p class="dashed">中签日期： <span class="pull-right" style="color:#CB4442;">{{item.bizdate}}</span></p>
							<p class="dashed">已交款数量： <span class="pull-right" style="color:#CB4442;">{{item.payqty}}</span></p>
							<p class="solid">已交款金额： <span class="pull-right"  style="color:#CB4442;">{{item.jkamt}}</span></p>
                            <p style="width: 100%" class="date text-right ">{{item.entrust_date}}</p>
						</div>
					</div>
				</div>
                <div v-show="!allocation.length" class="noInfo">
                    <div><img src="../../assets/img/emp-box.png"></div>
                    无相关信息！
                </div>
            </div>
        </div>
    <v-loading v-show="showLoading"></v-loading>
    <v-toast v-show="showToast"></v-toast>
    </div>
</template>
<script>
    import VLoading from '../common/loading'
    import VToast from '../common/toast'

    export default {
        data() {
                return {
                    showLoading: false,
                    showToast: false,
                    allocation: []
                }
            },
            components: {
                VLoading,
                VToast
            },
            methods: {
                toast(msg) {
                    var vm = this;
                    vm.showToast = true
                    vm.$children[1].msg = msg
                    setTimeout(function() {
                        vm.showToast = false
                    }, 5000)
                },
                formatData(data) {
                    function formatDate(date) {
                        return date.substr(0,4)+'年'
                        +date.substr(4,2)+'月'
                        +date.substr(6,2)+'日';
                    }
                    for (var i = 0; i < data.length; i++) {
                        data[i].bizdate = formatDate(data[i].bizdate);
                        data[i].entrust_date = formatDate(data[i].entrust_date);
                    }
                    return data;
                },
                getAllocation() {
                    var vm = this;
                    vm.showLoading = true;
                    vm.$services.getAllocation(function(res) {
                        vm.showLoading = false;
                        if (res.results.length) {
                            vm.allocation = vm.formatData(res.results);
                        } else {
                            vm.toast('没有中签')
                        }
                    })
                }
            },
            created() {
                this.getAllocation();
            }
    }
</script>
<style media="screen">
.offering-img {
		background-image: url(../../assets/img/offering-img.png);
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: cover;
}
.ballot-list {
    margin-top: 4rem;
}

.ballot-list>h4 {
    background-color: #ffffff;
    height: 4.1rem;
    line-height: 4.1rem;
}

.ballot-list>p {
    height: 4.1rem;
    line-height: 4.1rem;
    background-color: #ffffff;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
}

.solid {
    border-bottom: 1px solid #eaeaea;
}

.dashed {
    border-bottom: 1px dashed #EAEAEA;
}

.date {
    padding-right: 1.4rem;
}
</style>
