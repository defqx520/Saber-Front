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
            row: true,
            rules: [{
              required: true,
              message: "请选择关系开始的节点",
              trigger: "blur"
            }]
          },
          {
            label: '关系结束节点',
            prop: "endNode",
            type: "select",
            dicUrl: "/api/blade-neo4j/select",
            span:12,
            row: true,
            rules: [{
              required: true,
              message: "请选择关系结束的节点",
              trigger: "blur"
            }]
          },
          {
            label: '标签',
            prop: "label",
            type: "select",
            span:12,
            row: true,
            dicData: [{
              label:'输入',
              value:'输入'
            },{
              label:'输出',
              value:'输出'
            },{
              label:'资源',
              value:'资源'
            },{
              label:'约束',
              value:'约束'
            }],
            rules: [{
              required: true,
              message: "请输入标签",
              trigger: "blur"
            }]

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
      //新增关系的提交方法
      handleSubmit(form,done){
        let params = {
          startNode: this.obj.startNode,
          endNode: this.obj.endNode,
          label: this.obj.label,
          neoName: this.obj.label   //默认使用选择的label作为关系的展示名称
        }
        const dynamic_ = this.obj.dynamic;
        let other = [];
        for(let index in dynamic_){
          if(dynamic_[index].key){
            other.push({key:(dynamic_[index].key) ,value: dynamic_[index].value});
          }
        }
        params.other = other;
        addRelation(params).then((result) => {
          done();
          if(result.data.code==200){
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          }
        });
      }
    }
  };
</script>

<style>
</style>
