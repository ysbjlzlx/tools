<template>
  <div class="toast-container position-absolute p-3 top-0 end-0">
    <div ref="toast" class="toast">
      <div class="toast-header">
        <strong class="me-auto" v-text="title"></strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body" v-text="content"></div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, onMounted, reactive, ref, watch } from "vue";
const state = reactive({
  dd: null,
});

const props = defineProps({
  title: String,
  content: String,
  show: Boolean,
});

const toast = ref(null);

onMounted(() => {
  state.dd = new bootstrap.Toast(toast.value);
});
watch([() => props.title, () => props.content, () => props.show], (val) => {
  console.log(val);
  if (true === val[2]) {
    state.dd.show();
  }
});
</script>