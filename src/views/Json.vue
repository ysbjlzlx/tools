<template>
    <div>
        <div ref="jsoneditor" id="jsoneditor" style="width: 100%; height: 800px"></div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

const state = reactive({ plain: null });
const jsoneditor = ref(null);
onMounted(() => {
    // console.log(jsoneditor);
    // create the editor
    const container = document.getElementById("jsoneditor");
    const options = {
        language: "zh-CN",
        mode: "code",
    };
    const editor = new JSONEditor(jsoneditor.value, options);

    // set json
    const initialJson = {
        Array: [1, 2, 3],
        Boolean: true,
        Null: null,
        Number: 123,
        Object: { a: "b", c: "d" },
        String: "Hello World",
    };
    editor.set(initialJson);
});
</script>