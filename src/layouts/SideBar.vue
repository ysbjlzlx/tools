<template>
  <div>
    <q-list>
      <q-item :to="{ path: '/' }" exact>
        <q-item-section avatar>
          <q-avatar size="32px">
            <img src="../assets/logo-32x32.png" width="32px" height="32px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Tools</q-item-section>
      </q-item>
      <q-separator />
      <q-item :to="{ path: '/json' }">
        <q-item-section>{{ t("nav.json") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/transform/json2yaml' }">
        <q-item-section>JSON2YAML</q-item-section>
      </q-item>
      <q-item :to="{ path: '/datetime' }">
        <q-item-section>{{ t("nav.timestamp") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/encode/base64' }">
        <q-item-section>{{ t("nav.base64") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/encode/urlencode' }">
        <q-item-section>{{ t("nav.urlencode") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/hash' }">
        <q-item-section>{{ t("nav.hash") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/string/random' }">
        <q-item-section>随机字符串</q-item-section>
      </q-item>
      <q-separator />
      <q-item :to="{ path: '/color' }">
        <q-item-section>{{ t("nav.color") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/image/placeholder' }">
        {{ t("nav.placeholder") }}
      </q-item>
      <q-item :to="{ path: '/image/qrcode' }">
        <q-item-section>二维码</q-item-section>
      </q-item>
      <q-separator />
      <q-expansion-item expand-separator :label="t('nav.development')">
        <q-item :to="{ path: '/password/otp' }">
          <q-item-section>OTP</q-item-section>
        </q-item>
        <q-item :to="{ path: '/ffmpeg' }">
          <q-item-section avatar>
            <q-avatar rounded size="20px" color="green">
              <img src="../assets/icon_ffmpeg.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>FFmpeg</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-item>
        <q-select v-model="locale" :options="langOptions" dense borderless emit-value map-options options-dense />
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const langOptions = [
  { value: "zh-Hans-CN", label: "简体中文" },
  { value: "en", label: "English" },
];
</script>
