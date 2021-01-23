<template>
  <div>
    <div class="row">
      <div class="col-12 mt-0 col-md-6 mt-md-0 form-floating">
        <input type="text" class="form-control" v-model="state.timestamp" placeholder="时间戳" />
        <label>时间戳</label>
      </div>
      <div class="col-12 mt-1 col-md-6 mt-md-0 form-floating">
        <input type="text" class="form-control" v-model="state.datetime" placeholder="时间" />
        <label>时间</label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";
import { getUnixTime, format, fromUnixTime } from "date-fns";

const state = reactive({
  timestamp: null,
  datetime: null,
});
watch(
  () => state.timestamp,
  (val) => {
    const date = fromUnixTime(Number(val));
    state.datetime = format(date, "uuuu-MM-dd HH:mm:ss");
  }
);
onMounted(() => {
  const date = new Date();
  state.timestamp = getUnixTime(date);
  state.datetime = format(date, "uuuu-MM-dd HH:mm:ss");
});
</script>
