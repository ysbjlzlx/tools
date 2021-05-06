<template>
  <div>
    <el-button-group>
      <el-button v-on:click="json2yaml()">JSON <i class="el el-icon-right"></i> YAML</el-button>
      <el-button v-on:click="yaml2json()">YAML <i class="el el-icon-right"></i> JSON</el-button>
    </el-button-group>
    <el-row :gutter="5">
      <el-col :span="12">
        <label>JSON</label>
        <el-input type="textarea" rows="20" v-model="state.json" placeholder="JSON" />
      </el-col>
      <el-col :span="12">
        <label>YAML</label>
        <el-input type="textarea" rows="20" v-model="state.yaml" placeholder="YAML" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { ElMessage, ElInput, ElButton, ElButtonGroup, ElRow, ElCol } from "element-plus";
import YAML from "yaml";

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
      ElMessage.warning({
        showClose: true,
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