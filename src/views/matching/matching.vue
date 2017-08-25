<template>
	<div class="matching">
		<swiper loop auto :list="swiperList" dots-position="center" height="100%" class="swiperList"></swiper>
		<div class="nav_2">
			<div class="nav_d">
				<router-link to="/"><img src="./nav_bg_1.png" /><span>精准营销</span></router-link>
			</div>
			<i class="nav_line"></i>
			<div class="nav_d">
				<router-link to="/"><img src="./nav_bg_2.png" /><span>数据报告</span></router-link>
			</div>
			<i class="nav_line"></i>
			<div class="nav_d">
				<router-link to="/"><img src="./nav_bg_3.png" /><span>数据报告</span></router-link>
			</div>
			<i class="nav_line"></i>
			<div class="nav_d">
				<router-link to="/"><img src="./nav_bg_4.png" /><span>API</span></router-link>
			</div>
			<i class="nav_line"></i>
			<div class="nav_d">
				<router-link to="/"><img src="./nav_bg_5.png" /><span>其他定制</span></router-link>
			</div>
		</div>
		<matching-list :demand-type="demandType" :audit-status="auditStatus"
			:read-sort="readSort"></matching-list>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
	import { Swiper } from 'vux';
	import FooterNav from '../../components/footer/footer';
	import MatchingList from '../../components/matchingList/matchingList';
	//焦点图片组
	var swiperList = [{
			url: 'http://m.baidu.com',
			img: 'https://static.vux.li/demo/1.jpg',
		},
		{
			url: 'http://m.baidu.com',
			img: 'https://static.vux.li/demo/1.jpg',
		},
		{
			url: 'http://m.baidu.com',
			img: 'https://static.vux.li/demo/1.jpg',
		}
	];

	export default {
		name: 'matching',
		components: {
			Swiper,
			MatchingList,
			FooterNav,
		},
		data() {
			return {
				swiperList,
				demandType: '',//---空：全部，0：需求，1：接单"
				auditStatus:'',//---空：全部，0：进行中，3：结束"
				readSort:'',//---10：阅读排序降序，11：阅读排序升序，20：收藏数排序降序：21：收藏数排序升序，30：时间排序降序，31：时间排序升序;
			}
		},
		computed: { //计算
		},
		props: { //继承
		},
		methods: {},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
		}
	}
</script>

<style lang="less">
	@import url("./index.less");
</style>