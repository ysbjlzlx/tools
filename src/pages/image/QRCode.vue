<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col-9">
        <q-input outlined counter type="textarea" rows="15" v-model="state.text" maxlength="250" label="在这里输入文本" />
      </div>
      <div class="col-3">
        <div id="qrcode" style="width: 300px; height: 300px"></div>
      </div>
    </div>
  </q-page>
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
