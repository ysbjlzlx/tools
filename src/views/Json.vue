<template>
    <div>
        <div id="jsoneditor" style="width: 400px; height: 400px"></div>
    </div>
</template>
<script setup>
import JSONEditor from "jsoneditor";

console.log(JSONEditor);
// create the editor
const container = document.getElementById("jsoneditor");
const options = {};
const editor = new JSONEditor(container, options);

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
</script>