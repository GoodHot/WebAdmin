<template>
  <div>
    <a-button class="editable-add-btn" @click="showAddModel">新建管理员</a-button>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange">
      <span slot="avatar" slot-scope="col">
        <a-avatar :src="col.avatar"/>
      </span>
      <span slot="opt" slot-scope="col">
        <a :href="col.id">编辑</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">删除</a>
      </span>
    </a-table>
    <a-modal title="新建管理员" v-model="visible" @ok="addAdmin">
      <a-form >
        <a-form-item label="昵称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-input v-model="edit.nickname" />
        </a-form-item>
        <a-form-item label="用户名" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-input v-model="edit.username"/>
        </a-form-item>
        <a-form-item label="密码" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-input v-model="edit.password"/>
        </a-form-item>
        <a-form-item label="头像" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-upload
            name="file"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped>
.editable-add-btn {
  margin-bottom: 10px;
}
.avatar-uploader {
  img {
    max-width: 100px;
    max-height: 100px;
  }
}
</style>

<script>
import api from "../util/api";
import http from "../util/http";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "15%"
  },
  {
    title: "头像",
    key: "avatar",
    scopedSlots: { customRender: "avatar" },
    width: "10%"
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
    width: "10%"
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    width: "10%"
  },
  {
    title: "创建时间",
    dataIndex: "created",
    key: "created",
    width: "20%"
  },
  {
    title: "修改时间",
    dataIndex: "modified",
    key: "modified",
    width: "20%"
  },
  {
    title: "操作",
    key: "opt",
    scopedSlots: { customRender: "opt" }
  }
];

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  mounted() {
    this.getAdmin();
  },
  data() {
    return {
      columns: columns,
      pagination: {},
      handleTableChange: function(){},
      data: [],
      visible: false,
      edit: {
        nickname: '',
        username: '',
        password: 0,
        avatar: ''
      },
      loading: false,
      imageUrl: '',
    };
  },
  methods: {
    getAdmin() {
      let self = this;
      api.pager('/admin/page/', 1, function(ds, pg, change){
        self.data =ds;
        self.pagination = pg;
        self.handleTableChange = change;
      });
    },
    showAddModel() {
      this.visible = true;
    },
    addAdmin() {
      let self = this;
      http.post('/admin', this.edit)
          .then(function(resp){
            if(resp.data.code == 200){
              alert("成功");
              self.visible = false;
              self.getAdmin();
            } else {
              alert(resp.data.data);
            }
          });
    },
    uploadAction(){
      return api.url('/upload/image')
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false
        })
        this.edit.avatar = info.file.response.data;
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
  }
};
</script>
