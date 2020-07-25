<template>
  <div>
    <basic-container>
      <el-row>
        <el-col :span="16" ><div id="visualization" class="grid-content bg-purple" style="height:600px" ></div></el-col>
        <el-col :span="8">
          <div style="height:600px;border-left :1px solid #000;padding:10px">
            <div>双击节点查看属性</div>
            <el-table
              :data="tableData"
              style="width: 100%;height:100%;overflow-y: auto">
              <el-table-column
                prop="name"
                label="字段"
                width="180">
              </el-table-column>
              <el-table-column
                prop="comment"
                label="备注"
                width="180">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

    </basic-container>
  </div>
</template>

<script>
  //按需引入
  import { DataSet, Network } from 'vis/index-network';
  import { loadNetworkData, getNodeById } from "../../api/metamodel/neonode";

  let _this;

  export default {
    name: 'VisNetWork',
    data () {
      return {
        network: null,
        nodes: null,
        edges: null,
        tableData: []
      }
    },
    mounted(){
      this.create();
    },
    methods: {
      create () {
        _this = this;
        this.loadNetworkData();
      },

      //加载网络数据
      loadNetworkData(){
        // 创建节点对象
        this.nodes = new DataSet([]);   //id label
        // 创建连线对象
        this.edges = new DataSet([]);   //from to
        loadNetworkData().then((result)=>{
          var nodes_ = result.data.data.nodes;
          var edges_ = result.data.data.edges;
          //添加节点
          for(var node in nodes_){
            this.nodes.add({
              id:nodes_[node].id,
              label:nodes_[node].label
            });
          }
          //添加边
          for(var edge in edges_){
            this.edges.add({
              id: edges_[edge].id,
              arrows: 'to',
              from: edges_[edge].from,
              to: edges_[edge].to,
              label: edges_[edge].label+'',
              font: {align: "middle"},
              length: 200
            });
          }
          // 创建一个网络拓扑图  不要使用jquery获取元素
          var container = document.querySelector('#visualization');
          //准备数据
          var data = {nodes: this.nodes, edges: this.edges};
          //全局设置，每个节点和关系的属性会覆盖全局设置
          var options = {
            //设置节点形状
            nodes:{
              shape: 'dot',//采用远点的形式
              size: 30,
            },
            // 设置关系连线
            edges:{
            },
            //设置节点的相互作用
            interaction: {
              //鼠标经过改变样式
              hover: true
              //设置禁止缩放
              //zoomView:false
            }
          };
          this.network = new Network(container, data, options);
          //双击事件
          this.network.on("doubleClick", function(params){
            if(params.nodes && params.nodes.length > 0){
              var nodeId = params.nodes[0];
              const that = this;
              console.log(that.tableData)
              getNodeById(nodeId).then((result)=>{
                // that.setTableData(result.data.data);
                _this.tableData = [];
                for(var row in result.data.data){
                  _this.tableData.push(result.data.data[row])
                }
              });
            }
          });

        });
      },

      //根据对象组数中的某个属性值进行过滤删除
      //arrName数组名  field过滤的字段   keyValue字段值
      deleteValueFromArr(arrName,field,keyValue){
        if(arrName==null || arrName.length==0){
          return null;
        }
        for (var i =0;i< arrName.length;i++){
          if(arrName[i][field]==keyValue){
            arrName.splice(i,1);
          }
        }
        return arrName;
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
</style>
