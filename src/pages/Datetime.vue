<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col">
        <label>{{ t("datetime.timestamp") }}</label>
        <q-input outlined v-model="state.timestamp" :placeholder="t('datetime.timestamp')" />
      </div>
      <div class="col">
        <label>{{ t("datetime.datetime") }}</label>
        <q-input outlined v-model="getDatetime" :placeholder="t('datetime.datetime')" />
      </div>
    </div>
    <div class="row q-col-gutter-xs">
      <div class="col">
        <label>{{ t("datetime.datetime") }}</label>
        <q-input outlined v-model="state.datetime" :placeholder="t('datetime.datetime')" />
      </div>
      <div class="col">
        <label>{{ t("datetime.timestamp") }}</label>
        <q-input outlined v-model="getTimestamp" :placeholder="t('datetime.timestamp')" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { onMounted, reactive, computed } from "vue";
import { getUnixTime, format, fromUnixTime, parse } from "date-fns";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  timestamp: null,
  datetime: null,
});
onMounted(() => {
  const date = new Date();
  state.timestamp = getUnixTime(date);
  state.datetime = format(date, "uuuu-MM-dd HH:mm:ss");
});
const getDatetime = computed(() => {
  const date = fromUnixTime(Number(state.timestamp));
  return format(date, "uuuu-MM-dd HH:mm:ss");
});
const getTimestamp = computed(() => {
  const date = parse(state.datetime, "uuuu-MM-dd HH:mm:ss", new Date());
  return getUnixTime(date);
});
</script>
