<template>

    <el-dialog
            v-model="apiListVisible"
            title="服务接口列表"
            :before-close="handleClose"
    >
        <el-input style="width:440px" @clear="searchApi" clearable v-model="searchForm.url"
                  placeholder="接口搜索" class="input-with-select">
            <template #append>
                <el-button icon="Search" @click="searchApi"/>
            </template>
        </el-input>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
            <el-table-column prop="url" label="接口地址"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small"
                               @click="handleConsumerListDialog(scope.row)">
                        消费者详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="margin-top:20px" :current-page="searchForm.page" :page-size="searchForm.size"
                       :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"/>

        <UrlConsumerListDialog ref="consumerListDialogRef"></UrlConsumerListDialog>

    </el-dialog>
</template>

<script setup lang="ts">
import providerApi from "../../../api/provider.js";
import {reactive, ref} from 'vue';
import UrlConsumerListDialog from "./UrlConsumerListDialog.vue";

const apiListVisible = ref(false);

const id = ref();
const handleOpen = (row) => {
    apiListVisible.value = true;
    id.value = row.id;
    getApiList();
    // 其他逻辑
};
const handleClose = () => {
    apiListVisible.value = false;
    searchForm.url = '';
};

// 用户数据
let tableData = ref([]);
let total = ref(0);

// 搜索条件
const searchForm = reactive({
    page: 1,
    size: 10,
    url: ''
})

const getApiListParam = reactive({
    page: 0,
    size: 10,
    providerId: null,
    url : ''
})
// 获取用户列表
const getApiList = async () => {
    getApiListParam.providerId = id.value;
    getApiListParam.url = searchForm.url;
    getApiListParam.size = searchForm.size;
    getApiListParam.page = searchForm.page - 1;
    const res = await providerApi.findFunctionByProviderIdAndUrl(getApiListParam);
    tableData.value = res.data.content;
    total.value = res.data.totalElements;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getApiList();
}
const handleCurrentChange = (current) => {
    searchForm.page = current;
    getApiList();
}
const searchApi = () => {
    searchForm.page = 1;
    getApiList();
}

defineExpose({
    handleOpen,
    handleClose
});


const consumerListDialogRef = ref<InstanceType<typeof UrlConsumerListDialog> | null>(null);

const handleConsumerListDialog = (row) => {
    consumerListDialogRef.value?.handleOpen(row);
};

</script>