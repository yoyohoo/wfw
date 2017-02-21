<template>
	<div class="container-fluid" id="kf_myPosition">
		<div class="btnList text-center">
			<form class="">
				<div class="btn-group" data-toggle="buttons">
					<label class="btn btn-left" :class="stockPos.class">
						<input class="btn-left" type="radio" name="options" id="stock" @click="setActivePosition('stock')">股票持仓
					</label>
					<label class="btn btn-right" :class="fundPos.class">
						<input class="btn-right" type="radio" name="options" id="finance" @click="setActivePosition('fund')">理财持仓
					</label>
				</div>
			</form>
			<div class="clearfix head-content">
				<div class="pull-left ">
					<p class="btnList-value">总市值</p>
					<p>{{total_va}}</p>
				</div>
				<div class="pull-right">
					<p class="btnList-profit">综合盈亏</p>
					<p :class="ykcls">{{total_yk}}</p>
				</div>
			</div>
		</div>
		<v-stock v-show="stockPos.show"></v-stock>
		<v-fundation v-show="fundPos.show"></v-fundation>
		<v-loading v-show="showld"></v-loading>
		<vague v-show="showvg"></vague>
		<validpwd v-show="showvl"></validpwd>
	</div>
</template>
<script>
 	import VStock from './Stock'
	import VFundation from './Fund'
 	import VLoading from '../common/Loading'
	import Vague from '../common/Vague'
	import Validpwd from '../common/Validpwd'

 	export default {
 		data() {
 				return {
 					position: 'stock',
 					st_va: '',
 					st_yk: '',
 					fd_va: '',
 					fd_yk: '',
 					stockPos: {
 						name: '股票',
 						class: 'hold',
 						show: false
 					},
 					fundPos: {
 						name: '理财',
 						class: 'hold',
 						show: false
 					},
 					showld: false,
 					showvg: false,
 					showvl: false
 				}
 			},
 			computed: {
 				total_va() {
 					return this.position == 'stock' ? this.st_va : this.fd_va;
 				},
 				total_yk() {
 					return this.position == 'stock' ? this.st_yk : this.fd_yk;
 				},
 				ykcls() {
 					return this.st_yk>0?'yk-rd' : 'yk-bk';
 				}
 			},

 			components: {
 				VStock,
 				VFundation,
 				VLoading,
 				Vague,
 				Validpwd
 			},
 			created() {
 				this.toggle();
 			},
 			methods: {
 				setActivePosition(pos) {
 					this.position = pos;
 				},
 				setLoading(callback) {
 					var vm = this;
 					vm.showld = true;
 					setTimeout(function() {
 						callback && callback();
 						vm.showld = false;
 					}, 500);
 				},
 				toggle() {
 					this.setLoading();
 					var flag = this.position == 'stock';
 					this.stockPos.class = flag ? 'active' : 'hold';
 					this.stockPos.show = flag ? true : false;
 					this.fundPos.class = flag ? 'hold' : 'active';
 					this.fundPos.show = flag ? false : true;
 					this.content = flag ? this.stockPos.name : this.fundPos.name;
 				}
 			},
 			watch: {
 				position: function(newValue, oldValue) {
 					this.toggle();
 				},
 			}
 	}
</script>
<style>
	.head-content{
	    width:80%;
	    margin:3rem auto;
	    padding:1.5rem 2.5rem 1rem 2.5rem;
	    border-radius: 1rem;
	    background-color: rgba(255,255,255,0.8);
	}
	.head-content p{
	    margin-bottom:0.5rem;
	}
	.head-content div{
	    width:50%;
	}
	.btnList{
	    /*margin:0 auto;*/
	    width:100%;
	    padding:3rem 0 0.5rem 0;
	    /*width:18rem;*/
			background-color: #C73232;
	    background-image: url(../../assets/img/myPosition.png);
	    background-position:0 0;
	    background-repeat: no-repeat;
	    background-size: 100% 100%;
	}
	.btnList label{
	    padding:0.4rem 2rem;
	}
	.btn-left{
	    border-top-left-radius: 1.3rem;
	    border-bottom-left-radius: 1.3rem;
	    /*margin-right:-4px;*/
	}
	.btn-right{
	    /*margin-left:-3px;*/
	    border-top-right-radius: 1.3rem;
	    border-bottom-right-radius: 1.3rem;
	}
	.active{
	    background-color: #C72820;
	    color:#ffffff;
	}
	.active:hover{
	    color:#ffffff;
	}
	.hold{
	    background-color: #ffffff;
	    color:#000000;
	}
	.list-head{
	    margin:1.5rem 0.5rem;
	    /*padding:1rem;*/
	    border:1px solid #DADADA;
	    font-size:0.9em;
	}
	.list-head>div{
	    padding:0.5rem;
	}
	.list-content{
	    background-color: #ffffff;
	    padding:2rem 1.4rem;
	    font-size:0.9em;
	    margin-bottom:2px;
	}
	.list-content p:first-child{
	    margin-bottom:0.5rem;
	}
	.noInfo {
	    text-align: center;
	    margin-top: 5rem;
	    color:#B1B1B1;
	}
	.noInfo img{
	  width:50px;
	  margin-bottom:10px;
	}
	.yk-rd {
		color: red;
	}
	.yk-bk {
		color: black;
	}
</style>
