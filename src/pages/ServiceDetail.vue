<template>
    <basic-page-templ v-if="detailData" active-key="svmng">
        <template #header>
            <n-page-header @back="handleBack" style="padding: 24px;">
                <template #title>{{ svname }}</template>
                <template #header>
                    <n-breadcrumb>
                        <n-breadcrumb-item>服务管理</n-breadcrumb-item>
                        <n-breadcrumb-item>{{ svname }}</n-breadcrumb-item>
                    </n-breadcrumb>
                </template>
                <template #extra>
                    <span style="margin-right: 8px;">全局开关</span>
                    <n-switch v-model:value="detailData.enabled" />
                </template>
                <n-grid cols="4 xs:2 s:2" :y-gap="24" responsive="screen" style="text-align: center;">
                    <n-gi>
                        <n-statistic label="开启群数" :value="enabledGroupCount">
                            <template #suffix>/ {{ groupCount }}</template>
                        </n-statistic>
                    </n-gi>
                    <n-gi>
                        <n-statistic label="使用权限" :value="detailData.use_priv" />
                    </n-gi>
                    <n-gi>
                        <n-statistic label="管理权限" :value="detailData.mng_priv" />
                    </n-gi>
                    <n-gi>
                        <n-statistic label="列表可见性" :value="detailData.visiable ? '可见' : '隐藏'" />
                    </n-gi>
                </n-grid>
            </n-page-header>
        </template>

        <h2>各群启用情况</h2>
        <the-service-status :svname="svname" v-if="svname" />

        <!-- <n-divider /> -->
        <h2>配置项</h2>
        <the-service-config :svname="svname" />
    </basic-page-templ>
</template>

<script lang="ts" setup>
import BasicPageTempl from '../components/BasicPageTempl.vue'
import { computed, ref } from 'vue';
import { NMenu, NSwitch, NPageHeader, NBreadcrumb, NBreadcrumbItem, NStatistic, NGrid, NGi } from "naive-ui";
import TheServiceStatus from '../components/TheServiceStatus.vue';
import TheServiceConfig from '../components/TheServiceConfig.vue';
import TheServiceGlobalState from '../components/TheServiceGlobalState.vue';
import { useRoute, useRouter } from 'vue-router';
import * as svApi from '../api/sv';
import { getServiceDetail } from '../api/sv';

const router = useRouter()
const route = useRoute()
const svname = route.params.svname.toString()


let detailData = ref(null as svApi.ServiceDetail | null)
getServiceDetail(svname).then((data) => {
    detailData.value = data
})
const groupCount = computed(() => detailData.value?.group_states.length)
const enabledGroupCount = computed(() => detailData.value?.group_states.filter(v => v.enabled).length)



const handleBack = () => {
    router.go(-1)
}
</script>