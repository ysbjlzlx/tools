<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import { defineProps, reactive, onMounted, watch, onUpdated } from "vue";
const props = defineProps({
  showBorder: {
    type: Boolean,
    default: false,
  },
  showMargin: {
    type: Boolean,
    default: false,
  },
  showPadding: {
    type: Boolean,
    default: false,
  },
});
const style = reactive({});

onMounted(() => {
  if (props.showBorder) {
    style.border = "1px solid #ebebeb";
    style.borderRadius = "3px";
  }
  if (props.showMargin) {
    style.margin = " 10px 0";
  }
  if (props.showPadding) {
    style.padding = " 0 15px";
  }
});
</script>
