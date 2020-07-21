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
          <el-card class="box-card">
            <div v-for="(info,index) in retInfo" :key="index" class="text item" style="padding:0px">
              <span style="font-weight: bold">{{index}}</span>
              <p>
                {{ info }}
              </p>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="任务输出" name="output">
          <div v-for="(info,index) in retInfo" :key="index" class="text item" style="padding:0px">
            <span style="font-weight: bold">{{index}}</span>
            <p>
              {{ info }}
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="任务资源" name="resource">
          <read-form></read-form>
        </el-tab-pane>
        <el-tab-pane label="任务约束" name="constraint">任务约束</el-tab-pane>
      </el-tabs>
    </el-col>
  </basic-container>
</template>

<script>
  import {getTaskInfo} from "../../api/metamodel/task";
  import { Loading } from 'element-ui';

  import ReadForm from "./components/readForm"

  export default {
    components:{
      ReadForm
    },

    data() {
      return {
        currentTaskId: null,
        activeName: 'input',
        taskData: [{taskId: '1',name:'装备巡检任务'},{taskId: '2',name:'故障维修任务'}],
        retInfo: null
      };
    },
    methods: {
      handleTableClick(row) {
        this.currentTaskId = row.taskId;
        this.activeName = 'input'
        this.getTaskInfo(this.currentTaskId, 'input');
      },

      handleTabClick(tab, event) {
        //已选中某个任务实例，根据所选的Tab页向后端请求数据
        console.log(this.activeName, tab.name);
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
          this.retInfo = result.data.data
          console.log(this.retInfo);
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

</style>
