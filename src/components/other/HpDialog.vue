<template>
    <div id="HpDialog">
        <div class="Dialog_wrapper">
            <span class="Dialog_title"></span>
            <div class="Dialog_content"></div>
            <div class="Dialog_flooter">
                <button>确认</button>
                <button>取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        msg:{
            title:'123'
        }
    }
}
</script>
<style lang="less" scoped>

</style>