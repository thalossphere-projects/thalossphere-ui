<template>

    <div>
        <image src="/src/assets/img/logo.png"></image>
        <el-container class="home-container">
            <!-- header -->
            <el-header>
                <el-row>
                    <el-avatar shape="square" :src="logo"
                               style="margin: 10px; float: right;width: 165px"></el-avatar>
                    <el-col :span="4">
                    </el-col>
                    <el-col :offset="12" :span="8" style="min-width: 150px">
                        <el-dropdown style="float: right; margin: 20px 10px">
                            <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
                                flowsphere &nbsp;&nbsp; <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>

            </el-header>

            <el-container style="overflow: auto">
                <!-- 菜单 -->
                <el-aside>
                    <div class="toggle-button" @click="isCollapse = !isCollapse">
                        <el-icon :size="20">
                            <Expand v-if="isCollapse" />
                            <Fold v-if="!isCollapse" />
                        </el-icon>
                    </div>
                    <el-menu router :default-active="activePath" class="el-menu-vertical-demo" :collapse="isCollapse">
                        <el-menu-item index="/service/search" @click="saveActiveNav('/service/search')">
                            <el-icon>
                                <search />
                            </el-icon>
                            <span>服务查询</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <!-- 面包屑 -->
                        <!-- <Breadcrumb /> -->
                        <!-- 主要内容 -->
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Copyright © 2024 flowsphere</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import logo from "../assets/img/logo.png"
import { useRouter } from 'vue-router'
const router = useRouter();
// 挂载 DOM 之前
onBeforeMount(() => {
    activePath.value = sessionStorage.getItem("activePath")
        ? sessionStorage.getItem("activePath")
        : "/index"
})
let isCollapse = ref(false);
let activePath = ref("");
// 保存链接的激活状态
const saveActiveNav = (path) => {
    sessionStorage.setItem("activePath", path);
    activePath.value = path;
}
const logout = () => {
    // 清除缓存
    sessionStorage.clear();
    router.push("/login");
}
</script>

<style scoped>
.home-container {
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #f2f3f5;
}

.el-header {
    background: #0e0d0d;
    /*background: #5f89ef;*/
    padding: 0 10px;
    overflow: hidden;
}

.system-name {
    color: #fff;
    font-size: 18px;
}

.el-aside {
    background: white;
    width: auto !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-footer {
    color: #cccccc;
    text-align: center;
    line-height: 60px;
}

.el-footer:hover {
    color: #5f89ef;
}

.toggle-button {
    background-color: #d9e0e7;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    color: black;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-item.is-active {
    color: #0e0d0d !important;
    font-size: 15px;
    font-weight: bold;
    /*background-color: #5f89ef !important;*/
    background-color: #fff !important;
    border-radius: 2px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin: 2px 5px 0px 2px;
}
</style>