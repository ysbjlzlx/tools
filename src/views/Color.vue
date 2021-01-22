<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-4 mt-0 mt-md-0 form-floating">
                <input type="text" class="form-control" id="plain_rgb" v-model="state.plain_rgb" placeholder="RGB" x-on:change="parseRgb(plain_rgb)" />
                <label for="plain_rgb">RGB</label>
            </div>
            <div class="col-12 col-md-4 mt-1 mt-md-0 form-floating">
                <input type="text" class="form-control" id="plain_rgba" v-model="state.plain_rgba" placeholder="RGBA" x-on:change="parseRgb(plain_rgba)" />
                <label for="plain_rgba">RGBA</label>
            </div>
            <div class="col-12 col-md-4 mt-1 mt-md-0 form-floating">
                <input type="text" class="form-control" id="plain_hex" v-model="state.plain_hex" placeholder="HEX" x-on:change="parseHex(plain_hex)" />
                <label for="plain_hex">HEX</label>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-12 col-md-3 mt-0 mt-md-0">
                <label class="form-label" for="rgb_red">红</label>
                <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_red" />
                <input type="number" class="form-control" id="rgb_red" v-model="state.rgb_red" min="0" max="255" />
                <div class="form-text">0 到 255 间的整数，代表颜色中的红色成分</div>
            </div>
            <div class="col-12 col-md-3 mt-1 mt-md-0">
                <label class="form-label" for="rgb_green">绿</label>
                <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_green" />
                <input type="number" class="form-control" id="rgb_green" v-model="state.rgb_green" min="0" max="255" />
                <div class="form-text">0 到 255 间的整数，代表颜色中的绿色成分</div>
            </div>
            <div class="col-12 col-md-3 mt-1 mt-md-0">
                <label class="form-label" for="rgb_blue">蓝</label>
                <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_blue" />
                <input type="number" class="form-control" id="rgb_blue" v-model="state.rgb_blue" min="0" max="255" />
                <div class="form-text">0 到 255 间的整数，代表颜色中的蓝色成分</div>
            </div>
            <div class="col-12 col-md-3 mt-1 mt-md-0">
                <label class="form-label" for="rgb_alpha">透明度</label>
                <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_alpha" />
                <input type="number" class="form-control" id="rgb_alpha" v-model="state.rgb_alpha" min="0" max="255" />
                <div class="form-text">取值 0~255 之间， 代表透明度，定义透明度 0（完全透明） ~ 255（完全不透明）</div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-12 col-md-3 mt-0 mt-md-0 form-floating" v-on:click="setClipboard($event)">
                <input type="text" class="form-control" v-bind:value="getRgb()" placeholder="RGB" disabled />
                <label>RGB</label>
            </div>
            <div class="col-12 col-md-3 mt-1 mt-md-0 form-floating" v-on:click="setClipboard($event)">
                <input type="text" class="form-control" v-bind:value="getRgba()" placeholder="RGBA" disabled />
                <label>RGBA</label>
            </div>
            <div class="col-12 col-md-3 mt-1 mt-md-0 form-floating" v-on:click="setClipboard($event)">
                <input type="text" id="rgb_hex" class="form-control" v-bind:value="getHex()" placeholder="HEX" disabled />
                <label>HEX</label>
            </div>
            <div class="col-12 col-md-3 mt-1 mt-md-0 form-floating" v-on:click="setClipboard($event)">
                <input type="text" id="rgb_rgba" class="form-control" v-bind:value="getHexWithAlpha()" placeholder="HEX With Alpha" disabled />
                <label>HEX With Alpha</label>
            </div>
        </div>
        <div class="mt-5">
            <div style="height: 200px" :style="{ backgroundColor: getRgba() }"></div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
    msg: String,
});

const state = reactive({
    plain_rgb: null,
    plain_rgba: null,
    plain_hex: null,
    rgb_red: 0,
    rgb_green: 0,
    rgb_blue: 0,
    rgb_alpha: 255,
});

function getData() {
    return {
        rgb_hex: null,
        rgb_rgba: null,
    };
}
function parseRgb(rgbStr) {
    const rgbArr = rgbStr.match(/\d+/g);
    this.rgb_red = rgbArr[0];
    this.rgb_green = rgbArr[1];
    this.rgb_blue = rgbArr[2];
}
function parseHex(hexStr) {
    const hexArr = hexStr.match(/[\d\w]{2}/g);
    this.rgb_red = rgb(hexArr[0]);
    this.rgb_green = rgb(hexArr[1]);
    this.rgb_blue = rgb(hexArr[2]);
}
function getRgb() {
    const rgbStr = "rgb(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ")";
    return rgbStr;
}
function getRgba() {
    let alpha = Number(state.rgb_alpha / 255).toFixed(2);
    alpha = ".00" === alpha.slice(-3) ? parseInt(alpha) : alpha;
    const rgbaStr = "rgba(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ", " + alpha + ")";
    return rgbaStr;
}
function getHex() {
    return "#" + hex(state.rgb_red) + hex(state.rgb_green) + hex(state.rgb_blue);
}
function getHexWithAlpha() {
    return "#" + hex(state.rgb_red) + hex(state.rgb_green) + hex(state.rgb_blue) + hex(state.rgb_alpha);
}
function setClipboard(e) {
    clipboard.writeText(e.target.value);
}
function hex(val) {
    return ("0" + parseInt(val).toString(16)).slice(-2);
}
function rgb(val) {
    return parseInt(val, 16);
}
</script>