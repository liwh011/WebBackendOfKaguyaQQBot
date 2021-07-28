<template>
    <basic-page-templ active-key="usrmng">
        <n-spin :show="loading">
            <n-data-table :columns="columns" :data="userList" :row-key="(row) => row.uid" />
        </n-spin>
    </basic-page-templ>
</template>

<script setup lang="ts">
import BasicPageTempl from "../components/BasicPageTempl.vue";

import { NSpin, NDataTable, NSelect, NButton, NSpace } from "naive-ui";
import { computed, h, ref, toRefs, watch } from "vue";
import { getUserList, setUserRole } from "../api/user";

/**
 * 表格
 */
const roleLevels = [
    { label: 'BOT所有者', value: 99, },
    { label: 'BOT管理', value: 90, },
    { label: '群主', value: 20, },
    { label: '群管理', value: 10, },
    { label: '普通用户', value: 0, },
]
const columns = [
    {
        title: 'QQID',
        key: 'uid'
    },
    {
        title: '权限等级',
        key: 'role',
        render(row) {
            if (row.editMode) {
                return h(
                    NSelect,
                    {
                        size: 'small',
                        options: roleLevels,
                        value: row.model,
                        'onUpdate:value': value => row.model = value,
                        style: 'width: 200px;'
                    },
                )
            }
            else
                return roleLevels.filter((v) => v.value === row.role)[0]?.label || row.role
        }
    },
    {
        title: '操作',
        key: 'action',
        width: '200px',
        render(row) {
            if (row.editMode === true) {
                return h(
                    NSpace,
                    {},
                    {
                        default: () => [
                            h(
                                NButton,
                                {
                                    size: 'small',
                                    onClick: () => {
                                        row.editMode = false
                                        row.model = row.role
                                    }
                                },
                                { default: () => '取消' }
                            ),
                            h(
                                NButton,
                                {
                                    size: 'small',
                                    onClick: () => {
                                        if (row.model === row.role) {
                                            row.editMode = false
                                            return
                                        }
                                        setUserRole(row.uid, row.model).then(() => {
                                            row.role = row.model
                                            row.editMode = false
                                        })
                                    }
                                },
                                { default: () => '保存' }
                            ),

                        ]
                    }
                )
            } else {
                return h(
                    NButton,
                    {
                        size: 'small',
                        onClick: () => {
                            row.editMode = true
                        }
                    },
                    { default: () => '编辑' }
                )

            }
        }
    }
]



/**
 * 数据获取
 */
const loading = ref(false)
const userList = ref([] as any[])
const fetchData = () => {
    loading.value = true;
    getUserList().then((data) => {
        userList.value = Array.from(data, (v) => { return { ...v, model: v.role, editMode: false } })
        loading.value = false;
    })
}
fetchData()


</script>