<template>
    <n-data-table :columns="columns" :data="svData" :single-line="false" />
</template>


<script lang="ts" setup>
import { NList, NListItem, NMenu, NSpin, NSwitch, NThing, NDataTable } from "naive-ui";
import { h, ref, toRefs, watch } from 'vue';
import type { PropType } from 'vue';
import { setServicState } from "../api/sv";
import type { GroupServiceDetail } from "../api/sv";

const props = defineProps({
    gid: {
        type: Number,
        required: true,
    },
    svData: {
        type: Object as PropType<GroupServiceDetail['sv']>,
        required: true,
    }
})
const { gid } = toRefs(props)

/**
 * 表格
 */
const columns = [
    {
        title: '服务名称',
        key: 'svname',
        render: (row: any) => row.svname + (row.enabled_globally ? '' : ' (已被全局禁用)'),
    },
    {
        title: '描述',
        key: 'description',
    },
    {
        title: '开关',
        key: 'enable',
        render: (row: any) => h(
            NSwitch,
            {
                value: row.enabled,
                onUpdateValue: (v) => changeState(row.svname, v).then(() => row.enabled = v)
            },
            {}
        )
    }

]


/**
 * 开关控制
 */
const changeState = (svname: string, enable: boolean) => {
    return setServicState(svname, gid.value, enable)
}

</script>