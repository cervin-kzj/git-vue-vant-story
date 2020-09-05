<template>
  <div class="listWrap">
    <title-nav :title="title"></title-nav>
    <div class="content">{{content}}</div>
  </div>
</template>
<script>

import { requestStoryDetail } from "../util/request";
import { mapGetters, mapActions } from "vuex";
import TitleNav from '../components/TitleNav'
export default {
  data() {
    return {
      content: "",
      title: "",
    };
  },
  components:{
    TitleNav
  },
  methods: {
    ...mapActions({
      setDetail: "story/setDetail",
    }),
  },
  mounted() {
    try {
      let id = this.$route.params.id;
      if (id != this.$store.getters.getDetail.id) {
        requestStoryDetail({ id }).then((reject) => {
          let { title: diy } = reject.data.showapi_res_body;
          this.content = reject.data.showapi_res_body.content;
          this.title = diy;
          this.$store.dispatch("setDetail", {
            id,
            title: this.title,
            content: this.content,
          });
        });
      } else {
        let {content,title}=this.$store.getters.getDetail
        this.content = content;
        this.title = title;
      }
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
<style lang="">
.content {
  box-sizing: border-box;
  padding: 16px;
}
</style>