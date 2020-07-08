<template>
  <basic-container>
    <avue-form :option="option" v-model="obj" @submit="handleSubmit">
      <template slot-scope="{row}" slot="input">
        <el-tag></el-tag>
      </template>
    </avue-form>
  </basic-container>
</template>

<script>
  import {
    addRelation
  } from "@/api/metamodel/neonode";

  export default {
    data() {
      return {
        obj: {
          dynamic: [{},{}]
        },
        option: {
          labelWidth: 110,
          column: [{
            label: '关系开始节点',
            prop: "startNode",
            type: "select",
            dicUrl: "/api/blade-neo4j/select",
            span:12,
            row: true
          },
          {
            label: '关系结束节点',
            prop: "endNode",
            type: "select",
            dicUrl: "/api/blade-neo4j/select",
            span:12,
            row: true
          },
          {
            label: '标签',
            prop: "label",
            span:12,
            row: true
          },
          {
            label: '属性映射',
            prop: 'dynamic',
            type: 'dynamic',
            children: {
              align: 'center',
              headerAlign: 'center',
              rowAdd: (done) => {
                this.$message.success('新增成功');
                done();
              },
              rowDel: (row, done) => {
                this.$message.success('删除成功');
                done();
              },
              column: [{
                width: 200,
                label: '属性名称',
                prop: "key",
                type: "input",
                // formslot: true,
              }, {
                width: 200,
                label: '属性值',
                prop: "value",
                type: "input",
                // formslot: true,
              }]
            }
          }]
        }
      }
    },
    methods:{
      handleSubmit(form,done){
        console.log(this.obj);
        console.log();
        addRelation(this.obj).then(() => {
          done();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
        // this.$message.success(JSON.stringify(this.obj))
      }
    }
  };
</script>

<style>
</style>
