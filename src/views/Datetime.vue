<template>
  <div>
    <div class="row mt-2">
      <div class="col-12 mt-0 col-md-6 mt-md-0 form-floating">
        <input type="text" class="form-control" v-model="state.timestamp" placeholder="时间戳" />
        <label>时间戳</label>
      </div>
      <div class="col-12 mt-1 col-md-6 mt-md-0 form-floating">
        <input type="text" class="form-control" v-bind:value="getDatetime()" placeholder="日期时间" />
        <label>日期时间</label>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 mt-1 col-md-6 mt-md-0 form-floating">
        <input type="text" class="form-control" v-model="state.datetime" placeholder="日期时间" />
        <label>日期时间</label>
      </div>
      <div class="col-12 mt-0 col-md-6 mt-md-0 form-floating">
        <input type="text" class="form-control" v-bind:value="getTimestamp()" placeholder="时间戳" />
        <label>时间戳</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { getUnixTime, format, fromUnixTime, parse } from "date-fns";

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
