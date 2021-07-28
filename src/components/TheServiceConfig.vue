<template>
    <n-grid x-gap="32" cols="3 xs:1 s:1 m:1 " responsive="screen" v-if="jsonString !== '{}'">
        <n-gi>
            <n-card style="height: 100%; background-color: rgb(244, 244, 248);">
                <n-code :code="jsonString" />
            </n-card>
        </n-gi>
        <n-gi :span="2">
            <n-form :label-width="80" :model="cfgFormModel" ref="formRef">
                <template v-for="(cfgVarModel, cfgVar) in cfgFormModel" key="cfgVar">
                    <h4>{{ cfgVar }}</h4>
                    <n-form-item
                        :label="group"
                        v-for="(groupModel, group) in cfgVarModel"
                        key="group"
                    >
                        <n-input-number
                            v-model:value="cfgFormModel[cfgVar][group]"
                            placeholder="输入数字"
                            :step="0.1"
                            :show-button="false"
                            v-if="(typeof cfgFormModel[cfgVar][group]) === 'number'"
                        />
                        <n-input
                            v-model:value="cfgFormModel[cfgVar][group]"
                            placeholder="输入字符串"
                            v-else
                        />
                    </n-form-item>
                </template>
                <!-- <n-form-item label="姓名" path="user.name">
                    <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
                </n-form-item>-->
                <n-form-item>
                    <n-button @click="handleSave" attr-type="button">notimplement</n-button>
                </n-form-item>
            </n-form>
        </n-gi>
    </n-grid>
    <n-empty v-else size="large" description="无配置项" />
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
})
const { svname } = toRefs(props)


/**
 * 配置表单
 */
let cfgFormModel = ref({} as any)
const handleSave = () => {    
    console.log(jsonString.value);
}
const _setFormModel = (data: any) => {
    cfgFormModel.value = data
}



/**
 * 数据获取
 */
const loading = ref(false)
const configObj = ref({} as object)
const fetchData = () => {
    loading.value = true;
    getServicConfig(svname.value).then(data => {
        configObj.value = data
        _setFormModel(data)
        loading.value = false;
    })
}
fetchData()
watch(svname, fetchData)


/**
 * json代码显示
 */
const jsonString = computed(() => JSON.stringify(cfgFormModel.value, null, 4))


</script>