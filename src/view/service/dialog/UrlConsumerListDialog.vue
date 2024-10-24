<template>

    <el-dialog
            v-model="consumerListVisible"
            title="消费者列表"
            :before-close="handleClose"
    >
        <el-input style="width:440px" @clear="searchConsumer" clearable v-model="searchForm.consumerName"
                  placeholder="消费者查询" class="input-with-select">
            <template #append>
                <el-button icon="Search" @click="searchConsumer"/>
            </template>
        </el-input>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
            <el-table-column prop="consumer.name" label="消费者服务名"/>
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

const consumerListVisible = ref(false);

const providerName = ref('');
const url = ref('');
const handleOpen = (row) => {
    consumerListVisible.value = true;
    providerName.value = row.providerName;
    url.value = row.url;
    getConsumerList();
};
const handleClose = () => {
    consumerListVisible.value = false;
    searchForm.consumerName = '';
};

// 用户数据
let tableData = ref([]);
let total = ref(0);

// 搜索条件
const searchForm = reactive({
    page: 1,
    size: 10,
    consumerName: ''
})

const getUrlConsumerListParam = reactive({
    page: 0,
    size: 10,
    providerName: '',
    url: '',
    consumerName: ''
})
// 获取用户列表
const getConsumerList = async () => {
    getUrlConsumerListParam.providerName = providerName.value;
    getUrlConsumerListParam.url = url.value;
    getUrlConsumerListParam.consumerName = searchForm.consumerName;
    getUrlConsumerListParam.size = searchForm.size;
    getUrlConsumerListParam.page = searchForm.page - 1;
    console.log(JSON.stringify(getUrlConsumerListParam));
    const res = await consumerApi.findByProviderNameAndUrlAndConsumerName(getUrlConsumerListParam);
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