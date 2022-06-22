<template>
  <el-config-provider :locale="zhCn">
    <div>
      <div>{{ num }}</div>
      <div>info:{{ name }}</div>
      <div>age:{{ age }}</div>
      <div>address:{{ obj.address }}--num:{{ obj.number }}</div>
      <div>message:{{ message }}--date:{{ date }}</div>
      <el-button type="primary" @click="change">I am ElButton</el-button>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, toRefs } from "vue";
import { ElConfigProvider, ElButton } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const num: Ref<number> = ref(18);

const info = reactive({
  name: "dnhyxc",
  age: 18
});

const obj = {
  address: "hangzhou",
  number: 209
};

const obj1 = reactive({
  message: "day day up",
  date: 20220320
});

const { name, age } = toRefs(info);

const { message, date } = toRefs(obj1);

const change = () => {
  num.value++;

  info.age++;

  obj.address = "xxx";
  obj.number++;

  message.value = "you can you up";
  date.value++;

  console.log(message);
  console.log(date);

  console.log(obj);
  console.log(obj1);
};
</script>

<style></style>
