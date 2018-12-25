<template>
  <a-form id='components-form-demo-normal-login' class='login-form'>
    <a-form-item>
      <a-input placeholder='用户名' >
        <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input type='password' placeholder='密码' >
        <a-icon slot="prefix" type='lock' style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type='primary' htmlType='submit' class='login-form-button'>
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>