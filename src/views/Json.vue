<template>
  <div>
    <div ref="jsoneditor" id="jsoneditor" style="width: 100%; height: 800px"></div>
  </div>
  <div class="border rounded mt-2 p-1 table-responsive">
    <div class="btn-group">
      <button class="btn btn-outline-primary" v-on:click="clearCacheJson">删除所有</button>
    </div>
    <table class="table">
      <tbody>
        <tr v-for="(item, index) in state.cache_json" :key="index">
          <td v-text="item"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import JSONEditor from "jsoneditor";

const state = reactive({
  plain: null,
  cache_json: [],
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
      state.cache_json.push(jsonString);
    },
  };
  const editor = new JSONEditor(jsoneditor.value, options);

  // set json
  const initialJson = {
    Array: [1, 2, 3],
    Boolean: true,
    Null: null,
    Number: 123,
    Object: { a: "b", c: "d" },
    String: "Hello World",
  };
  editor.set(initialJson);

  state.cache_json = getCache();
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
</script>
