<template>
  <basic-container>
    <el-col :span="8" style="height:600px;">
      <el-table :data="taskData" border style="width: 100% " size="small">
        <el-table-column prop="taskId" label="任务ID" width="120"></el-table-column>
        <el-table-column prop="name" label="任务名称" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleTableClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="16" style="height:600px;">
      <el-tabs v-model="activeName" @tab-click="handleTabClick" style="padding-left: 10px;">

        <el-tab-pane label="任务输入" name="input">
          <el-card class="box-card" v-for="(info, index) in dataArr" :key="index" >
            <read-form v-if="info.type==='form'" v-bind:formList="info.data" v-bind:title="info.title"></read-form>
            <read-table v-if="info.type==='table'" v-bind:dataList="info.data" v-bind:columns="info.tableColumns" v-bind:title="info.title"></read-table>
            <file-list v-if="info.type==='file'" v-bind:title="info.title" v-bind:files="info.data"></file-list>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="任务输出" name="output">
          <el-card class="box-card" v-for="(info, index) in dataArr" :key="index" >
            <read-form v-if="info.type==='form'" v-bind:formList="info.data" v-bind:title="info.title"></read-form>
            <read-table v-if="info.type==='table'" v-bind:dataList="info.data" v-bind:columns="info.tableColumns" v-bind:title="info.title"></read-table>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="任务资源" name="resource">
          <el-card class="box-card" v-for="(info, index) in dataArr" :key="index" >
            <read-form v-if="info.type==='form'" v-bind:formList="info.data" v-bind:title="info.title"></read-form>
            <read-table v-if="info.type==='table'" v-bind:dataList="info.data" v-bind:columns="info.tableColumns" v-bind:title="info.title"></read-table>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="任务约束" name="constraint">
          <el-card class="box-card" v-for="(info, index) in dataArr" :key="index" >
            <read-form v-if="info.type==='form'" v-bind:formList="info.data" v-bind:title="info.title"></read-form>
            <read-table v-if="info.type==='table'" v-bind:dataList="info.data" v-bind:columns="info.tableColumns" v-bind:title="info.title"></read-table>
          </el-card>
        </el-tab-pane>

      </el-tabs>
    </el-col>
  </basic-container>
</template>

<script>
  import {getTaskInfo, downloadFile} from "../../api/metamodel/task";
  import { Loading } from 'element-ui';

  import ReadForm from "./components/readForm"
  import readTable from "./components/readTable";
  import fileList from "./components/fileList";

  export default {
    components:{
      ReadForm,
      readTable,
      fileList
    },

    data() {
      return {
        currentTaskId: null,
        activeName: 'input',
        taskData: [{taskId: '1',name:'装备巡检任务'},{taskId: '2',name:'故障维修任务'},{taskId: '3',name:'包络分析任务'}],
        retInfo: null,
        dataList: [],
        tableColumns:[],
        dataArr : []
      };
    },
    methods: {
      // download(){
      //   downloadFile().then((res)=>{
      //     console.log(res)
      //     const str = res.headers['content-disposition']
      //     let filename
      //     if (str) {
      //       filename = str.match(/filename=(\S*?)(;|$)/)[1]
      //     }
      //     filename = filename || '未命名';
      //
      //     var blob = new Blob([res],{type: "application/vnd.ms-excel"});
      //     var url = window.URL.createObjectURL(blob);
      //     var aLink = document.createElement("a");
      //     aLink.style.display = "none";
      //     aLink.href = url;
      //     aLink.download = decodeURI(filename);
      //     document.body.appendChild(aLink);
      //     aLink.click();
      //     document.body.removeChild(aLink); //下载完成移除元素
      //     window.URL.revokeObjectURL(url); //释放掉blob对象
      //   });
      // },

      handleTableClick(row) {
        this.currentTaskId = row.taskId;
        this.activeName = 'input'
        this.getTaskInfo(this.currentTaskId, 'input');
      },

      handleTabClick(tab, event) {
        //已选中某个任务实例，根据所选的Tab页向后端请求数据
        if(this.currentTaskId != null){
          this.getTaskInfo(this.currentTaskId, this.activeName);
        }else{
          this.$alert('请先选中一条任务', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      },

      getTaskInfo(taskId, type){
        let loadingInstance = Loading.service({ fullscreen: true });
        getTaskInfo(taskId, type).then((result)=>{
          loadingInstance.close();
          this.dataArr = result.data.data;
          console.log(result.data.data);
        });
      }
    }
  };
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .el-card__body{
    padding: 0px !important;
  }


</style>
