<template>
  <div class="reply">
    <div class="name_input_w">
      <div class="name_input">
        <span class="name">姓名</span>
        <div class="_input">
          <input class="textOverflow" type="text" name="name" id="name" :placeholder="placeholder.required + placeholder.name" v-model="submitData.name" @change="nameFn" />
        </div>
      </div>
      <div class="name_input">
        <span class="name">联系方式</span>
        <div class="_input">
          <input class="textOverflow" type="text" name="" id="" value="" :placeholder="placeholder.required + placeholder.phone" v-model="submitData.tel" @change="checkPhone" />
        </div>
      </div>
    </div>
    <div class="name_textarea_w">
      <div class="name_textarea"> <span class="name">详情描述</span>
        <div class="_textarea"> <textarea :placeholder="placeholder.required + placeholder.details" v-model="submitData.details" @input="detailsFn"></textarea> </div>
      </div>
    </div>
    <div class="name_fileImage_w">
      <div class="name_fileImage">
        <span class="name">附件</span>
        <p class="hint">仅支持上传最多5张，单张5M以内的jpg、png格式图片</p>
        <div class="fileImage_w floatClear">
          <div class="_fileImage_div left" :style="{'background-image':'url('+list['base64']+')'}" v-for="(list,i) in filesA"><i @click="closeFn(i)"></i></div>
          <div class="_fileImage left">
            <input id="fileImage" class="fileImage" type="file" accept="image/*" capture="camera" multiple="multiple" @click="fileClick($event)" @change="fileChange($event)">
          </div>
        </div>
      </div>
    </div>
    <input class="_button" type="button" id="" value="提交回复" @click="submitFn" />
  </div>
</template>

