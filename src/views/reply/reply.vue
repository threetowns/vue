<template>
	<div class="reply">
		<div class="name_input_w">
			<div class="name_input">
				<span class="name">姓名</span>
				<div class="_input">
					<input class="textOverflow" type="text" name="name" id="name" placeholder="必填，请输入2-5个字" v-model="submitData.name" @change="inputChange(2,5,'name')" />
				</div>
			</div>
			<div class="name_input">
				<span class="name">联系方式</span>
				<div class="_input">
					<input class="textOverflow" type="text" name="" id="" value="" placeholder="必填，请输入手机号码" v-model="submitData.tel" @change="checkPhone('tel')" />
				</div>
			</div>
		</div>
		<div class="name_textarea_w">
			<div class="name_textarea"> <span class="name">详情描述</span>
				<div class="_textarea"> <textarea placeholder="必填，请输入500字以内描述。" v-model="submitData.details" @change="inputChange(0,500,'details')"></textarea> </div>
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
		<div class="_button_after"></div>
		<input class="_button" type="button" id="" value="提交回复" @click="submitFn" />
	</div>
</template>

<script>
	export default {
		name: 'reply',
		components: { //组件
		},
		data() {
			return {
				filesA: [],
				filesALen: 5,
				filesSize: 5 * 1024 * 1024,
				filesType: ["image/png", "image/jpeg"],
				submitData: {
					name: null,
					tel: null,
					details: null,
					enclosure: null,
				}
			}
		},
		computed: { //计算

		},
		props: { //继承

		},
		methods: { //方法
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
					//fall = null; //手动释放内存
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
			//删除图片
			closeFn(i) {
				this.filesA.splice(i, 1);
			},
			//字数验证
			inputChange(imin, imax, valName) {
				if(this.submitData[valName] < imin || this.submitData[valName] > imax) {
					this.submitData[valName] = null;
				}
			},
			//手机号验证
			checkPhone(valName) {
				if(!(/^1[34578]\d{9}$/.test(this.submitData[valName]))) {
					this.submitData[valName] = null;
				}
			},
			//提交
			submitFn() {
				var enclosure = this.submitData.enclosure = [];
				for(var i = 0; i < this.filesA.length; i++) {
					enclosure[i] = this.filesA[i]['file'];
				};
				console.log('提交数据:', this.submitData);
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	@import url("./index.less");
</style>