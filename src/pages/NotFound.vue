<template>
    <basic-page-templ>
        <div
            style="height: 80vh; display: flex; align-items: center; justify-content: center; flex-direction: column;"
        >
            <n-result status="404" title="404 资源不存在" description="可能你权限不够大，也可能真的没有东西" size="huge">
                <template #footer>
                    <n-button size="medium" type="primary" @click="goToHome">拍拍屁股回去</n-button>
                </template>
            </n-result>
        </div>
    </basic-page-templ>
</template>

<script lang="ts" setup>
import { NEmpty, NButton, NResult } from 'naive-ui'
import { useRouter } from 'vue-router';
import BasicPageTempl from '../components/BasicPageTempl.vue';
const router = useRouter()
const goToHome = () => {
    router.replace({ name: 'Home' })
}

</script>