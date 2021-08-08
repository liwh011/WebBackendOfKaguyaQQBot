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
import type { TableColumn, TableColumns } from "naive-ui/lib/data-table/src/interface";
import { computed, h, ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { getAllServiceDetail, getAllServiceGlobalState, getServiceDetail, getServiceState, setServiceGlobalState } from "../api/sv";


const columns: TableColumns<any> = [
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
        width: 130,
        align: 'center',
        render: (row) => h(NCheckbox, {
            disabled: false, checked: row.visiable,
            onClick: (event: any) => event.stopPropagation()
        }, {}),
        // @ts-ignore
        filter: (value: boolean, row: any) => {
            return row.visiable === value
        },
        filterOptions: [
            {
                label: '显示',
                // @ts-ignore
                value: true
            },
            {
                label: '隐藏',
                // @ts-ignore
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
        width: 120,
        align: 'center',
        render: (row) => h(
            NSwitch,
            {
                value: row.enabled,
                onUpdateValue: (v) => changeState(row.svname, v).then(() => row.enabled = v),
                onClick: (event: any) => event.stopPropagation()
            },
            {}
        ),
        // @ts-ignore
        filter: (value: boolean, row: any) => {
            return row.enabled === value
        },
        filterOptions: [
            {
                label: '已开启',
                // @ts-ignore
                value: true
            },
            {
                label: '已禁用',
                // @ts-ignore
                value: false
            }
        ],
    }
]
const router = useRouter()
const rowProps = (row: any) => {
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

