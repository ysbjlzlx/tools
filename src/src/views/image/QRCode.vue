<template>
  <el-row :gutter="5">
    <el-col :span="16">
      <el-input type="textarea" rows="15" v-model="state.text" :show-word-limit="true" maxlength="250" placeholder="在这里输入文本"></el-input>
    </el-col>
    <el-col :span="8">
      <div id="qrcode" style="width: 300px; height: 300px"></div>
    </el-col>
  </el-row>
</template>
<script setup>
import { onMounted, reactive, watch, computed } from "vue";
import QRCode from "easyqrcodejs";
const state = reactive({
  QRCodeObject: null,
  text: null,
});

const QRCodeOption = computed(() => {
  return {
    text: state.text,
    width: 300,
    height: 300,
  };
});
onMounted(() => {
  state.QRCodeObject = new QRCode(document.getElementById("qrcode"), QRCodeOption.value);
});
watch(
  () => state.text,
  (val) => {
    state.QRCodeObject.clear();
    state.QRCodeObject = new QRCode(document.getElementById("qrcode"), QRCodeOption.value);
  }
);
</script>