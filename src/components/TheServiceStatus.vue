<template>
    <n-spin :show="loading">
        <n-list bordered>
            <n-list-item v-for="group in svState">
                <template #suffix>
                    <n-switch
                        v-model:value="group.model"
                        @update:value="changeState(group.group_id, group.model)"
                    />
                </template>
                <n-thing :title="group.group_name" :description="group.group_id.toString()" />
            </n-list-item>
        </n-list>
    </n-spin>
</template>

<script lang="ts" setup>
import { NList, NListItem, NSwitch, NThing, NSpin } from "naive-ui";
import { computed, ref, toRefs, watch } from "vue";
import { getServiceState, setServicState } from "../api/sv";

const props = defineProps({
    svname: {
        type: String,
        required: true
    }
})


/**
 * 数据获取
 */
const loading = ref(false)
const svState = ref([] as any[])
const fetchData = () => {
    loading.value = true;
    getServiceState(props.svname).then((data) => {
        svState.value = Array.from(data, (v) => { return { ...v, model: ref(v.enabled) } })
        loading.value = false;
    })
}
fetchData()

const { svname } = toRefs(props)
watch(svname, fetchData)


/**
 * 开关控制
 */
const changeState = (gid: number, enable: boolean) => {
    setServicState(svname.value, gid, enable)
}

</script>