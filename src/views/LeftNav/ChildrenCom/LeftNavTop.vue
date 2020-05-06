<template>
    <div id="LeftNavTop">
        <h3 class="LeftNavTop-title g-navHref">{{name}}</h3>
        <p class="LeftNavTop-smallTitle g-navHref">{{version}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:"正义de键盘侠",
            version:"v1.0.0"
        }
    }
}
</script>
<style >
#LeftNavTop{
    grid-area: LeftNavTop;
    border-bottom:1px solid rgba(0,0,0,0.1) ;
    padding: 10px;
    
}

</style>