<script>
  import $$ from '../../assets/js/common';
  export default {
    name: 'reply',
    data() {
      return {
        demand_id: '',
        filesA: [],
        filesALen: 5,
        filesSize: 5 * 1024 * 1024,
        filesType: ["image/png", "image/jpeg"],
        submitData: {
          name: '',
          tel: '',
          details: '',
          enclosure: null,
        },
        oldDetails: '',
        placeholder: {
          required: '必填，',
          name: '请输入2-5个字',
          phone: '请输入正确手机号码',
          details: '请输入500字以内描述'
        }
      }
    },
    computed: { //计算
    },
    props: { //继承

    },
    methods: { //方法
      //弹窗
      promptFn(title, content) {
        this.$vux.alert.show({
          title: title || '温馨提示',
          content: content
        });
        setTimeout(() => {
          this.$vux.alert.hide()
        }, 3000);
      },
      //名字验证
      nameFn() {
        if(this.submitData.name.length < 2 || this.submitData.name.length > 5) {
          this.promptFn('', this.placeholder.name);
        }
      },
      //手机号验证
      checkPhone() {
        if(!(/^1[34578]\d{9}$/.test(this.submitData.tel))) {
          this.promptFn('', this.placeholder.phone);
        }
      },
      //请输入500字以内描述
      detailsFn() {
        if(this.submitData.details.length <= 500) {
          this.oldDetails = this.submitData.details;
        } else {
          this.submitData.details = this.oldDetails;
          this.promptFn('', this.placeholder.details);
        }
      },
      //清除上传val
      fileClick(e) {
        e.value = null;
      },
      //上传预览
      fileChange(e) {
        var _this = e.currentTarget;
        var v_this = this;
        v_this.preview(_this, function(fall) {
          for(var i = 0; i < fall.length; i++) {
            if((fall[i].file.size <= v_this.filesSize) && (fall[i].file.type == v_this.filesType[0] || fall[i].file.type == v_this.filesType[1]) && (v_this.filesA.length < v_this.filesALen)) {
              v_this.filesA.push(fall[i]);
            } else {
              if(!(fall[i].file.size <= v_this.filesSize)) {
                alert('文件大于5M');
              }
              if(!(fall[i].file.type == v_this.filesType[0] || fall[i].file.type == v_this.filesType[1])) {
                alert('图片格式不对');
              }
              if(!(v_this.filesA.length < v_this.filesALen)) {
                alert('图片多于五张');
              }
            }
          };
          fall = null; //手动释放内存
        });
      },
      //上传预览关联函数
      preview(file, fn, fnIE) {
        var readerAll, filesAll;
        if(file.files && file.files[0]) {
          readerAll = new Array;
          filesAll = new Array;
          for(var i = 0; i < file.files.length; i++) {
            (function() {
              var i_i = i;
              readerAll[i] = new FileReader();
              filesAll[i] = new Object;
              filesAll[i]['file'] = file.files[i];
              readerAll[i].readAsDataURL(file.files[i]);
              readerAll[i].onload = function(evt) {
                if(filesAll[i_i]['file']['type'].indexOf('image/') != -1) {
                  filesAll[i_i]['base64'] = evt.target.result;
                } else {
                  filesAll[i_i]['base64'] = '';
                };
                if(i_i + 1 == file.files.length) {
                  readerAll = null;
                  if(fn) {
                    fn(filesAll);
                  }
                  filesAll = null;
                }
              }
            })();
          }
        } else {
          if(fnIE) {
            fnIE(file)
          } else {
            alert('你的IE浏览器版本低,不支持本地预览');
          }
        }
      },
      //base64位转二进制文件流
      dataURItoBlob(base64Data) {
        var byteString;
        if(base64Data.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(base64Data.split(',')[1]);
        else
          byteString = unescape(base64Data.split(',')[1]);
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for(var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {
          type: mimeString
        });
      },
      //上传图片
      formImgFn(fn) {
        var v_this = this;
        var fd = new FormData(document.forms[0]);
        for(var i = 0; i < v_this.filesA.length; i++) {
          fd.append("fileImg", v_this.dataURItoBlob(v_this.filesA[i]['base64']), v_this.filesA[i]['file']['name']);
        }
        $$.ajax({
          url: '/api/file/uploadFiles2Ftp',
          method: 'post',
          processData: false, // jq必须
          contentType: false, // jq必须
          dataType: 'json',
          data: fd,
          success(data) {
            if(fn) {
              fn(data);
            }
          }
        });
      },
      //删除图片
      closeFn(i) {
        this.filesA.splice(i, 1);
      },
      //提交
      submitFn() {
        var v_this = this;
        var submitOn = true;
        if(this.submitData.name.length < 2 || this.submitData.name.length > 5) {
          submitOn = false;
        }
        if(!(/^1[34578]\d{9}$/.test(this.submitData.tel))) {
          submitOn = false;
        }
        if(this.submitData.details.length > 500 || this.submitData.details.length <= 0) {
          submitOn = false;
        }
        if(submitOn) {
          this.$vux.loading.show({
            text: 'Loading'
          });
          this.formImgFn(function(data) {
            var tsd = v_this.submitData;
            tsd.enclosure = data.path;
            var this_data = {
              "token": localStorage.getItem('userToken'),
              "data": {
                "demand_id": v_this.$route.query.id,
                "user_name": tsd.name,
                "phone": tsd.tel,
                "answer_content": tsd.details,
              }
            };
            for(var i = 0; i < tsd.enclosure.length; i++) {
              this_data['data']['pic' + (i + 1) + '_id'] = tsd.enclosure[i];
            }
            $$.post("/api/wxanswer/submitAnswer", this_data, function(data) {
              console.log('回复提交后', data);
              v_this.$vux.loading.hide();
              if(data.status = '0') {
                // v_this.$router.push('/usercenter/reply/details?id=' + data.answerId);
                v_this.$router.push('/details?id=' + v_this.$route.query.id);
              }
            });
          });
        } else {
          this.promptFn('', '信息填写不正确！');
        }
      }
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      this.demand_id = this.$route.query.id;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import url("./index.less");
</style>