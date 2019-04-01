<template>
    <transition name="fade">    
        <div class="page">
            <div class="ctx"></div>
        </div>
    </transition>
</template>

<script>
export default {

}
</script>

<style scoped>
.page{
    position: fixed;
    top: 0;
    bottom: 0;
    background-color:#8888;
    width: 200%;
    height: 100%;
    overflow: auto;
    left: 0;
}
.ctx{
    width: 30%;
    height: 100%;
    background: #ffff;
}
.fade-enter-active, .fade-leave-active {
  transition: all 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    background-color: rgba(8, 8, 8, 0);
    /* opacity: 0; */
    transform: translateX(-30%);
}
</style>
