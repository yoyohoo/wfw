<template>
<div style="height:100%">
<ul v-show="showInfo" class="zhxx-lists">
	<li class="zhxx-lists-head">
		<span>
			账户信息
		</span>
	</li>
	<li>
		<div>
			<span>
				客户代码
			</span>
			<span>{{account.client_name}}</span>
		</div>
	</li>
	<li>
		<div>
			<span>
				客户姓名
			</span>
			<span>{{account.client_name}}</span>
		</div>
	</li>
	<li>
		<div>
			<span>
				性别
			</span>
			<span>{{sex}}</span>
		</div>
	</li>
	<li>
		<div>
			<span>
				证件类型
			</span>
			<span>{{idType}}</span>
		</div>
	</li>
	<li>
		<div>
			<span>
				证件号码
			</span>
			<span>{{account.id_no}}</span>
		</div>
	</li>
	<li @click="singleSelect(0, 'education')" style="position:relative;">
		<div>
			<span>
				学历
			</span>
			<b class="border-right">
			</b>
			<input class="zhxxContactInput" disabled type="text" name="学历" placeholder="请选择学历" v-model="education">
			<b class="arrow">
			</b>
		</div>
	</li>
	<li @click="singleSelect(1,'profession')" style="position:relative;">
		<div>
			<span>
				职业
			</span>
			<b class="border-right">
			</b>
			<input class="zhxxContactInput" disabled type="text" name="职业" placeholder="请选择职业" v-model="profession">
			<b class="arrow">
			</b>
		</div>
	</li>
	<li @click="singleSelect(2, 'contactway')" style="position:relative;">
		<div>
			<span>
				联络方式
			</span>
			<b class="border-right">
			</b>
			<input class="zhxxContactInput" disabled type="tel" name="联络方式" placeholder="请选择联络方式" v-model="contactway">
			<b class="arrow">
			</b>
		</div>
	</li>
	<li @click="singleSelect(3, 'contactfreq')" style="position:relative;">
		<div>
			<span>
				联络频率
			</span>
			<b class="border-right">
			</b>
			<input class="zhxxContactInput" disabled type="text" name="联络频率" placeholder="请选择联络频率" v-model="contactfreq">
			<b class="arrow">
			</b>
		</div>
	</li>
	<li>
		<div>
			<span>
				移动电话
			</span>
			<b class="border-right">
			</b>
			<input class="textRight" type="tel" name="移动电话" placeholder="输入您的手机号码" v-model="mobile"
			maxlength="11">
		</div>
	</li>
	<li>
		<div>
			<span>
				电话号码
			</span>
			<b class="border-right">
			</b>
			<input class="textRight" type="tel" name="电话号码" placeholder="输入您的电话号码" v-model="account.phonecode">
		</div>
	</li>
	<li>
		<div>
			<span>
				电子邮件
			</span>
			<b class="border-right">
			</b>
			<input class="textRight" type="text" name="email" placeholder="输入您的邮箱地址" v-model="account.e_mail">
		</div>
	</li>
	<li>
		<div style="position: relative;height: 100%;">
			<span class="addr">
				地址
			</span>
			<b class="border-right">
			</b>
			<textarea type="text" class="addr-content" placeholder="请输入联系地址" v-model="account.address">
			</textarea>
			<div class="clear">
			</div>
		</div>
	</li>
	<li>
		<div>
			<span>
				邮政编码
			</span>
			<b class="border-right">
			</b>
			<input class="textRight" type="number" name="邮政编码" placeholder="输入您的邮政编码" v-model="account.zipcode"
			maxlength="6">
		</div>
	</li>
	<button @click="save" type="button" class="btn btn-danger btn-block zhxxCheckBtn">保&nbsp;&nbsp;存</button>
</ul>
	<v-education></v-education>
	<v-profession></v-profession>
	<v-contactway></v-contactway>
	<v-contactfreq></v-contactfreq>
	<v-loading v-show="showLoading"></v-loading>
	<validpwd v-show="showpwd"></validpwd>
	<verphone v-show="showverphone"></verphone>
	<v-toast v-show="showToast"></v-toast>
