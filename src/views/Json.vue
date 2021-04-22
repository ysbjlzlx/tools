<template>
  <div>
    <div ref="jsoneditor" id="jsoneditor" style="width: 100%; height: 500px"></div>
  </div>
  <div class="mt-1" size="mini">
    <el-button type="primary" v-on:click="clearCacheJson">删除所有</el-button>
  </div>
  <el-table v-bind:data="pagination.rows" type="index" size="mini" height="300">
    <el-table-column>
      <template #default="scope">
        {{ scope.row }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" fixed="right">
      <template #default="scope">
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit" v-on:click="edit(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" v-on:click="cache_json_delete(scope.$index)" size="mini">删除</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    :total="state.cache_json.length"
    :page-size="pagination.pageSize"
    @size-change="handlePaginationSizeChange"
    @current-change="handlePaginationCurrentChange"
  >
  </el-pagination>
</template>
<script setup>
import { ElTable, ElTableColumn, ElButtonGroup, ElButton, ElPagination } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import JSONEditor from "jsoneditor";
import { remove } from "lodash";

const state = reactive({
  plain: null,
  cache_json: [],
  editor: null,
});
const pagination = reactive({
  data: [],
  rows: [],
  total: 0,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  currentPage: 1,
});
const jsoneditor = ref(null);

watch(
  () => state.cache_json,
  (val) => {
    initPagination();
    window.localStorage.setItem("cache_json", JSON.stringify(val));
  },
  { deep: true }
);

onMounted(() => {
  const options = {
    language: "zh-CN",
    mode: "code",
    onValidate(json) {
      const jsonString = JSON.stringify(json);
      if ("" !== jsonString) {
        state.cache_json.unshift(jsonString);
      }
    },
  };
  state.editor = new JSONEditor(jsoneditor.value, options);

  state.cache_json = getCache();
  if (state.cache_json[0]) {
    state.editor.setText(state.cache_json[0]);
  }
});
function getCache() {
  const cache_json_str = window.localStorage.getItem("cache_json");
  if (cache_json_str && "" !== cache_json_str) {
    const tmp = JSON.parse(cache_json_str);
    if ("object" === typeof tmp && Array.isArray(tmp)) {
      return tmp;
    }
  }
  clearCacheJson();
  return [];
}
function clearCacheJson() {
  state.cache_json = [];
  window.localStorage.setItem("cache_json", JSON.stringify(state.cache_json));
}
function edit(jsonString) {
  state.editor.setText(jsonString);
}
function cache_json_delete(val) {
  console.log(val);
  remove(state.cache_json, function (value, index) {
    return val === index;
  });
}
const initPagination = () => {
  const offset = (pagination.currentPage - 1) * pagination.pageSize;
  const limit = pagination.pageSize;
  pagination.rows = state.cache_json.slice(offset, offset + limit);
};
const handlePaginationSizeChange = (val) => {
  console.log(val);
  const offset = (pagination.currentPage - 1) * val;
  const limit = val;
  pagination.rows = state.cache_json.slice(offset, offset + limit);
};
const handlePaginationCurrentChange = (val) => {
  const offset = (val - 1) * pagination.pageSize;
  const limit = pagination.pageSize;
  pagination.rows = state.cache_json.slice(offset, offset + limit);
};
</script>
<style src="jsoneditor/dist/jsoneditor.css"></style>
