//判断浏览器
window.browserInfo = {
	ie: !-[1, ],
	ieAll: /MSIE \d/.test(navigator.userAgent),
	FF: !!navigator.userAgent.match(/firefox/i),
	webkit: /WebKit\//.test(navigator.userAgent),
	chrome: /Chrome\//.test(navigator.userAgent),
	opera: /Opera\//.test(navigator.userAgent),
	safari: /Apple Computer/.test(navigator.vendor),
	mac_geLion: /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
	mac_geMountainLion: /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
	ios: /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
	mobile: this.ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
	PC: !this.mobile,
	mac: this.ios || /Mac/.test(navigator.platform),
	windows: /windows/i.test(navigator.platform),
}