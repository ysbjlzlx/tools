<template>
  <div class="row q-col-gutter-xs">
    <div class="col">
      <label>{{ t("common.weight") }}</label>
      <br />
      <q-input type="number" v-model.number="state.weight" :placeholder="t('common.weight')" />
    </div>
    <div class="col">
      <label>{{ t("common.height") }}</label>
      <br />
      <q-input type="number" v-model.number="state.height" :placeholder="t('common.height')" />
    </div>
    <div class="col">
      <label>{{ t("common.text") }}</label>
      <br />
      <q-input v-model="state.text" :placeholder="t('common.text')" />
    </div>
  </div>
  <div class="row q-col-gutter-xs mt-5">
    <div class="col">
      <label>{{ t("placeholder.bg_color") }}</label>
      <br />
      <q-input filled v-model="state.bgColor">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="state.bgColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col">
      <label>{{ t("placeholder.text_color") }}</label>
      <br />
      <q-input filled v-model="state.textColor">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="state.textColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col">
      <label>{{ t("placeholder.extension") }}</label>
      <br />
      <q-select filled v-model="state.extension" :options="extensionOptions" emit-value />
    </div>
  </div>
  <div class="row q-col-gutter-xs mt-5">
    <div class="col">
      <div class="mt-1">
        <div class="border rounded mt-5">
          <img class="mx-auto d-block" v-bind:src="generationUrl" v-bind:style="{ wieght: state.weight }" :title="t('placeholder.placeholder_img')" />
        </div>
        <div class="border rounded mt-2 p-2">
          <q-input v-model="generationUrl">
            <template #append>
              <q-btn icon="content_copy" @click="onClickUrl(generationUrl)" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="mt-1">
        <div class="border rounded mt-5">
          <img class="mx-auto d-block" v-bind:src="dummyimageUrl" v-bind:style="{ wieght: state.weight }" :title="t('placeholder.placeholder_img')" />
        </div>
        <div class="border rounded mt-2 p-2">
          <q-input v-model="dummyimageUrl">
            <template #append>
              <q-btn icon="content_copy" @click="onClickUrl(dummyimageUrl)" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";
import { useQuasar } from 'quasar'

const { t } = useI18n({ useScope: "global" });
const $q = useQuasar()

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
  $q.notify({
    message:"复制成功",
    color:"green"
  });
}
</script>