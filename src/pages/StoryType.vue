<template>
  <div class="typeWrap">
    <van-grid :column-num="2">
      <van-grid-item
        v-for="(item,index) of storyTypeList"
        :key="index"
        :text="item.classify"
        @click="jumpUrl(item.classifyId,item.classify)"
      />
    </van-grid>

    <van-tabbar v-model="active" :active-color="activeColor" :inactive-color="inactiveColor">
      <van-tabbar-item name="type" @click="switchActive('type')">
        <span>故事分类</span>
        <template #icon="props">
          <img :src="props.active ? icon.active_type : icon.inactive_type" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="mine" v-on:click="switchActive('mine')">
        <span>我的</span>
        <template #icon="props" :active-color="activeColor" :inactive-color="inactiveColor">
          <img :src="props.active ? icon.active_mine : icon.inactive_mine" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Grid, GridItem } from "vant";
import { requestStoryType } from "../util/request";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Grid);
Vue.use(GridItem);

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      active: "type",
      icon: {
        active_type: require("../assets/image/indexFull.png"),
        inactive_type: require("../assets/image/index.png"),
        active_mine: require("../assets/image/myFull.png"),
        inactive_mine: require("../assets/image/my.png"),
      },
      activeColor: "#07c160",
      inactiveColor: "#000",
      storyTypeList: [],
    };
  },
  mounted() {
    try {
      if (this.$store.getters.getStoryList.length > 0) {
        this.storyTypeList = this.$store.getters.getStoryList;
      } else {
        requestStoryType({}).then((resolve) => {
          this.storyTypeList = resolve.data.showapi_res_body.storylist;
          this.$store.dispatch("setStoryList", this.storyTypeList);
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions({
      setStoryList: "story/setStoryList",
    }),
    switchActive(name) {
      console.log("switchActive", name);
    },
    jumpUrl(classifyId, classify) {
      this.$router.push(`/storylist/${classifyId}/${classify}`);
    },
  },
};
</script>
<style>
html,
body,
#app,
.typeWrap {
  height: 100%;
}
.typeWrap {
  width: 100%;
  background: url("https://www.zhaoyunuo.net/1.jpg") no-repeat 0px 0px;
  background-size: 100% 100%;
}
.van-grid {
  width: 297px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.van-hairline--top::after {
  border-top-width: 0px;
}
.van-grid-item__text {
  color: #fff;
}
.van-grid-item__content--center {
  width: 138px;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 2px;
  text-align: center;
  color: #fff;
  background-color: orangered;
}
</style>