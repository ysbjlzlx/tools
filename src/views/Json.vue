<template>
  <div>
    <div ref="jsoneditor" id="jsoneditor" style="width: 100%; height: 500px"></div>
  </div>
  <div class="border rounded mt-2 pt-1 pl-1">
    <div class="btn-group">
      <button class="btn btn-outline-primary" v-on:click="clearCacheJson" title="删除所有"><i class="bi bi-trash"></i> 删除所有</button>
    </div>
    <hr class="dropdown-divider" />
    <div class="mt-2 p-1" style="max-height: 300px; overflow-y: scroll">
      <table class="table table-sm table-hover">
        <tbody>
          <tr v-for="(item, index) in state.cache_json" :key="index">
            <td class="col-11" v-text="item"></td>
            <td class="col-1">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" title="编辑" v-on:click="edit(item)"><i class="bi bi-code"></i></button>
                <button type="button" class="btn btn-outline-primary btn-sm" title="删除" v-on:click="cache_json_delete(index)"><i class="bi bi-trash"></i></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import JSONEditor from "jsoneditor";
import { remove } from "lodash";

const state = reactive({
  plain: null,
  cache_json: [],
  editor: null,
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
    onChangeText(jsonString) {
      if ("" != jsonString) {
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
  remove(state.cache_json, function (value, index) {
    return val === index;
  });
}
</script>
