<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col">
        <q-input outlined v-model="state.issuer" label="Issuer" />
      </div>
      <div class="col">
        <q-input outlined v-model="state.account" label="Account" placeholder="Account name" />
      </div>
      <div class="col">
        <q-input outlined v-model="state.secret" label="Secret key" placeholder="Secret key" :maxlength="32" counter>
          <template v-slot:append>
            <q-btn icon="refresh" @click="refreshSecret()" size="sm" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-col-gutter-xs q-mt-md">
      <div class="col">
        <q-select outlined v-model="state.type" :options="typeOptions" disable />
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <div class="row q-col-gutter-xs q-mt-md">
      <div class="col">
        <q-input outlined v-model="state.url" label="Url">
          <template v-slot:append>
            <q-btn icon="content_copy" @click="setClipboard(state.url)" size="sm" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-col-gutter-xs q-mt-md">
      <div class="col">
        <div id="qrcode" style="width: 300px; height: 300px"></div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { reactive, onMounted, watch } from "vue";
import QRCode from "easyqrcodejs";
import { TOTP, Secret } from "otpauth";
import * as clipboard from "clipboard-polyfill/text";
import { useQuasar } from "quasar";

const $q = useQuasar();
const state = reactive({
  totp: null,
  url: null,
  type: "totp",
  issuer: null,
  account: null,
  secret: null,
  algorithm: null,
  digits: null,
  counter: null,
  period: null,
  QRCode: null,
});
const typeOptions = [
  { value: "totp", label: "TOTP" },
  { value: "hotp", label: "HOTP" },
];
const algorithmOptions = [
  { value: "SHA1", label: "SHA1" },
  { value: "SHA256", label: "SHA256" },
  { value: "SHA512", label: "SHA512" },
];
const digitsOptions = [
  { value: 6, label: "6" },
  { value: 8, label: "8" },
];
const periodOptions = [
  { value: 30, label: "30" },
  { value: 60, label: "60" },
];

onMounted(() => {
  state.issuer = "Issuer";
  state.account = "Account";
  refreshSecret();
});
const refreshSecret = () => {
  let secret = new Secret();
  state.secret = secret.base32;
};

watch([() => state.issuer, () => state.account, () => state.secret], ([issuer, account, secret]) => {
  state.totp = new TOTP({
    issuer: issuer,
    label: account,
    secret: secret,
  });
  state.url = state.totp.toString();
  if (state.QRCode != null) {
    state.QRCode.clear();
  }
  state.QRCode = new QRCode(document.getElementById("qrcode"), {
    text: state.url,
    width: 300,
    height: 300,
  });
});

function setClipboard(e) {
  clipboard.writeText(e);
  $q.notify({
    message: "复制成功",
    color: "green",
  });
}
</script>