</div>
</template>
<script>
	import {
		MessageBox
	} from 'mint-ui';

    import VEducation from './education'
    import VProfession from './profession'
    import VContactway from './contactway'
	import Verphone from './verphone'
    import VContactfreq from './contactfreq'
	import VLoading from '../common/loading'
	import Validpwd from '../common/validpwd'
    import VToast from '../common/toast'

	export default {
		data() {
			return {
				account: '',
				showInfo: true,
				showLoading: false,
				showToast: false,
				showpwd: false,
				showverphone:false,
				lock: false,
				pwd: null,
				mobile: null,
				education: null,
				profession: null,
				contactway: null,
				contactfreq: null,
			}
		},
		computed: {
			sex() {
				return parseInt(this.account.sex) ? '男' : '女';
			},
			idType() {
				var type = '';
				switch (this.account.id_kind) {
					case '0': type = '身份证号';
					break;
					default:
					break;
				}
				return type;
			}
		},
		components: {
			VLoading,
			VEducation,
			VProfession,
			VContactway,
			VContactfreq,
			Validpwd,
			Verphone,
			VToast
		},
		methods: {
			singleSelect(idx, prop) {
				this.$children[idx].val = this[prop]
				this.$bus.$emit('singleSelect', this.$children[idx]);
			},
			toast(msg) {
				var vm = this;
				vm.showToast = true
				vm.$children[6].msg = msg
				setTimeout(function() {
					vm.showToast = false
				}, 5000)
			},
			load() {
				var vm = this;
				vm.showLoading = true;
				vm.lock = true;
				vm.$services.getUserInfo(function(res){
					vm.showLoading = false;
					if(!res.results.length) {
						MessageBox('提示', res.message || '没有数据')
						return false;
					}
					vm.lock = false;
					vm.account = res.results[0];
					vm.mobile = vm.account.mobile;
					vm.education = vm.$statics.Education.getValue(vm.account.education);
					vm.profession = vm.$statics.Profession.getValue(vm.account.occtype);
					vm.contactway = vm.$statics.Contactway.getValue(vm.account.contact);
					vm.contactfreq = vm.$statics.Contactfreq.getValue(vm.account.contactfrep);
					vm.$children[0].val = vm.education
					vm.$children[1].val = vm.profession
					vm.$children[2].val = vm.contactway
					vm.$children[3].val = vm.contactway
				})
			},
			save() {
				if (this.mobile != this.account.mobile) {
					this.showInfo = false;
					this.showverphone = true;
					return false;
				}

				if (this.pwd) {
					this.update(this.pwd)
				} else {
					this.showInfo = false
					this.showpwd = true
				}
			},
			update(pwd) {
				var vm = this;
				vm.account.pw = pwd;
				vm.showLoading = true;
				vm.lock = true;
				vm.$services.updateUserInfo(vm.account, function(res) {
					vm.showLoading = false;
					MessageBox('提示', res.message)
					vm.load()
				})
			}
		},
		mounted() {
			this.load();
		},
		watch: {
			education(value) {
				this.account.education = this.$statics.Education.getKey(value)
				this.account.edu = this.account.education
			},
			profession(value) {
				this.account.occtype = this.$statics.Profession.getKey(value)
			},
			contactway(value) {
				this.account.contact = this.$statics.Contactway.getKey(value)
			},
			contactfreq(value) {
				this.account.contactfrep = this.$statics.Contactfreq.getKey(value)
			},
			pwd(value) {
				this.update(value)
			}
		}
	}
</script>
<style>
	.zhxx-lists input:disabled {
		background-color: #fff;
	}
	.border-right{
	position: relative;
	top: 1rem;
	left: 0;
	display: inline-block;
	border-right:1px solid  #f2f2f2;
	height: 3rem;
}
	.zhxx-lists .arrow {
		display:inline-block;
		position: absolute;
		right: 1rem;
		top:1.8rem;
		width: .7rem;
		height: 1.5rem;
		background: url(../../assets/img/arrow.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
	.zhxx-lists button {
		margin: 2rem auto;
	}
	/*账户信息修改*/
	.zhxx-lists{
		margin-top: 1rem;
		padding-bottom: 1px;
	}
	.zhxx-lists-head{
	font-size: 1.6rem;
	height: 5rem;
	line-height: 5rem;
	text-align: center;
	margin-bottom: .5rem;
	background: #ffffff;

}

.zhxx-lists li:not(:first-child){
	font-size: 1.4rem;
	line-height: 5rem;
	padding-left: 1rem;
	background: #fff;

}
.zhxx-lists li:nth-child(7){
	margin-top: 1rem;
}
.zhxx-lists>li div,.delxr-lists>li div{
	border-bottom: 1px solid #f2f2f2;
}
.zhxx-lists>li div span:first-child{
	display:inline-block;
	width: 23%;

}
.zhxx-lists>li div span:last-child,.zhxx-lists>li div input{
	text-align: right;
	display:inline-block;
	width: 72%;
}
.zhxx-lists>li div textarea{
	height: 5rem;
	padding-top: 1.7rem;
	position: absolute;
	right: 6%;
	top:0;
	display:inline-block;
	width: 65%;
}
textarea::-webkit-input-placeholder{
	text-align: right;
    height: 5rem;
}    /* 使用webkit内核的浏览器 */
textarea:-moz-placeholder{
	text-align: right;
    height: 5rem;
    line-height: 5rem;
}                  /* Firefox版本4-18 */
textarea::-moz-placeholder{
	text-align: right;
    height: 5rem;
    line-height: 5rem;
}                  /* Firefox版本19+ */
textarea:-ms-input-placeholder{
	text-align: right;
    height: 5rem;
    line-height: 5rem;
}
.addr{
	top: 0;
	left: 0;
}
.hqyzm{
	color:#C7322F;
}
.zhxxContactInput{
	height:4.8rem;
	padding-right:1.5rem;
	color:#000;
}
.addr-content{
	border: none;
}
.clear{
	position: absolute;
	right: 1rem;
	top: 50%;
	display:inline-block;
	opacity: 0;
	height: 1.4rem;
	width: 1.4rem;
	margin-top: -.7rem;
	font-size: 1.4rem;
	border-radius: 1.4rem;
	background:url(../../assets/img/clear-icon.png) no-repeat 0 0;
	background-size:100% 100%;
}
</style>
