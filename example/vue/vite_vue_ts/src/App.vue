<template>
  <div>
    <div>{{ num }}</div>
    <div>info:{{ name }}</div>
    <div>age:{{ age }}</div>
    <div>address:{{ obj.address }}--num:{{ obj.number }}</div>
    <div>message:{{ message }}--date:{{ date }}</div>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, toRefs } from "vue";

const num: Ref<number> = ref(18);

const info = reactive({
  name: "dnhyxc",
  age: 18,
});

const obj = {
  address: "hangzhou",
  number: 209,
};

const obj1 = reactive({
  message: "day day up",
  date: 20220320,
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

<style>
</style>
