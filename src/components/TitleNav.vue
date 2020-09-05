<template>
  <div class="titleNav">
    <van-sticky>
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Sticky } from "vant";
Vue.use(NavBar);
Vue.use(Sticky);
export default {
  props: ["title"],
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="">
</style>