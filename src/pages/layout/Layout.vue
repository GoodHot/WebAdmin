<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo" />
        <a-menu mode="inline" theme="dark">
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="mail" /><span>资源管理</span></span>
            <a-menu-item key="spider">
              <a-icon type="download" />
              <span><router-link to="/">爬虫管理</router-link></span>
            </a-menu-item>
            <a-menu-item key="approval">
              <a-icon type="check-square-o" />
              <span><router-link to="/approval">内容审核</router-link></span>
            </a-menu-item>
            <a-menu-item key="category">
              <a-icon type="bars" />
              <span><router-link to="/category">分类管理</router-link></span>
            </a-menu-item>
            <a-menu-item key="task">
              <a-icon type="bars" />
              <span><router-link to="/task">任务管理</router-link></span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="collect">
            <a-icon type="copy" />
            <span><router-link to="/collect">合集管理</router-link></span>
          </a-menu-item>
          <a-menu-item key="admin">
            <a-icon type="user" />
            <span><router-link to="/admin">管理员</router-link></span>
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
  name: 'app',
  data(){
    return {
      collapsed: false,
    }
  }
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
  min-height: 100vh;
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