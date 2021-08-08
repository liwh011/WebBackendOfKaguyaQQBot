<template>
    <n-layout has-sider position="absolute" style="top: 0; bottom: 0;">
        <n-layout-sider
            content-style="padding: 4px"
            bordered
            :native-scrollbar="false"
        >
            <n-menu
                :value="activeKey"
                @update:value="handleMenuChange"
                :options="menuOptions"
            />
        </n-layout-sider>
        <n-layout style="height: 100vh;">
            <n-layout-header bordered>
                <!-- <slot name="sidebar"></slot> -->
                <slot name="header"></slot>
                <!-- <n-menu
                    v-model:value="activeKey"
                    @update:value="handleMenuChange"
                    mode="horizontal"
                    :options="menuOptions"
                /> -->
            </n-layout-header>
            <n-layout-content content-style="padding: 24px" >
                <slot />
                <div style="height: 32px;"></div>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script lang="ts"   setup>
// @ts-nocheck

import { NLayout, NLayoutSider, NLayoutContent, NLayoutFooter, NLayoutHeader, NMenu, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
// @ts-ignore
window.$message = useMessage()


const props = defineProps({
    activeKey: {
        type: String,
        default: '',
    },
    hasSidebar: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()

const menuOptions = [
    {
        label: '群组管理',
        key: 'grpmng',
    },
    {
        label: '服务管理',
        key: 'svmng',
    },
    {
        label: '用户管理',
        key: 'usrmng',
    },
]


const handleMenuChange = (key: any) => {
    if (key === 'grpmng')
        router.push({ name: 'GroupManage' })
    else if (key === 'svmng')
        router.push({ name: 'ServiceManage' })
    else if (key === 'usrmng')
        router.push({ name: 'UserManage' })
}
</script>