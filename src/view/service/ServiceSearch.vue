<template>
    <div>
        <el-card>
            <el-input style="width:440px" @clear="searchService" clearable v-model="searchForm.providerName"
                      placeholder="服务名搜索" class="input-with-select">
                <template #append>
                    <el-button icon="Search" @click="searchService"/>
                </template>
            </el-input>
            <el-table :data="serviceSearchData" border style="width: 100%;margin-top:20px">
                <el-table-column prop="name" label="服务名称"/>
                <el-table-column prop="upNumber" label="在线数量"/>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small"
                                   @click="handleNodeListDialog(scope.row)">
                            服务节点详情
                        </el-button>
                        <el-button size="small"
                                   @click="handleApiListDialog(scope.row)">
                            服务接口详情
                        </el-button>
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

            <NodeListDialog ref="nodeListDialogRef"></NodeListDialog>
            <ApiListDialog ref="apiListDialogRef"></ApiListDialog>
            <ServiceConsumerListDialog ref="consumerListDialogRef"></ServiceConsumerListDialog>

        </el-card>
    </div>

</template>

<script lang="ts" setup>
import providerApi from "../../api/provider.js";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import ApiListDialog from "./dialog/ApiListDialog.vue";
import NodeListDialog from "./dialog/NodeListDialog.vue";
import ServiceConsumerListDialog from "./dialog/ServiceConsumerListDialog.vue";


const router = useRouter();
// Dom 挂载之后
onMounted(() => {
    getServiceList();
})
// 用户数据
let serviceSearchData = ref([]);
let total = ref(0);
// 搜索条件
const searchForm = reactive({
    page: 1,
    size: 10,
    providerName: ''
})

const getServiceListParam = reactive({
    page: 0,
    size: 10,
    providerName: ''
})
// 获取用户列表
const getServiceList = async () => {
    getServiceListParam.providerName = searchForm.providerName;
    getServiceListParam.size = searchForm.size;
    getServiceListParam.page = searchForm.page - 1;
    const res = await providerApi.findByName(getServiceListParam);
    serviceSearchData.value = res.data.content;
    total.value = res.data.totalElements;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getServiceList();
}
const handleCurrentChange = (current) => {
    searchForm.page = current;
    getServiceList();
}
const searchService = () => {
    searchForm.page = 1;
    getServiceList();
}

const nodeListDialogRef = ref<InstanceType<typeof NodeListDialog> | null>(null);

const handleNodeListDialog = (row) => {
    nodeListDialogRef.value?.handleOpen(row);
};

const apiListDialogRef = ref<InstanceType<typeof ApiListDialog> | null>(null);

const handleApiListDialog = (row) => {
    apiListDialogRef.value?.handleOpen(row);
};

const consumerListDialogRef = ref<InstanceType<typeof ServiceConsumerListDialog> | null>(null);

const handleConsumerListDialog = (row) => {
    consumerListDialogRef.value?.handleOpen(row);
};

</script>

<style>
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>

