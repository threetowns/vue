import $$ from 'assets/js/common';
//刷新配资
const pulldownConfig = {
  content: '当前为最新',
  downContent: '下拉刷新',
  upContent: '释放后更新',
  loadingContent: 'Loading...',
  clsPrefix: 'my-'
};
//加载配资
const pullupConfig = {
  content: '没有更多内容',
  upContent: '上拉加载更多',
  downContent: '释放后加载',
  loadingContent: '加载中...',
  clsPrefix: 'my-'
}
//所有数据加载完
const overPullupConfig = {
  content: '没有更多内容',
  upContent: '没有更多内容',
  downContent: '没有更多内容',
  loadingContent: '没有更多内容',
  clsPrefix: 'my-'
}
//解决只刷新一次问题
var scrollerStatus = {
  pullupStatus: 'default'
}
//下拉刷新
var pulldownF = function(e, mUrl, mData) {
  console.log('下拉刷新')
  var v_this = e;
  v_this.showLoading = true;
  if(v_this.onFetching) {
    // do nothing
  } else {
    v_this.$vux.loading.show({
      text: 'Loading'
    });
    v_this.onFetching = true;
    v_this.pageNum = 1;
    $$.post(mUrl, mData, function(data) {
      console.log('data:', data);
      if(data.status == '0') {
        if(data.data.classifyList || data.data.demandUserList || data.data.demandAnswerList || data.data.demandFavList) {
          if(data.data.classifyList) {
            v_this.classifyList = data.data.classifyList;
          }
          if(data.data.demandUserList) {
            v_this.classifyList = data.data.demandUserList;
          }
          if(data.data.demandAnswerList) {
            v_this.classifyList = data.data.demandAnswerList;
          }
          if(data.data.demandFavList) {
            v_this.classifyList = data.data.demandFavList;
          }
        } else {
          v_this.classifyList = '';
        }

        v_this.dataCount = data.data.count;
        v_this.$nextTick(() => {
          v_this.$refs.myscroller.reset({
            top: 0
          })
        });
        v_this.$vux.loading.hide();
        //数据全部加载完了
        if(v_this.dataCount == v_this.classifyList.length) {
          console.log('加载完了')
          v_this.$refs.myscroller.donePullup();
          v_this.$refs.myscroller.disablePullup();
        } else {
          v_this.$refs.myscroller.enablePullup();
        }
      } else {
        v_this.$vux.loading.hide();
        if(data.status == '-1') {
          v_this.$vux.loading.show({
            text: '登录过期'
          });
          setTimeout(() => {
            v_this.$vux.loading.hide();
            v_this.$router.push('/login');
          }, 1000);
        }

      }
      v_this.onFetching = false;
    });
  }
}
//上拉加载更多
var pullupF = function(e, mUrl, mData) {
  console.log('上拉');
  var v_this = e;
  if(v_this.onFetching) {
    // do nothing
  } else {
    v_this.onFetching = true;
    if(v_this.dataCount != v_this.classifyList.length) {
      $$.post(mUrl, mData, function(data) {
        console.log(data)
        if(data.status == '0') {
          if(data.data.classifyList) {
            v_this.classifyList = [...v_this.classifyList, ...(data.data.classifyList)];
          }
          if(data.data.demandUserList) {
            v_this.classifyList = [...v_this.classifyList, ...(data.data.demandUserList)];
          }
          if(data.data.demandAnswerList) {
            v_this.classifyList = [...v_this.classifyList, ...(data.data.demandAnswerList)];
          }
          if(data.data.demandFavList) {
            v_this.classifyList = [...v_this.classifyList, ...(data.data.demandFavList)];
          }
          v_this.dataCount = data.data.count;
          //数据全部加载完了
          if(v_this.dataCount == v_this.classifyList.length) {
            console.log('加载完了')
            v_this.$refs.myscroller.disablePullup();
          }
        } else {
          alert('服务器错误');
        }
        v_this.scrollerStatus.pullupStatus = 'default';
        v_this.$nextTick(() => {
          v_this.$refs.myscroller.reset();
        })

        v_this.onFetching = false
      });
    } else {
      v_this.onFetching = false;
      console.log('没有更多内容');
      setTimeout(function() {
        v_this.$refs.myscroller.donePullup();
        v_this.$refs.myscroller.disablePullup();
        v_this.$refs.myscroller.reset();
      }, 100);

    }
  }
}
//数据更改后调用
var watchF = function(e, newV, oldV) {
  if(newV != oldV) {
    console.log("数据更改");
    e.pulldownFn();
  }
}

export {
  pulldownConfig,
  pullupConfig,
  scrollerStatus,
  pulldownF,
  pullupF,
  watchF
}

/*export default {
  pulldownConfig1,
  pullupConfig1,
  scrollerStatus1
};*/