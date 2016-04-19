/**
 * @fileoverview 全局接口
 * @author zhenn
 */

define(function (require , exports , module) {

	var Url = require('module/url/index');

	module.exports = {

		// webapi域名配置
		originMap : {
			dev : 'http://up-service.xingyunzhi.cn',
			stage : 'http://up-service.xingyunzhi.cn',
	 		pro : 'http://up-service.xingyunzhi.cn'
		},

		// 通过code获取userToken的webapi路径
		getUsertokenPath : function () {
			return this.originMap[this.env()] + '/webauth/auth';
		},

		// 获取环境
		env : function () {
			return Url.query('env') || 'pro';
		},

		// 前往登录
		login : function () {
			var base = location.protocol + '//' + location.hostname + '/uplive-login/index.html';
			var env = this.env();
			var target_uri = location.href;

			location.replace(base + '?env=' + env + '&target_uri=' + target_uri);

		},

		// 获取用户登录标示
		getUserToken : function () {
			return localStorage.getItem('uplive/usertoken');
		}

	};

});

