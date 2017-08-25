<template>
	<div class="footer_nav">
		<div class="nav_d">
			<router-link to="/hello">资源库</router-link>
		</div>
		<i class="nav_line"></i>
		<div class="nav_d">
			<router-link class="search" to="/hello"></router-link>
		</div>
		<i class="nav_line"></i>
		<div class="nav_d">
			<router-link to="/hello">个人中心</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less">
	@import url("../../assets/styles/less");
	body {
		background-color: #ebebeb;
	}
	
	.footer_nav {
		display: flex;
		width: 100%;
		border-top: 1px solid @colorf;
		position: fixed;
		bottom: 0;
		left: 0;
		.nav_d {
			flex: 1;
			width: auto;
			height: 0.98rem;
			line-height: 0.98rem;
			text-align: center;
			background-color: #fafafa;
			a {
				display: block;
				width: 100%;
				height: 100%;
				color: @color3;
				.font32;
				&:hover,
				&:active {
					opacity: 0.7;
					/*color: lighten(@color3, 30%);*/
				}
				&.search {
					background: center url(browser.png) no-repeat;
					background-size: 0.70rem 0.70rem;
				}
			}
		}
		.nav_line {
			width: 1px;
			background-color: @colorc;
		}
	}
</style>