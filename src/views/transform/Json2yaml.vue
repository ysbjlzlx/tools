<template>
  <div class="mt-2">
    <div class="btn-group">
      <button role="button" class="btn btn-outline-primary" v-on:click="json2yaml()">JSON <i class="bi bi-arrow-right"></i> YAML</button>
      <button role="button" class="btn btn-outline-primary" v-on:click="yaml2json()">YAML <i class="bi bi-arrow-right"></i> JSON</button>
    </div>
    <div class="row mt-2">
      <div class="col form-floating">
        <textarea class="form-control" style="height: 512px" v-model="state.json" placeholder="JSON"></textarea>
        <label>JSON</label>
      </div>
      <div class="col form-floating">
        <textarea class="form-control" style="height: 512px" v-model="state.yaml" placeholder="YAML"></textarea>
        <label>YAML</label>
      </div>
    </div>
    <Toast :title="state.toast.title" :content="state.toast.content" :show="state.toast.show" @hidden="state.toast.show = false"></Toast>
  </div>
</template>
<script setup>
import Toast from "/@/src/components/Toast.vue";
import { reactive, watch } from "vue";
import YAML from "yaml";

const state = reactive({
  json: "",
  yaml: "",
  toast: {
    title: "",
    content: "",
    show: false,
  },
});
const json2yaml = () => {
  try {
    const json = JSON.parse(state.json);
    state.yaml = YAML.stringify(json);
  } catch (e) {
    if (e instanceof SyntaxError) {
      state.toast.title = "Tools";
      state.toast.content = "JSON 格式错误";
      state.toast.show = true;
    } else {
      console.warn(e);
    }
  }
};
const yaml2json = () => {
  try {
    const yaml = YAML.parse(state.yaml);
    state.json = JSON.stringify(yaml);
  } catch (e) {
    if (e instanceof SyntaxError) {
      state.toast.title = "Tools";
      state.toast.content = "JSON 格式错误";
      state.toast.show = true;
    } else {
      console.warn(e);
    }
  }
};
</script>