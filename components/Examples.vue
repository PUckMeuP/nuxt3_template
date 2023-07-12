<template>
  <br />
  <el-dropdown class="m-4" type="primary">
    <el-button type="primary">
      Dropdown List
      <el-icon class="el-icon--right">
        <el-icon-arrow-down />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <br />
  <el-button class="m-4" type="primary" @click="hello">Hello</el-button>
  <el-button @click="helloSuccess">Hello</el-button>
  <br />
  <br />
  <el-icon class="cursor-pointer">
    <el-icon-grape />
  </el-icon>
  <br />

  <!-- <el-config-provider >
    <el-date-picker v-model="timeValue" type="date" placeholder="请选择日期" />
  </el-config-provider> -->
</template>

<script setup lang="ts">

// import zhCn from "element-plus/es/locale/lang/zh-cn";

const timeValue = ref("");
const hello = () => ElMessage.info("hello world");
const helloSuccess = () => ElMessage.success("hello world");


</script>