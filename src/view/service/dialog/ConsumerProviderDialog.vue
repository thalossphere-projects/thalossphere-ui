<template>

    <el-dialog
            v-model="nodeListVisible"
            title="提供者实例列表"
            :before-close="handleClose"
    >
        <el-input style="width:440px" @clear="searchNode" clearable v-model="searchForm.providerIp"
                  placeholder="providerIp查询" class="input-with-select">
            <template #append>
                <el-button icon="Search" @click="searchNode"/>
            </template>
        </el-input>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
            <el-table-column prop="providerIp" label="providerIp地址"/>
            <el-table-column prop="port" label="端口"/>
            <el-table-column prop="status" label="状态">
                <template #default="{row}">
                    {{ mapStatus(row.status) }}
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-pagination style="margin-top:20px" :current-page="searchForm.page" :page-size="searchForm.size"
                       :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </el-dialog>
</template>


<script setup lang="ts">
import consumerApi from "../../../api/consumer.js";
import {reactive, ref} from 'vue';


const statusEnum = {
    0: '删除',
    1: '正常',
    2: '隔离',
};

const nodeListVisible = ref(false);

const consumerId = ref();
const handleOpen = (row) => {
    nodeListVisible.value = true;
    consumerId.value = row.id;
    getNodeList();
    // 其他逻辑
};
const handleClose = () => {
    nodeListVisible.value = false;
    searchForm.providerIp = '';
};

let tableData = ref([]);
let total = ref(0);

// 搜索条件
const searchForm = reactive({
    page: 1,
    size: 10,
    providerIp: ''
})

const getNodeListParam = reactive({
    page: 0,
    size: 10,
    consumerId: 0,
    providerIp: ''
})
// 获取用户列表
const getNodeList = async () => {
    getNodeListParam.consumerId = consumerId.value;
    getNodeListParam.providerIp = searchForm.providerIp;
    getNodeListParam.size = searchForm.size;
    getNodeListParam.page = searchForm.page - 1;
    const res = await consumerApi.findByConsumerIdOrProviderIp(getNodeListParam);
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

// 映射状态
const mapStatus = (status) => {
    return statusEnum[status] || '未知状态'; // 默认值处理
};
</script>
