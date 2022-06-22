<template>
  <div class="home">
    <div class="appName">
      <div>
        appName:<span class="name">{{ appName || 'Vue-Home' }}</span>
      </div>
    </div>
    <h1>Home</h1>
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      name: "xxx",
      appName: ''
    };
  },
  mounted () {
    this.getGlobalState()
  },
  methods: {
    getGlobalState () {
      if (window.__POWERED_BY_QIANKUN__) {
        window.__MAIN_GLOBALSTATE_ACTIONS__.onGlobalStateChange((state) => {
          this.appName = state.name
        })
      }
    },
  }
};
</script>

<style>
.appName {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
}

.name {
  font-size: 28px;
  color: red;
  margin-left: 10px;
  font-weight: 700;
}
</style>
