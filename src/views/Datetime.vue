<template>
  <el-row>
    <el-col :span="12">
      <label>{{ t("datetime.timestamp") }}</label>
      <el-input v-model="state.timestamp" :placeholder="t('datetime.timestamp')" />
    </el-col>
    <el-col :span="12">
      <label>{{ t("datetime.datetime") }}</label>
      <el-input v-bind:value="getDatetime()" :placeholder="t('datetime.datetime')" />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <label>{{ t("datetime.datetime") }}</label>
      <el-input v-model="state.datetime" :placeholder="t('datetime.datetime')" />
    </el-col>
    <el-col :span="12">
      <label>{{ t("datetime.timestamp") }}</label>
      <el-input v-bind:value="getTimestamp()" :placeholder="t('datetime.timestamp')" />
    </el-col>
  </el-row>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { getUnixTime, format, fromUnixTime, parse } from "date-fns";
import { useI18n } from "vue-i18n";
import { ElRow, ElCol, ElInput, ElSpace } from "element-plus";

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
function getDatetime() {
  const date = fromUnixTime(Number(state.timestamp));
  return format(date, "uuuu-MM-dd HH:mm:ss");
}
function getTimestamp() {
  const date = parse(state.datetime, "uuuu-MM-dd HH:mm:ss", new Date());
  return getUnixTime(date);
}
</script>
