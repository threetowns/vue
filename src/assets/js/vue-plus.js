var vuePlus = {};
vuePlus.install = function(Vue) {
	// 1. 添加全局方法或属性
	/*Vue.myGlobalMethod = function() {
		// 逻辑...
	}*/
	// 2. 添加全局资源
	Vue.directive('mousewheel', {
		bind(el, binding, vnode, oldVnode) { //只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
			if(browserInfo.FF) {
				el.addEventListener("DOMMouseScroll", function(ev) {
					var ev = ev || event;
					this.down = (ev.detail > 0);
					binding.value(this);
					ev.stopPropagation(); //阻止了事件冒泡
					ev.preventDefault(); //阻击默认行为
				})
			} else {
				el.addEventListener("mousewheel", function(ev) {
					var ev = ev || event;
					this.down = (ev.wheelDelta < 0);
					var stopB = binding.value(this);
					if(stopB == undefined || stopB) {
						ev.stopPropagation(); //阻止了事件冒泡
						ev.preventDefault(); //阻击默认行为
					}
				})
			}
		},
		/*update() {
			console.log('被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新')
		},
		unbind() {
			console.log('只调用一次， 指令与元素解绑时调用')
		}*/
	})
	Vue.directive('move', {
		bind(el, binding, vnode, oldVnode) {
			var _this, pvrPageX, pvrPageY;
			var mousemoveThisMove = function(ev) {
				var ev = ev || event;
				ev.stopPropagation(); //阻止了事件冒泡
				ev.preventDefault(); //阻击默认行为
				_this.pageXc = ev.pageX - pvrPageX;
				_this.pageYc = ev.pageY - pvrPageY;
				binding.value(_this);
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
			};
			var mouseupThisMove = function(ev) {
				var ev = ev || event;
				this.removeEventListener("mousemove", mousemoveThisMove);
				this.removeEventListener("mouseup", mouseupThisMove);
			};
			el.addEventListener("mousedown", function(ev) {
				var ev = ev || event;
				this.pageXc = this.pageYc = 0;
				_this = this;
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
				document.addEventListener("mousemove", mousemoveThisMove);
				document.addEventListener("mouseup", mouseupThisMove);
			})
		}
	})
	Vue.directive('touch', {
		bind: function(el, binding, vnode) {
			var touchType = binding.arg; //传入的模式 press swiperight swipeleft swipeup swipedown
			var timeOutEvent = 0;
			var direction = '';
			//滑动处理
			var startX, startY;
			//返回角度
			function GetSlideAngle(dx, dy) {
				return Math.atan2(dy, dx) * 180 / Math.PI;
			}
			//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
			function GetSlideDirection(startX, startY, endX, endY) {
				var dy = startY - endY;
				var dx = endX - startX;
				var result = 0;
				//如果滑动距离太短
				if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					return result;
				}
				var angle = GetSlideAngle(dx, dy);
				if(angle >= -45 && angle < 45) {
					result = 'swiperight';
				} else if(angle >= 45 && angle < 135) {
					result = 'swipeup';
				} else if(angle >= -135 && angle < -45) {
					result = 'swipedown';
				} else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 'swipeleft';
				}
				return result;
			}
			el.addEventListener('touchstart', function(ev) {
				startX = ev.touches[0].pageX;
				startY = ev.touches[0].pageY;
				//判断长按
				timeOutEvent = setTimeout(() => {
					timeOutEvent = 0;
					if(touchType === 'press') {
						binding.value()
					}
				}, 500);
			}, false);
			el.addEventListener('touchmove', function(ev) {
				clearTimeout(timeOutEvent)
				timeOutEvent = 0;
			});
			el.addEventListener('touchend', function(ev) {
				var endX, endY;
				endX = ev.changedTouches[0].pageX;
				endY = ev.changedTouches[0].pageY;
				direction = GetSlideDirection(startX, startY, endX, endY);
				clearTimeout(timeOutEvent)
				switch(direction) {
					case 0:
						break;
					case 'swipeup':
						if(touchType === 'swipeup') {
							binding.value()
						}
						break;
					case 'swipedown':
						if(touchType === 'swipedown') {
							binding.value()
						}
						break;
					case 'swipeleft':
						if(touchType === 'swipeleft') {
							binding.value()
						}
						break;
					case 'swiperight':
						if(touchType === 'swiperight') {
							binding.value()
						}
						break;
					default:
				}
			}, false);
		}
	})

	// 3. 注入组件
	/*Vue.mixin({
		created: function() {
			// 逻辑...
		}
	})*/
	// 4. 添加实例方法
	/*Vue.prototype.$myMethod = function(methodOptions) {
		// 逻辑...
	}*/
};

export default vuePlus;