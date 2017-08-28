import Vue from 'vue'
import Ajax from 'assets/js/ajax';

const alert = (title, content) => {
  return Vue.$vux.alert.show({
    title,
    content
  })
}

/**
 * 发送验证码
 * @param {string} phone 手机
 * @param {string} email 邮箱
 * @param {string} type  类型，1:注册;2,登录
 **/
export const sentVerify = (phone, email, type) => Ajax.post('/data/userinfo/wxSendCode',{
    "phone": phone, "email": email, "type": type
  },function(res){
    if (res.status != '0') {
      alert('温馨提示', res.msg )
    }
})
