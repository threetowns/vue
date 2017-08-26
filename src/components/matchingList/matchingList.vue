<template>
	<div class="matching_list">
		<scroller lock-x height="100%" ref="myscroller" use-pullup use-pulldown @on-pulldown-loading="pulldownFn" @on-pullup-loading="pullupFn" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" v-model="scrollerStatus">
			<div>
				<div class="matching_list_xq" v-for="list in outCallList">
					<h3 class="headline">{{list.demand_title}}</h3>
					<div class="div_1">
						<span class="leixing">{{demand_category[list.demand_category]}}</span>
						<div class="xianjia"><i>￥</i><span>{{list.current_price}}</span></div>
						<div class="yuanjia"><i>原价￥</i><span>{{list.original_cost}}</span></div>
					</div>
					<div class="div_2">
						<span class="chakan"><i></i>{{list.browse_count}}</span>
						<span class="xihuan"><i></i>{{list.fav_count}}</span>
						<span class="shijian">{{list.create_time}}<i></i></span>
					</div>
					<span class="xujie xu"></span>
					<!--<span class="xujie jie"></span>-->
					<span class="jingxingjueshu jingxing"></span>
					<!--<span class="jingxingjueshu jueshu"></span>-->
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
	import { Scroller } from 'vux';
	import $$ from '../../assets/js/common';
	//刷新配资
	const pulldownConfig = {
		content: '当前为最新',
		downContent: '下拉刷新',
		upContent: '释放后更新',
		loadingContent: 'Loading...',
		clsPrefix: 'my-'
	}
	//加载配资
	const pullupConfig = {
		content: '没有更多内容',
		upContent: '上拉加载更多',
		downContent: '释放后加载',
		loadingContent: 'Loading...',
		clsPrefix: 'my-'
	}
	//解决只刷新一次问题
	var scrollerStatus = {
		pullupStatus: 'default'
	}
	//需求分类
	var demand_category = {
		"0": "精准营销",
		"1": "数据报告",
		"2": "数据交易",
		"3": "API",
		"4": "其他定制"
	};

	export default {
		name: 'matchingList',
		components: {
			Scroller,
		},
		data() {
			return {
				pulldownConfig,
				pullupConfig,
				scrollerStatus,
				bottomCount: 20, //模拟4条
				outCallList: null,
				demand_category,
			}
		},
		computed: { //计算
		},
		props: { //继承
			demandType: { //需求类型
				default: '', //---空：全部，0：需求，1：接单"
				//required: true
			},
			auditStatus: {
				default: '', //---空：全部，0：进行中，3：结束"
			},
			readSort: {
				default: '', //---10：阅读排序降序，11：阅读排序升序，20：收藏数排序降序：21：收藏数排序升序，30：时间排序降序，31：时间排序升序;
			}
		},
		methods: {
			//下拉刷新
			pulldownFn() {
				console.log(this.demandType);
				var v_this = this;
				if(v_this.onFetching) {
					// do nothing
				} else {
					v_this.onFetching = true
					setTimeout(function() {
						//定时器模拟加载
						//v_this.bottomCount += 4;
						v_this.$nextTick(() => {
							v_this.$refs.myscroller.reset({
								top: 0
							})
						})
						v_this.onFetching = false
					}, 1000);
				}
			},
			//上拉加载更多
			pullupFn() {
				var v_this = this;
				if(v_this.onFetching) {
					// do nothing
				} else {
					v_this.onFetching = true
					setTimeout(function() {
						//定时器模拟加载
						v_this.bottomCount += 10;
						v_this.scrollerStatus.pullupStatus = 'default';
						v_this.$nextTick(() => {
							v_this.$refs.myscroller.reset();
						})
						v_this.onFetching = false
					}, 1000);
				}
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
			this.$nextTick(() => {
				this.$refs.myscroller.reset({
					top: 0
				})
			});
			//初始数据请求
			var v_this = this;

			/*	$$.ajax({
					'type': "post",
					'url': '/data/demandType/getOutCallList',
					'data': {
						"version": "1.0",
						"pageSize": 5,
						"pageNum": 1,
					},
					'success': function(result) {
						console.log(result, 'axios-post没有参数')
					},
					'error': function(error) {
						console.log('error')
					}
				});*/

			$$.post("/data/demandType/getOutCallList", {
				"version": "1.0",
				"pageSize": 5,
				"pageNum": 1,
			}, function(data) {
				console.log(data);
				var _data = data;
				if(_data.status) {
					_data = {
						"status": 0,
						"msg": "",
						"data": {
							"count": 0,
							"outCallList": [{
									"id": "1",
									"demand_title": "标题1",
									"demand_category": "0",
									"audit_status": "1",
									"create_time": "2017-01-01",
									"original_cost": 100,
									"current_price": 10,
									"browse_count": 10,
									"fav_count": 10
								},
								{
									"id": "2",
									"demand_title": "标题2",
									"demand_category": "0",
									"audit_status": "1",
									"create_time": "2017-01-01",
									"original_cost": 100,
									"current_price": 10,
									"browse_count": 10,
									"fav_count": 10
								}
							]
						}
					}
				};
				v_this.outCallList = _data.data.outCallList;
			});
		},
		activated() {
			this.$refs.scroller.reset()
		}
	}
</script>

<style lang="less">
	@import url("./index.less");
</style>