<template>
    <basic-page-templ active-key="grpmng">
        <template #header>
            <n-page-header @back="handleBack" style="padding: 24px;">
                <template #title>{{ groupData.group_name }}</template>
                <template #header>
                    <n-breadcrumb>
                        <n-breadcrumb-item>群组管理</n-breadcrumb-item>
                        <n-breadcrumb-item>{{ groupData.group_name }} ({{ groupData.gid }})</n-breadcrumb-item>
                    </n-breadcrumb>
                </template>
                <!-- <template #subtitle>{{ groupData.gid }}</template> -->
            </n-page-header>
        </template>
        <the-service-status-of-group :gid="gid" :sv-data="groupData.sv" />
    </basic-page-templ>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NBreadcrumb, NBreadcrumbItem, NPageHeader } from "naive-ui";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getGroupServiceState } from "../api/sv";
import type { GroupServiceDetail } from "../api/sv";
import BasicPageTempl from "./BasicPageTempl.vue";
import TheServiceStatusOfGroup from "../components/TheServiceStatusOfGroup.vue";


const route = useRoute()
const router = useRouter()
const gid = Number(route.params.gid)

const handleBack = () => {
    router.go(-1)
}

const groupData = ref({} as GroupServiceDetail)
getGroupServiceState(gid).then(data => {
    groupData.value = data
})

</script>