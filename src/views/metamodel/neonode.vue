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
    add
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
      handleSubmit(form, done){
        add(this.obj).then(() => {
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
