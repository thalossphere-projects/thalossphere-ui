<template>

    <el-dialog
            v-model="consumerListVisible"
            title="消费者列表"
            :before-close="handleClose"
    >
        <el-input style="width:440px" @clear="searchConsumer" clearable v-model="searchForm.name"
                  placeholder="消费者查询" class="input-with-select">
            <template #append>
                <el-button icon="Search" @click="searchConsumer"/>
            </template>
        </el-input>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
            <el-table-column prop="name" label="消费者服务名"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small"
                               @click="consumerProviderDialog(scope.row)">
                        服务提供者实例列表
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="margin-top:20px" :current-page="searchForm.page" :page-size="searchForm.size"
                       :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"/>

        <ConsumerProviderDialog ref="consumerProviderDialogRef"></ConsumerProviderDialog>
    </el-dialog>
</template>


<script setup lang="ts">
import consumerApi from "../../../api/consumer.js";
import {reactive, ref} from 'vue';
import NodeListDialog from "./NodeListDialog.vue";
import ConsumerProviderDialog from "./ConsumerProviderDialog.vue";

const consumerListVisible = ref(false);

const providerName = ref('');

const consumerProviderDialogRef = ref<InstanceType<typeof ConsumerProviderDialog> | null>(null);

const consumerProviderDialog = (row) => {
    consumerProviderDialogRef.value?.handleOpen(row);
}

const handleOpen = (row) => {
    consumerListVisible.value = true;
    providerName.value = row.name;
    getConsumerList();
};
const handleClose = () => {
    consumerListVisible.value = false;
    searchForm.name = '';
};

// 用户数据
let tableData = ref([]);
let total = ref(0);

// 搜索条件
const searchForm = reactive({
    page: 1,
    size: 10,
    name: ''
})

const getConsumerListParam = reactive({
    page: 0,
    size: 10,
    providerName: providerName,
    consumerName: ''
})
// 获取用户列表
const getConsumerList = async () => {
    getConsumerListParam.consumerName = searchForm.name;
    getConsumerListParam.size = searchForm.size;
    getConsumerListParam.page = searchForm.page - 1;
    const res = await consumerApi.findByProviderNameAndConsumerName(getConsumerListParam);
    tableData.value = res.data.content;
    total.value = res.data.totalElements;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getConsumerList();
}
const handleCurrentChange = (current) => {
    searchForm.page = current;
    getConsumerList();
}
const searchConsumer = () => {
    searchForm.page = 1;
    getConsumerList();
}

defineExpose({
    handleOpen,
    handleClose
});

</script>