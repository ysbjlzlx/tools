<template>
  <el-row :gutter="5">
    <el-col :span="8">
      <label>{{ t("common.weight") }}</label>
      <br />
      <el-input type="number" v-model="state.weight" :placeholder="t('common.weight')" />
    </el-col>
    <el-col :span="8">
      <label>{{ t("common.height") }}</label>
      <br />
      <el-input type="number" v-model="state.height" :placeholder="t('common.height')" />
    </el-col>
    <el-col :span="8">
      <label>{{ t("common.text") }}</label>
      <br />
      <el-input v-model="state.text" :placeholder="t('common.text')" />
    </el-col>
  </el-row>
  <el-row :gutter="5" class="mt-5">
    <el-col :span="8">
      <label>{{ t("placeholder.bg_color") }}</label>
      <br />
      <el-color-picker v-model="state.bgColor" />
    </el-col>
    <el-col :span="8">
      <label>{{ t("placeholder.text_color") }}</label>
      <br />
      <el-color-picker v-model="state.textColor" />
    </el-col>
    <el-col :span="8">
      <label>{{ t("placeholder.extension") }}</label>
      <br />
      <el-select v-model="state.extension">
        <el-option v-for="item in extensionOptions" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </el-col>
  </el-row>
  <el-row :gutter="5" class="mt-5">
    <el-col :span="12">
      <div class="mt-1">
        <div class="border rounded mt-5">
          <img class="mx-auto d-block" v-bind:src="generationUrl" v-bind:style="{ wieght: state.weight }" :title="t('placeholder.placeholder_img')" />
        </div>
        <div class="border rounded mt-2 p-2">
          <el-input v-model="generationUrl">
            <template #append>
              <q-btn icon="content_copy" @click="onClickUrl(generationUrl)" />
            </template>
          </el-input>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="mt-1">
        <div class="border rounded mt-5">
          <img class="mx-auto d-block" v-bind:src="dummyimageUrl" v-bind:style="{ wieght: state.weight }" :title="t('placeholder.placeholder_img')" />
        </div>
        <div class="border rounded mt-2 p-2">
          <el-input v-model="dummyimageUrl">
            <template #append>
              <q-btn icon="content_copy" @click="onClickUrl(dummyimageUrl)" />
            </template>
          </el-input>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, computed } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";
import ElMessage from "element-plus/es/el-message";

const { t } = useI18n({ useScope: "global" });
const extensionOptions = [
  { value: ".png", label: ".PNG" },
  { value: ".jpg", label: ".JPG" },
  { value: ".jpeg", label: ".JPEG" },
  { value: ".gif", label: ".GIF" },
];

const state = reactive({
  weight: 150,
  height: 150,
  text: null,
  extension: ".png",
  bgColor: "#cccccc",
  textColor: "#969696",
});
const generationUrl = computed(() => {
  let host = "https://via.placeholder.com";
  host = host + "/" + state.weight;
  if (state.height && "" !== state.height) {
    host = host + "x" + state.height;
  }
  host = host + "/" + state.bgColor.substring(1);
  host = host + "/" + state.textColor.substring(1);
  if (state.text && "string" === typeof state.text && "" !== state.text) {
    host = host + "?text=" + encodeURIComponent(state.text);
  }
  host = host + state.extension;
  return host;
});
const dummyimageUrl = computed(() => {
  let host = "https://dummyimage.com";
  host = host + "/" + state.weight;
  if (state.height && "" !== state.height) {
    host = host + "x" + state.height;
  }
  host = host + "/" + state.bgColor.substring(1);
  host = host + "/" + state.textColor.substring(1);
  if (state.text && "string" === typeof state.text && "" !== state.text) {
    host = host + "?text=" + encodeURIComponent(state.text);
  }
  host = host + state.extension;
  return host;
});
function onClickUrl(text) {
  clipboard.writeText(text);
  ElMessage.success({
    showClose: true,
    message: "复制成功",
  });
}
</script>