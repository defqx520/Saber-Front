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
            row: true,
            tip:'标签定义节点的类别',
            tipPlacement:'right',
            rules: [{
              required: true,
              message: "请输入标签",
              trigger: "blur"
            }]
          }, {
            label: '节点名称',
            prop: "neoName",
            span:12,
            row: true,
            tip:'节点名称用于节点的展示,建议不要重复',
            tipPlacement:'right',
            rules: [{
              required: true,
              message: "请输入节点名称",
              trigger: "blur"
            }]
          }, {
            label: '结果展示形式',
            type:"select",
            prop: "neoResType",
            span:12,
            row: true,
            dicData:[{
              label:'表格',
              value:'table'
            },{
              label:'表单',
              value:'form'
            },{
              label:'文件',
              value:'file'
            }],
            rules: [{
              required: true,
              message: "请选择结果展示形式",
              trigger: "blur"
            }]
          },{
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
      //新增节点的提交方法
      handleSubmit(form, done){
        let params = {
          label: this.obj.label,
          neoName: this.obj.neoName,
          neoResType: this.obj.neoResType
        }
        const dynamic_ = this.obj.dynamic;
        let other = [];
        for(let index in dynamic_){
          if(dynamic_[index].key){
            other.push({key:(dynamic_[index].key) ,value: dynamic_[index].value});
          }
        }
        params.other = other;
        add(params).then((result) => {
          done();
          if(result.data.code==200){
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            //如何提交成功后清空表单？
          }
        });
      }
    }
  };
</script>

<style>
</style>
