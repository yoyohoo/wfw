export default {
	init() {

		var page_id = "#login";

		/**
		 *  验证登录
		 *
		 **/
		function validataLogin() {
			if (!$(page_id + " .login_txt:eq(0)").val().length) {
				$(page_id + " #warning").html("请输入账号！");
				return false;
			}
			if (!$(page_id + " .login_txt:eq(1)").val().length) {
				$(page_id + " #warning").html("请输入登录密码！");
				return false;
			}
			if ($(page_id + " .login_txt:eq(1)").val().length != 6) {
				$(page_id + " #warning").html("登录密码长度应为6位！");
				return false;
			}
			if (!$(page_id + " .login-short-txt").val().length) {
				$(page_id + " #warning").html("请输入验证码！");
				return false;
			}
			if ($(page_id + " .login-short-txt").val().length != 4) {
				$(page_id + " #warning").html("请检查验证码！");
			}
			if ($(page_id + " .att_error").hasClass("att_error")) {
				return false;
			}
			return true;
		}

		/**
		 *  密码获取焦点
		 *
		 **/
		$(page_id + ' .login_txt:eq(1)').focus(function() {
			$(this).attr("placeholder", "");
			if (!$(page_id + " .login_txt:eq(0)").val().length) {
				$(page_id + " #warning").html("请输入账号！");
			} else if ($(page_id + " .login_txt:eq(0)").val().length != 12) {
				$(page_id + " #warning").html("请检查账号位数！");
			}
		});

		/**
		 *  密码失去焦点
		 *
		 **/
		$(page_id + " .login_txt:eq(1)").blur(function() {
			if ($(this).val() == '') {
				$(this).attr("placeholder", "请输入密码")
			}
		});

		/**
		 *  验证码获取焦点
		 *
		 **/
		$(page_id + ' .login-short-txt').focus(function() {
			$(this).attr("placeholder", "");
			$(page_id + " #warning").text("");
			if (!$(page_id + " .login_txt:eq(0)").val().length) {
				$(page_id + " #warning").html("请输入账号！");
			} else if ($(page_id + " .login_txt:eq(0)").val().length != 12) {
				$(page_id + " #warning").html("请检查账号位数！");
			} else if (!$(page_id + " .login_txt:eq(1)").val().length) {
				$(page_id + " #warning").html("请输入登录密码！");
			} else if ($(page_id + " .login_txt:eq(1)").val().length != 6) {
				$(page_id + " #warning").html("请检查密码位数！");
			}
		});

		/**
		 *  验证码失去焦点
		 *
		 **/
		$(page_id + ' .login-short-txt').blur(function() {
			if ($(this).val() == '') {
				$(this).attr("placeholder", "请输入验证码")
			}
		})

		/**
		 *  账号获取焦点
		 *
		 **/
		$(page_id + ' .login_txt:eq(0)').focus(function() {
			$(this).attr("placeholder", "");
			$(page_id + " #warning").text("");
		});

		/**
		 *  账号失去焦点
		 *
		 **/
		$(page_id + ' .login_txt:eq(0)').blur(function() {
			if ($(this).val() == '') {
				$(this).attr("placeholder", "请输入账号")
			}
		})

		//查看协议内容
		$('#agreement').bind('click', function() {
			$('.agreement-body,#deal').addClass('show');
			var me = $(this);
			$('#deal').click(function() {
				$('.agreement-body,#deal').removeClass('show');
			})
		})

		/**
		 *
		 *   loadding
		 *
		 **/
		function stopDefaultAction(e) {
			if (e && e.preventDefault) {
				e.preventDefault();
			} else {
				window.event.returnValue = false;
			}
		}



	}
}