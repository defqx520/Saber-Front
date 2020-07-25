<template>
  <basic-container>
    <div style="font-weight: bold;margin-top:5px; margin-bottom: 5px ">{{title}}</div>
    <el-row v-for="(item,index) in files" :key="index">
      <el-col :span="1"><li></li></el-col>
      <el-col :span="6" class="fileName"><a :href="'/api/download?url='+item.url+'&fileName='+item.file_name" :download="item.file_name">{{item.file_name}}</a></el-col>
      <el-col :span="2" align="right"><el-button size="mini" v-if="item.is_formatted==='1'" icon="el-icon-search" circle @click="fetchData(item.table_name, item.id)"></el-button></el-col>
    </el-row>
    <el-dialog title="详细数据" :visible.sync="dialogTableVisible">
      <el-table :data="detailData">
<!--        <el-table-column prop="id" label="主键"></el-table-column>-->
<!--        <el-table-column prop="name" label="姓名"></el-table-column>-->
<!--        <el-table-column prop="age" label="年龄"></el-table-column>-->
<!--        <el-table-column prop="birthday" label="生日"></el-table-column>-->
<!--        <el-table-column prop="description" label="描述"></el-table-column>-->
        <template v-for="(item,index) in dataColumn">
          <el-table-column :prop="item.prop" :key='index' :label="item.label" :align="item.align"></el-table-column>
        </template>
      </el-table>
      <el-pagination
        background
        hide-on-single-page="true"
        layout="prev, pager, next"
        small="true"
        @current-change="currentChange"
        :total="total">
      </el-pagination>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {fetchTableData, fetchTableColumn} from "../../../api/metamodel/task"
  export default {
    props: {
      files:{
        type: Array,
        default: function () {
          return []
        }
      },
      title:{
        type: String,
        default: '标题缺失'
      }
    },

    data(){
      return {
        dataTitle: '详细数据',
        dialogTableVisible: false,
        total: 0,
        detailData: [],
        dataColumn: [],
        tableName: '',
        attachId: ''
      }
    },

    methods: {
      fetchData(tableName, attachId){
        this.tableName = tableName;
        this.attachId = attachId;
        fetchTableColumn(this.tableName).then((res)=>{
          this.dataColumn = res.data.data;
          this.getData(1);
        });

        this.dialogTableVisible = !this.dialogTableVisible;
      },

      getData(currentPage){
        fetchTableData(this.tableName, this.attachId, parseInt(currentPage)).then(res=>{
          this.total = res.data.data.total
          this.detailData = res.data.data.data;
          console.log(res);
        });
      },

      currentChange(currentPage){
        this.getData(currentPage);
      }


    }

  }


</script>

<style>
  .title, .content, .fileName{
    padding-right: 2px;
    white-space:nowrap;  /* 设置文字在一行显示，不能换行 */
    overflow: hidden;    /* 文字长度超出限定宽度，则隐藏超出的内容 */
    text-overflow: ellipsis;/* 规定当文本溢出时，显示省略符号来代表被修剪的文本 */
  }


</style>
