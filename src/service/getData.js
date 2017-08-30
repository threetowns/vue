import Ajax from 'assets/js/ajax';

/**
 * 发送验证码
 * @param {string} phone 手机
 * @param {string} email 邮箱
 * @param {string} type  类型，1:注册;2,登录
 **/
export const sentVerify = (params) => Ajax.fetch('/api/userinfo/wxSendCode', params)

/**
 * 登录
 **/
export const Login = (params) => Ajax.fetch('/api/userinfo/wxLogin', params)

/**
 * 注册
 **/
export const Join = (params) => Ajax.fetch('/api/userinfo/wxRegister', params)

/**
 * 找回密码
 **/
export const forgetPassword = (params) => Ajax.fetch('/api/userinfo/wxRetrieve', params)

/**
 * 退出
 **/
export const logout = (params) => Ajax.fetch('/api/userinfo/wxLogout', params)

/**
 * 检查是否登录
 **/
export const checkLogin = (params) => Ajax.fetch('/api/userinfo/wxCheckLogin', params)
