<template>

    <el-dialog
            v-model="nodeListVisible"
            title="节点列表"
            :before-close="handleClose"
    >
        <el-input style="width:440px" @clear="searchNode" clearable v-model="searchForm.ip"
                  placeholder="ip查询" class="input-with-select">
            <template #append>
                <el-button icon="Search" @click="searchNode"/>
            </template>
        </el-input>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
            <el-table-column prop="ip" label="ip地址"/>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="margin-top:20px" :current-page="searchForm.page" :page-size="searchForm.size"
                       :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </el-dialog>
</template>


<script setup lang="ts">
import providerApi from "../../../api/provider.js";
import {reactive, ref} from 'vue';

const nodeListVisible = ref(false);

const providerId = ref();
const handleOpen = (row) => {
    nodeListVisible.value = true;
    providerId.value = row.id;
    getNodeList();
    // 其他逻辑
};
const handleClose = () => {
    nodeListVisible.value = false;
    searchForm.ip = '';
};

let tableData = ref([]);
let total = ref(0);

// 搜索条件
const searchForm = reactive({
    page: 1,
    size: 10,
    ip: ''
})

const getNodeListParam = reactive({
    page: 0,
    size: 10,
    providerId: 0,
    ip: ''
})
// 获取用户列表
const getNodeList = async () => {
    getNodeListParam.providerId = providerId.value,
        getNodeListParam.ip = searchForm.ip;
    getNodeListParam.size = searchForm.size;
    getNodeListParam.page = searchForm.page - 1;
    const res = await providerApi.findInstantByProviderIdAndIp(getNodeListParam);
    tableData.value = res.data.content;
    total.value = res.data.totalElements;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getNodeList();
}
const handleCurrentChange = (current) => {
    searchForm.page = current;
    getNodeList();
}
const searchNode = () => {
    searchForm.page = 1;
    getNodeList();
}

defineExpose({
    handleOpen,
    handleClose
});

</script>
