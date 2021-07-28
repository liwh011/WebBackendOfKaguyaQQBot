<template>
    <basic-page-templ active-key="svmng" has-sidebar>
        <h1>服务列表</h1>
        <p>点击服务可以进入到详细的设置页</p>
        <the-service-global-state />
    </basic-page-templ>
</template>

<script lang="ts" setup>
import BasicPageTempl from '../components/BasicPageTempl.vue'
import TheServiceGlobalState from '../components/TheServiceGlobalState.vue';


</script>