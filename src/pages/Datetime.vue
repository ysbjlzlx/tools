<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="state.timestamp" :label="t('datetime.unixTime')" />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="getDatetime" :label="t('datetime.datetime')" />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="state.millisecond" :label="t('datetime.millisecondTime')" />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="fromMillisecondToDatetimeStr" :label="t('datetime.datetime')" />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="state.datetime" :label="t('datetime.datetime')" />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="getTimestamp" :label="t('datetime.unixTime')" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { onMounted, reactive, computed } from "vue";
import { getUnixTime, getTime, format, fromUnixTime, parse } from "date-fns";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  timestamp: null,
  datetime: null,
  millisecond: null,
});
onMounted(() => {
  const date = new Date();
  state.timestamp = getUnixTime(date);
  state.millisecond = getTime(date);
  state.datetime = format(date, "uuuu-MM-dd HH:mm:ss");
});
const getDatetime = computed(() => {
  const date = fromUnixTime(Number(state.timestamp));
  return format(date, "uuuu-MM-dd HH:mm:ss");
});
const fromMillisecondToDatetimeStr = computed(() => {
  const date = new Date(Number(state.millisecond));
  return format(date, "uuuu-MM-dd HH:mm:ss.SSS");
});
const getTimestamp = computed(() => {
  const date = parse(state.datetime, "uuuu-MM-dd HH:mm:ss", new Date());
  return getUnixTime(date);
});
</script>
