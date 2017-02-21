<template>
<div class="toast fadeInDown animated">
    {{msg}}
</div>
</template>
<script>
    export default {
        data() {
            return {
                msg: this.$parent.toast
            }
        }
    }
</script>
<style>
	.toast {
        padding: 1rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 1.5rem;
        background-color: #333;
        color: #fff;
        opacity: .8;
        z-index: 10000001;
        text-align: center;
    }
</style>