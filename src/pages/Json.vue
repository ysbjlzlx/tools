<template>
  <div>
    <div ref="jsoneditor" id="jsoneditor" style="width: 100%; height: 500px"></div>
  </div>
  <div class="q-mt-md">
    <q-btn color="primary" v-on:click="clearCacheJson">删除所有</q-btn>
  </div>
  <q-table :columns="state.columns" :rows="state.cache_json">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="content" :props="props">
          {{ props.row.content }}
        </q-td>
        <q-td key="operate" :props="props">
          <q-btn-group>
            <q-btn color="primary" icon="edit" v-on:click="edit(props.row.content)" size="sm">编辑</q-btn>
            <q-btn color="warning" icon="delete" v-on:click="cache_json_delete(props.row)" size="sm">删除</q-btn>
          </q-btn-group>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import JSONEditor from "jsoneditor";
import { remove } from "lodash";
import db from "../store/db";

const columns = [
  {
    name: "content",
    label: "Content",
    field: (row) => row.content,
  },
  {
    name: "operate",
    label: "操作",
  },
];

const state = reactive({
  plain: null,
  cache_json: [],
  editor: null,
  columns: columns,
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
        save(jsonString);
        state.cache_json.unshift({ content: jsonString });
      }
    },
  };
  state.editor = new JSONEditor(jsoneditor.value, options);

  state.cache_json = getCache();
  if (state.cache_json[0]) {
    state.editor.setText(state.cache_json[0].content);
  }
});
function getCache() {
  const cache_json_str = window.localStorage.getItem("cache_json");
  if (cache_json_str && "" !== cache_json_str) {
    const tmp = JSON.parse(cache_json_str);
    if ("object" === typeof tmp && Array.isArray(tmp)) {
      tmp.forEach((item) => {
        if ("string" === typeof item) {
          clearCacheJson();
        }
      });
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
  remove(state.cache_json, (value, index) => {
    return val === value;
  });
}

const save = (jsonString) => {
  db.json.put({ content: jsonString, createdAt: new Date() });
};
</script>
<style src="jsoneditor/dist/jsoneditor.css"></style>
