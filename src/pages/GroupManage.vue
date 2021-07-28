<template>
    <basic-page-templ active-key="grpmng" has-sidebar>
        <h1>管理的群</h1>
        <n-grid cols="4 xs:1 s:2 m:3" :x-gap="24" :y-gap="24" responsive="screen">
            <n-gi v-for="grp in groups">
                <n-card hoverable @click="goToDetail(grp.gid)">
                    <n-thing>
                        <template #avatar>
                            <n-avatar :src="grp.group_avatar" size="large" />
                        </template>
                        <template #header>{{ grp.group_name }}</template>
                        <template #description>{{ grp.gid }}</template>
                    </n-thing>
                </n-card>
            </n-gi>
        </n-grid>
    </basic-page-templ>
</template>

<script lang="ts" setup>
import { NCard, NGrid, NGi, NThing, NAvatar } from "naive-ui";
import { computed, ref, watch } from 'vue';
import { getGroupServiceState, getServicConfig, getServiceList, setServicState } from "../api/sv";
import { getUserGroups } from "../api/user";
import BasicPageTempl from '../components/BasicPageTempl.vue';
import TheServiceStatusOfGroup from "../components/TheServiceStatusOfGroup.vue";
import TheServiceConfigOfGroup from "../components/TheServiceConfigOfGroup.vue";
import { useRouter } from "vue-router";

const router = useRouter()

/**
 * 群组选择
 */
const groups = ref([] as any[])
const fetchGroups = () => {
    getUserGroups().then(data => {
        groups.value = data
    })
}
fetchGroups()

const goToDetail = (gid: number) => {
    router.push({ name: 'ServiceDetailOfGroup', params: { gid: gid } })
}

// 切换服务状态
const changeState = (gid: number, svname: string, enable: boolean) => {
    setServicState(svname, gid, enable)
}




</script>