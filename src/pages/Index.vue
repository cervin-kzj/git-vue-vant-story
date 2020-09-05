<template>
  <div class="indexWrap">
    <div class="banner">
      <van-swipe :autoplay="1000" :height="400" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" width="100%" height="100%"/>
        </van-swipe-item>
      </van-swipe>
      <div class="timer">
          <span class="second">{{second}}s</span><span>跳过广告</span>
      </div>
    </div>
    <div class="welcome">
        欢迎光临童话故事
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload} from "vant";

Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);

let img0=require("../assets/image/0.jpg");
let img1=require("../assets/image/1.jpg");
let img2=require("../assets/image/2.jpg");

export default {
  data() {
    return {
      images: [
        img0,
        img1,
        img2
      ],
      second:0
    };
  },
  mounted(){
      this.second=this.images.length;
  },
  methods:{
      onChange(index){
          this.second--;
          if(this.second<=0){
              this.$router.push("/storytype");
          }
      }
  }
};
</script>
<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.banner{
    position: relative;
}
.timer{
    position: absolute;
    right: 0;
    bottom: 0;
}
.welcome{
    height: 100px;
    line-height: 100px;
    text-align: center;
}
</style>