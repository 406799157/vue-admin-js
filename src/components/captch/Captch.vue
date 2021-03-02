<template>
  <div class="captch-wrap">
    <div :class="{'captch text-center': true, 'captchSuccess' : captchRes}" @click="captch">{{ captchInfo }}</div>
  </div>
</template>

<script>
  import { ref } from "vue";
  export default {
    setup(props) {
      let captchInfo = ref("点击进行人机验证");
      let captchRes = ref(false);
      let captch = () => {
        setTimeout(() => {
          captchInfo.value = "人机验证已通过";
        }, 500);
        captchInfo.value = "人机验证中...";
        captchRes.value = true;
      }
      return {
        captchInfo,
        captchRes,
        captch
      }
    }
  }
</script>

<style lang="scss" scoped>
.captch-wrap {
  cursor: pointer;
  .captch {
    background-color: #eee;
    height: 32px;
    line-height: 32px;
    transition: all 0.5s;
    user-select: none;
  }:hover {
    background-color: #eff;
  }
  .captchSuccess {
    background-color: rgb(102, 187, 102);
    color: #fff;
  }
}
</style>

<style lang="sass">

</style>