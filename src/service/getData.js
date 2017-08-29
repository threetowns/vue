import Vue from 'vue'
import Ajax from 'assets/js/ajax';

/**
 * 发送验证码
 * @param {string} phone 手机
 * @param {string} email 邮箱
 * @param {string} type  类型，1:注册;2,登录
 **/
export const sentVerify = (params) => Ajax.fetch('/data/userinfo/wxSendCode', params)

/**
 * 登录
 **/
export const Login = (params) => Ajax.fetch('/data/userinfo/wxLogin', params)

/**
 * 注册
 **/
export const Join = (params) => Ajax.fetch('/data/userinfo/wxRegister', params)

/**
 * 找回密码
 **/
export const forgetPassword = (params) => Ajax.fetch('/data/userinfo/wxRetrieve', params)
