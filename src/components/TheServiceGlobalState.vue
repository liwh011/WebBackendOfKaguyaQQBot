<template>
        <n-data-table
            :columns="columns"
            :data="svStates"
            :row-props="rowProps"
            :row-key="(row) => row.svname"
            :loading="loading"
            style="min-width: 700px;"
        />
</template>

<script lang="ts" setup>
import { NList, NListItem, NSwitch, NThing, NSpin, NGrid, NGi, NDataTable, NCheckbox } from "naive-ui";
import { computed, h, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { getAllServiceDetail, getAllServiceGlobalState, getServiceDetail, getServiceState, setServiceGlobalState } from "../api/sv";


const columns = [
    {
        title: '服务名称',
        key: 'svname',
        // render: (row) => row.svname + (row.enabled_globally ? '' : ' (已被全局禁用)'),
        sorter: 'default',
    },
    {
        title: '描述',
        key: 'description',
    },
    {
        title: '列表可见性',
        key: 'visiable',
        width: '130px',
        align: 'center',
        render: (row) => h(NCheckbox, {
            disabled: false, checked: row.visiable,
            onClick: (event) => event.stopPropagation()
        }, {}),
        filter: (value: boolean, row) => {
            return row.visiable === value
        },
        filterOptions: [
            {
                label: '显示',
                value: true
            },
            {
                label: '隐藏',
                value: false
            }
        ],
    },
    {
        title: '使用权限',
        key: 'use_priv',
    },
    {
        title: '管理权限',
        key: 'mng_priv',
    },
    {
        title: '全局开关',
        key: 'enable',
        width: '120px',
        align: 'center',
        render: (row) => h(
            NSwitch,
            {
                value: row.enabled,
                onUpdateValue: (v) => changeState(row.svname, v).then(() => row.enabled = v),
                onClick: (event) => event.stopPropagation()
            },
            {}
        ),
        filter: (value: boolean, row) => {
            return row.enabled === value
        },
        filterOptions: [
            {
                label: '已开启',
                value: true
            },
            {
                label: '已禁用',
                value: false
            }
        ],
    }
]
const router = useRouter()
const rowProps = (row) => {
    return {
        style: 'cursor: pointer;',
        onClick: () => {
            router.push({ name: 'ServiceDetail', params: { svname: row.svname } })
        }
    }
}



/**
 * 数据获取
 */
const loading = ref(false)
const svStates = ref([] as any[])

const fetchData = () => {
    loading.value = true;
    getAllServiceDetail().then(data => {
        svStates.value = data
        loading.value = false;
    })
}
fetchData()




/**
 * 开关控制
 */
const changeState = (svname: string, enable: boolean) => {
    return setServiceGlobalState(svname, enable)
}

</script>

