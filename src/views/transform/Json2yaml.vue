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
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import * as YAML from "yaml";

const state = reactive({
  json: "",
  yaml: "",
});
watch(
  () => state.json,
  (val) => {
    try {
      const json = JSON.parse(val);
      state.yaml = YAML.stringify(json);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e);
      }
      console.log(e);
    }
  }
);
</script>