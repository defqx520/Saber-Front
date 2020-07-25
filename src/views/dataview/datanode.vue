<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.datanode_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-share"
                   plain
                   v-if="permission.datanode_share"
                   @click="handleShare">同 步
        </el-button>
      </template>
      <template slot-scope="{row}" slot="inputForm">
        <el-tag></el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {add, getDetail, getList, remove, update, share} from "@/api/dataview/datanode";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height: 'auto',
          calcHeight: 210,
          searchShow: true,
          searchMenuSpan: 6,
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          column: [
            {
              label: "数据节点名称",
              prop: "datanodeName",
              labelWidth: "28%",
              rules: [{
                required: true,
                message: "请输入数据节点名称",
                trigger: "blur"
              }]
            },
            {
              label: "数据节点编码",
              prop: "datanodeCode",
              labelWidth: "28%",
              rules: [{
                required: true,
                message: "请输入数据节点编码",
                trigger: "blur"
              }]
            },
            {
              label: "数据节点标签",
              prop: "datanodeTag",
              labelWidth: "28%",
              rules: [{
                required: true,
                message: "请输入数据节点标签",
                trigger: "blur"
              }]
            },
            {
              label: "从属信息",
              prop: "parentId",
              labelWidth: "28%",
              showColumn: false,
              rules: [{
                required: true,
                message: "请输入从属信息",
                trigger: "blur"
              }]
            },
            {
              label: '',
              labelWidth: 0,
              hide: true,
              prop: 'dynamic',
              type: 'dynamic',
              span: 24,
              children: {
                align: 'center',
                headerAlign: 'center',
                rowAdd: (done) => {
                  //this.$message.success('新增回调');
                  done();
                },
                rowDel: (row, done) => {
                  //this.$message.success('删除回调'+JSON.stringify(row));
                  done();
                },
                column: [
                  {
                    label: "指标编码",
                    prop: "columnName",
                    rules: [{
                      required: true,
                      message: "请输入指标名称",
                      trigger: "blur"
                    }]
                  },
                  {
                    label: "指标类型",
                    prop: "columnType",
                    type: "select",
                    dicUrl: "/api/blade-system/dict/dictionary?code=data_field_type",
                    props: {
                      label: "dictValue",
                      value: "dictKey"
                    },
                    slot: true,
                    rules: [{
                      required: true,
                      message: "请输入指标类型",
                      trigger: "blur"
                    }]
                  },
                  {
                    label: "指标长度",
                    prop: "columnLength",
                    type: 'number',
                    rules: [{
                      required: true,
                      message: "请输入指标长度",
                      trigger: "blur"
                    }]
                  },
                  {
                    label: "小数点位数",
                    prop: "columnPoint",
                    type: 'number',
                    rules: [{
                      required: true,
                      message: "请输入小数点位数",
                      trigger: "blur"
                    }]
                  },
                  {
                    label: "默认值",
                    prop: "columnDefaultValue",
                    rules: [{
                      required: false,
                      message: "请输入默认值",
                      trigger: "blur"
                    }]
                  },
                  {
                    label: "指标注释",
                    prop: "columnNote",
                    rules: [{
                      required: true,
                      message: "请输入指标注释",
                      trigger: "blur"
                    }]
                  },
                  {
                    label: "是否允许为空",
                    prop: "columnIsnull",
                    type: "select",
                    dicUrl: "/api/blade-system/dict/dictionary?code=yes_no",
                    props: {
                      label: "dictValue",
                      value: "dictKey"
                    },
                    slot: true,
                    rules: [{
                      required: true,
                      message: "请输入是否允许为空",
                      trigger: "blur"
                    }]
                  },
                ]
              }
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.datanode_add, false),
          viewBtn: this.vaildData(this.permission.datanode_view, false),
          delBtn: this.vaildData(this.permission.datanode_delete, false),
          editBtn: this.vaildData(this.permission.datanode_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      rowSave(row, done, loading) {
        add(row).then(() => {
          done();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          done();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      handleShare() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据同步数据库表?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return share(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "同步成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    },
  };
</script>

<style>

</style>
