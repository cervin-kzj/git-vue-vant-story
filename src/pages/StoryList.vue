<template>
  <div class="listWrap">
    <title-nav :title="classify"></title-nav>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-swipe-cell v-for="(item,index) in storyList" :key="index">
        <van-cell :border="false" :title="item.title" value="滑动" />
        <template #right>
          <van-button square type="danger" text="删除" /><van-button square type="info" text="查看" @click="jumpUrl(item.id)" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>
<script>
import Vue from "vue";
import { SwipeCell, Cell, Button, List } from "vant";
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(Button);
Vue.use(List);
import TitleNav from "../components/TitleNav";
import { requestStoryList } from "../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      finished: false,
      storyList: [],
      classifyId: 0,
      classify: "",
      page: 1,
    };
  },
  components: {
    TitleNav,
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == `/storydetail/${to.params.id}`) {
      from.meta.keepAlive = true;
      // console.log(from.meta);
    } else {
      from.meta.keepAlive = false;
      // console.log(from.meta);
    }
    next();
  },
  activated(){
    // console.log("activated");
  },
  deactivated(){
    // console.log("deactivated");
  },
  created(){
    // console.log("created");
  },
  beforDestroy(){
    // console.log("beforDestroy");
  },
  destroyed(){
    // console.log("destroyed")
  },
  mounted() {
    // console.log("mounted");
    this.classify = this.$route.params.classify;
    this.classifyId = this.$route.params.classifyId;
  },
  methods: {
    jumpUrl(id) {
      this.$router.push(`/storydetail/${id}`);
    },
    onLoad() {
      try {
        requestStoryList({
          classifyId: this.classifyId,
          page: this.page,
        }).then((reject) => {
          let arr = reject.data.showapi_res_body.contentlist;
          for (let i = 0; i < arr.length; i++) {
            this.storyList.push(arr[i]);
          }
          // 加载状态结束
          this.loading = false;

          this.page++;
          // 数据全部加载完成
          if (this.storyList.length >= reject.data.showapi_res_body.allNum) {
            this.finished = true;
          }
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
}
.van-swipe-cell {
  border-bottom: 1px solid #ccc;
}
</style>