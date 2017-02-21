import apiConfig from './apiConfig'

export default {
	/**
	 * [getData get]
	 * @param  {[type]}   url         [description]
	 * @param  {Function} callback    [description]
	 * @param  {[type]}   errCallback [description]
	 * @return {[type]}               [description]
	 */
	getData(url, callback, errCallback) {
			$.ajax({
					type: "get",
					dataType: "json",
					url: url,
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data) {
						callback(data)
					},
					error: function(err) {
						errCallback && errCallback(err);
					}
				})
				// var cfg = {
				// 	withCredentials: true,
				// 	crossDomain: true
				// }
				// this.getData(url,cfg).then(callback).catch(errCallback);
		},
		/**
		 * [getDataAsync 同步]
		 * @return {[type]} [description]
		 */
		getDataAsync(url, callback, errCallback) {
			$.ajax({
				type: "get",
				dataType: "json",
				url: url,
				cache: false,
				async: false,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(data) {
					callback(data)
				},
				error: function(err) {
					errCallback && errCallback(err);
				}
			})
		},
		/**
		 * [postData post]
		 * @param  {[type]}   url         [description]
		 * @param  {[type]}   data        [description]
		 * @param  {Function} callback    [description]
		 * @param  {[type]}   errCallback [description]
		 * @return {[type]}               [description]
		 */
		postData(url, data, callback, errCallback) {
			$.ajax({
				type: "post",
				data: data,
				dataType: "json",
				url: url,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(data) {
					callback(data)
				},
				error: function(err) {
					errCallback && errCallback(err);
				}
			})
		},
		/**
		 * [getEncryptKey encryptKey]
		 * @return {[type]} [string]
		 */
		getEncryptKey() {
			return apiConfig['encryptKey']
		},
		/**
		 * [getVerifiImg 登录页：获取图片验证码]
		 * @param  {Function} callback [回调函数]
		 * @return {[type]}            [void]
		 */
		getVerifiImg(callback) {
			this.getData(apiConfig['getVerifiImg'], callback);
		},
		/**
		 * [setCookie 写]
		 * @param {[type]} key   [description]
		 * @param {[type]} value [description]
		 */
		setCookie(key, value) {
			var exp = new Date();
			exp.setTime(exp.getTime() + (30 * 60 * 1000));
			document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		/**
		 * [getCookie 读]
		 * @param  {[type]} key [description]
		 * @return {[type]}     [description]
		 */
		getCookie(key) {
			var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		/**
		 * [deleteCookie 删]
		 * @param  {[type]} key [description]
		 * @return {[type]}     [description]
		 */
		deleteCookie(key) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.getCookie(key);
			if (cval != null) {
				document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
			}
		},
		/**
		 * [login 登录页：账户登录]
		 * @param  {[type]}   params   [参数对象]
		 * @param  {Function} callback [回调函数]
		 * @return {[type]}            [void]
		 */
		login(params, callback, errCallback) {
			this.postData(apiConfig['login'], params, callback, errCallback);
		},
		/**
		 * [logout 登出]
		 * @param  {[type]}   params      [description]
		 * @param  {Function} callback    [description]
		 * @param  {[type]}   errCallback [description]
		 * @return {[type]}               [description]
		 */
		logout(callback, errCallback) {
			this.getData(apiConfig['logout'], callback, errCallback);
		},
		/**
		 * [tokenLogin token登录]
		 * @param  {[type]}   params   [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		tokenLogin(params, callback) {
			this.postData(apiConfig['tokenLogin'], params, callback);
		},
		/**
		 * [getStocks 股票]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getStocks(callback) {
			this.getData(apiConfig['getStocks'], callback);
		},
		/**
		 * [getFoundation 理财]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getFuns(callback) {
			this.getData(apiConfig['getFuns'], callback);
		},
		/**
		 * [getMoney 资产]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getMoney(callback) {
			this.getData(apiConfig['getMoney'], callback);
		},
		/**
		 * [validPassword 密码]
		 * @param  {[type]}   pwd      [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		validPassword(params, callback, errCallback) {
			this.postData(apiConfig['validPassword'], params, callback, errCallback);
		},
		/**
		 * [getAllocation 打新]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getAllocation(callback) {
			this.getData(apiConfig['getAllocation'], callback);
		},
		/**
		 * [getUserInfo 是否登录]
		 * @param  {Function} callback    [description]
		 * @param  {[type]}   errCallback [description]
		 * @return {[type]}               [description]
		 */
		getUser(callback, errCallback) {
			this.getDataAsync(apiConfig['getUser'], callback, errCallback);
		},
		/**
		 * [getUserInfo 用户信息]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getUserInfo(callback, errCallback) {
			this.getData(apiConfig['getUserInfo'], callback, errCallback);
		},
		updateUserInfo(params, callback) {
			this.postData(apiConfig['getUserInfo'], params, callback);
		},
		getSecondContact(callback) {
			this.getData(apiConfig['secondContact'], callback)
		},
		updateSecondContact(params, callback) {
			this.postData(apiConfig['secondContact'], params, callback)
		},
		getPhoneVerCode(params, callback) {
			this.getData(apiConfig['getPhoneVerCode'] + params, callback)
		},
		/**
		 * [modifyPwd 修改密码]
		 * @param  {Function} callback    [description]
		 * @param  {[type]}   errCallback [description]
		 * @return {[type]}               [description]
		 */
		modifyPwd(params, callback, errCallback) {
			this.postData(apiConfig['modifyPwd'], params, callback, errCallback);
		},
		/**
		 * [getProducts 产品]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getProducts(callback) {
			// this.getData(apiConfig['getProducts']).then(callback);
			this.getData(apiConfig['getProducts'], callback);
		},
		/**
		 * [subscribeProd 订阅]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		subscribeProd(pmid, callback) {
			this.postData(apiConfig['subscribeProd'], pmid, callback);
		},
		/**
		 * [unSubscribeProd 取消订阅]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		unSubscribeProd(pmid, callback) {
			this.postData(apiConfig['unSubscribeProd'], pmid, callback);
		},
		getRiskResult(callback) {
			this.getData(apiConfig['riskResult'], callback)
		},
		sendRiskResult(params, callback) {
			this.postData(apiConfig['riskResult'], params, callback)
		},
		getRiskQuestions(callback) {
			this.getData(apiConfig['riskQuestions'], callback)
		},
		questionnaire(params, callback) {
			this.postData(apiConfig['questionnaire'], params, callback);
		},
		getNewStock(params, callback) {
			this.getData(apiConfig['getNewStock'] + params, callback)
		},
		orderNewStock(params, callback) {
			this.postData(apiConfig['orderNewStock'], params, callback)
		}
}