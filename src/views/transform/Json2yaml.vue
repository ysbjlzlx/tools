<template>
  <div class="mt-2">
    <div></div>
    <div class="row">
      <div class="col form-floating">
        <textarea class="form-control" style="height: 512px" v-model="state.json" placeholder="JSON"></textarea>
        <label>JSON</label>
      </div>
      <div class="col form-floating">
        <textarea class="form-control" style="height: 512px" v-model="state.yaml" placeholder="YAML"></textarea>
        <label>YAML</label>
      </div>
    </div>
    <Toast :title="state.toast.title" :content="state.toast.content" :show="state.toast.show"></Toast>
  </div>
</template>
<script setup>
import Toast from "/@/src/components/Toast.vue";
import { reactive, watch } from "vue";
import * as YAML from "yaml";

const state = reactive({
  json: "",
  yaml: "",
  toast: {
    title: "",
    content: "",
    show: false,
  },
});
watch(
  () => state.json,
  (val) => {
    try {
      const json = JSON.parse(val);
      state.yaml = YAML.stringify(json);
    } catch (e) {
      if (e instanceof SyntaxError) {
        state.toast.title = new Date().getTime() + " JSON 格式错误";
        state.toast.show = true;
      }
      console.log(e);
    }
  }
);
</script>