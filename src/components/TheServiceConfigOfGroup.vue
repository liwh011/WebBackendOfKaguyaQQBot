<template>
    <n-form :label-width="80" :model="cfgFormModel" ref="formRef">
        <n-form-item :label="varName" v-for="(varVal, varName) in cfgFormModel" key="group">
            <n-input-number
                v-model:value="cfgFormModel[varName]"
                placeholder="输入数字"
                :step="0.1"
                :show-button="false"
                v-if="(typeof varVal) === 'number'"
            />
            <n-input v-model:value="cfgFormModel[varName]" placeholder="输入字符串" v-else />
        </n-form-item>
        <n-form-item>
            <n-button @click="handleSave" attr-type="button">保存</n-button>
        </n-form-item>
    </n-form>
</template>

<script lang="ts" setup>
import { toRaw, toRefs } from "@vue/reactivity";
import { NCode, NGrid, NGridItem, NGi, NCard, NForm, NFormItem, NInputNumber, NInput, NButton, NEmpty } from "naive-ui";
import { computed, ref, watch } from "vue";
import { getServicConfig } from "../api/sv";

const props = defineProps({
    svname: {
        type: String,
        required: true,
    },
    gid: {
        type: Number,
        required: true,
    }
})
const { svname, gid } = toRefs(props)


/**
 * 配置表单
 */
let cfgFormModel = ref({} as any)
const handleSave = () => {

}
const _setFormModel = (data: any) => {
    cfgFormModel.value = { ...data }
}



/**
 * 数据获取
 */
const loading = ref(false)
const configObj = ref({} as object)
const fetchData = () => {
    loading.value = true;
    getServicConfig(svname.value, gid.value).then(data => {
        configObj.value = data
        _setFormModel(data)
        loading.value = false;
    })
}
fetchData()
watch(svname, fetchData)



</script>