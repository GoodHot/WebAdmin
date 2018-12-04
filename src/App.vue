<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1">
            <a-icon type="download" />
            <span><router-link to="/">爬虫管理</router-link></span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="check-square-o" />
            <span><router-link to="/approval">内容审核</router-link></span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="bars" />
            <span><router-link to="/category">分类管理</router-link></span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss" scoped>
.ant-menu-item span a{
  color: rgba(255, 255, 255, 0.65);
  :focus {
    text-decoration: none;
  }
}
#components-layout-demo-custom-trigger {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
}
</style>