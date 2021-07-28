<template>
    <div
        style="height: 80vh; display: flex; align-items: center; justify-content: center; flex-direction: column;"
    >
        <n-result status="403" title="401 验证失败" description="服务器不知道你是谁" size="huge">
            <template #footer>
                <p>私聊Bot发送“登录后台”获取登录链接</p>
                <n-button size="medium" type="primary" @click="goToHome">返回</n-button>
            </template>
        </n-result>
    </div>
</template>

<script lang="ts" setup>
import { NEmpty, NButton, NSpace, NResult } from 'naive-ui'
import { useRouter } from 'vue-router';
import BasicPageTempl from '../components/BasicPageTempl.vue';
const router = useRouter()
const goToHome = () => {
    router.replace({ name: 'Home' })
}

</script>