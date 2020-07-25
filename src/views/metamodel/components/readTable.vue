<template>
  <div class=''>
    <basic-container>
      <div style="font-weight: bold;margin-top:5px; margin-bottom: 5px ">{{title}}</div>
      <el-table :data="dataList" style="width: 100%" border>
        <template v-for="(item,index) in columns">
          <el-table-column :prop="item.prop" :key='item.label' :label="item.label" :align="item.align" :width="item.width"></el-table-column>
        </template>
  <!--      <el-table-column label="操作" align="center">-->
  <!--        <template slot-scope="scope">-->
  <!--          <el-button size="mini" v-for="(btn,index) in operates" :type="btn.type" :key="index" @click.native.prevent="btn.method(index,scope.row)">{{btn.label}}</el-button>-->
  <!--        </template>-->
  <!--      </el-table-column>-->
      </el-table>
    </basic-container>
  </div>
</template>

<script>
  export default {
    props:{
      dataList:{
        type:Array,
        default:[]
      },
      columns:{
        type:Array,
        default:[]
      },
      title:{
        type: String,
        default: ''
      }
      // operates:{}
    }
  }
</script>
