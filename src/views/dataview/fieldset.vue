<template>
  <basic-container>
    <avue-crud :option="infoOption"
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
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/dataview/fieldset";
  import {mapGetters} from "vuex";

  export default {
    name: "fieldset",
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
              label: "",
              prop: "id",
              rules: [{
                required: true,
                message: "请输入",
                trigger: "blur"
              }]
            },
            {
              label: "指标名称",
              prop: "columnName",
              rules: [{
                required: true,
                message: "请输入指标名称",
                trigger: "blur"
              }]
            },
            {
              label: "指标类型",
              type: "select",
              dicUrl: "/api/blade-system/dict/dictionary?code=data_field_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              slot: true,
              prop: "columnType",
              rules: [{
                required: true,
                message: "请输入指标类型",
                trigger: "blur"
              }]
            },
            {
              label: "指标长度",
              prop: "columnLength",
              rules: [{
                required: true,
                message: "请输入指标长度",
                trigger: "blur"
              }]
            },
            {
              label: "小数点位数",
              prop: "columnPoint",
              rules: [{
                required: true,
                message: "请输入小数点位数",
                trigger: "blur"
              }]
            },
            {
              label: "",
              prop: "columnDefaultValue",
              rules: [{
                required: true,
                message: "请输入",
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
              type: "select",
              dicUrl: "/api/blade-system/dict/dictionary?code=yes_no",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              slot: true,
              prop: "columnIsnull",
              rules: [{
                required: true,
                message: "请输入是否允许为空",
                trigger: "blur"
              }]
            },
            {
              label: "所属专业",
              prop: "datanodeId",
              rules: [{
                required: true,
                message: "请输入所属专业",
                trigger: "blur"
              }]
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
          addBtn: this.vaildData(this.permission.fieldset_add, false),
          viewBtn: this.vaildData(this.permission.fieldset_view, false),
          delBtn: this.vaildData(this.permission.fieldset_delete, false),
          editBtn: this.vaildData(this.permission.fieldset_edit, false)
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
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
    }
  };
</script>

<style>
</style>
