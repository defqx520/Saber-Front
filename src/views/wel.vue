<template>
  <div>
    <basic-container>
      <p style="text-align: center;">
        欢迎您使用导弹大数据中心！
      </p>
    </basic-container>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "wel",
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    created() {
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  };
</script>

<style>
  .el-divider--horizontal {
    margin: 12px 0 !important;
  }

  .el-font-size {
    font-size: 14px;
  }
</style>

