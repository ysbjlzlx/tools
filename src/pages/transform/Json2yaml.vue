<template>
  <div>
    <q-space />
    <q-btn-group>
      <q-btn v-on:click="json2yaml()">JSON <q-icon name="arrow_right" /> YAML</q-btn>
      <q-btn v-on:click="yaml2json()">YAML <q-icon name="arrow_right" /> JSON</q-btn>
    </q-btn-group>
    <div class="row q-col-gutter-xs q-mt-md">
      <div class="col">
        <label>JSON</label>
        <q-input outlined type="textarea" rows="20" v-model="state.json" placeholder="JSON" />
      </div>
      <div class="col">
        <label>YAML</label>
        <q-input outlined type="textarea" rows="20" v-model="state.yaml" placeholder="YAML" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { useQuasar } from "quasar";
import YAML from "yaml";

const $q = useQuasar();

const state = reactive({
  json: "",
  yaml: "",
});
const json2yaml = () => {
  try {
    const json = JSON.parse(state.json);
    state.yaml = YAML.stringify(json);
  } catch (e) {
    if (e instanceof SyntaxError) {
      $q.notify({
        message: "JSON 格式错误",
      });
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
      console.warn(e);
    } else {
      console.warn(e);
    }
  }
};
</script>
