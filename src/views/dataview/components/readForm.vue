<template>
  <basic-container>
    <div style="font-weight: bold;margin-top:5px; margin-bottom: 5px ">{{title}}</div>
    <el-row v-for="(item,index) in formList" :key="index" style="color:#606266;padding-left: 10px;">
      <el-col :span="4"><div class="title" :title="item.label">{{item.label}}</div></el-col>
      <el-col :span="1"><div >：</div></el-col>
      <el-col :span="19"><div class="content" :title="item.content">{{item.content}}</div></el-col>
    </el-row>
  </basic-container>
</template>

<script>

  export default {
    props: {
      formList:{
        type: Array,
        default: []
      },
      title:{
        type: String,
        default: '标题缺失'
      }
    }
  }

</script>

<style>
  .title, .content{
    padding-right: 2px;
    white-space:nowrap;  /* 设置文字在一行显示，不能换行 */
    overflow: hidden;    /* 文字长度超出限定宽度，则隐藏超出的内容 */
    text-overflow: ellipsis;/* 规定当文本溢出时，显示省略符号来代表被修剪的文本 */
  }


</style>
