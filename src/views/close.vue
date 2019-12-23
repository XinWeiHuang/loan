<template>
    <div class="wrapper">
        <span>{{ $store.state.closeTips }}</span>
    </div>
</template>

<script>
    export default {
        name: "close.vue"
    }
</script>

<style scoped lang="less">
    .wrapper {
        height: 100%;
        width: 100%;
        position: relative;
        span {
            display: inline-block;
            width: 100%;
            text-align: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;
        }
    }
</style>
