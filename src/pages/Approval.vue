<template>
    <div>
        <a-row :gutter="16">
          <a-col :span="6">
            <a-button class="category-btn" type="primary" @click="pass(item.id)" block v-for="item of this.category" v-bind:key="item.id">{{item.name}}</a-button>
          </a-col>
          <a-col :span="12">
            <a-card :title="this.post.title" :bordered="true">
              <a-form>
                <a-form-item
                  label='中文标题'
                  :labelCol="{ span: 3 }"
                  :wrapperCol="{ span: 21 }"
                >
                  <a-input v-model="title"/>
                </a-form-item>
                <a-form-item
                  label='来源'
                  :labelCol="{ span: 3 }"
                  :wrapperCol="{ span: 21 }"
                >
                  <a-input v-model="this.post.source"/>
                </a-form-item>
              </a-form>
              <Media v-for="media of post.medias" v-bind:key="media.url" :media="media"></Media>
              <div class="staff-user">
                <a-button v-for="usr of staffUsers" v-bind:key="usr.id" :type="randomStaffUserType(usr.id)">{{usr.nickname}}</a-button>
              </div>
            </a-card>
          </a-col>
          <a-col :span="6">
              <a-button type="danger" size="large" block @click="rejected">不通过</a-button>
          </a-col>
        </a-row>
    </div>
</template>
<script>
import api from '../util/api';
import http from '../util/http';
export default {
  mounted(){
    this.getPost();
    this.getCategory();
    this.getStaffUsers();
  },
  data() {
    return {
      post: {},
      category: [],
      title: "",
      staffUsers: [],
      randomStaffUser: {}
    }
  },
  methods: {
    randomStaffUserType(id){
      return id == this.randomStaffUser.id ? 'primary' : '';
    },
    getStaffUsers(){
      let self = this;
      api.staffUsers(function(users){
        self.staffUsers = users;
        self.getRandomStaffUser();
      });
    },
    getRandomStaffUser(){
      this.randomStaffUser = this.staffUsers[parseInt(Math.random() * this.staffUsers.length -1 ) + 1]
    },
    getPost(){
      let self = this;
      api.archive(1, function(post){
        self.title = post.translateTitle;
        self.post = post;
        self.getRandomStaffUser();
      });
    },
    getCategory(){
      let self = this;
      api.category(function(category){
        self.category = category;
      });
    },
    pass(category){
      let param = {
        id: this.post.id,
        category: category,
        title: this.title,
        userId: this.randomStaffUser.id
      }
      let self = this;
      http.post('/archive/pass', param)
          .then(function(resp){
            if(resp.data.code == 200){
              self.getPost();
            } else {
              alert(resp.data.data);
            }
          })
    },
    rejected(){
      let self = this;
      http.post(`/archive/rejected/${this.post.id}`)
          .then(function(resp){
            if(resp.data.code == 200){
              self.getPost();
            } else {
              alert(resp.data.data);
            }
          })
    }
  }
}
</script>
<style lang="scss">
.category-btn {
    margin-bottom: 1rem;
}
.staff-user {
  button {
    margin-right: 0.4rem;
  }
}
</style>
