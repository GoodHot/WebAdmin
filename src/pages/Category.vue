<template>
  <div>
    <a-button class="editable-add-btn" @click="showAddModel">新建分类</a-button>
    <a-table :columns="columns" :dataSource="data" :pagination="false">
      <span slot="isShow" slot-scope="col">
        <a-badge v-if="col.isShow" status="success" text="显示"/>
        <a-badge v-else status="error" text="隐藏"/>
      </span>
      <span slot="icon" slot-scope="col">
        <a-avatar :src="col.icon"/>
      </span>
      <span slot="opt" slot-scope="col">
        <a href="javascript:;">编辑</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">删除</a>
        <a-divider type="vertical"/>
        <a v-if="col.isShow" href="javascript:;">隐藏</a>
        <a v-else href="javascript:;">显示</a>
      </span>
    </a-table>
    <a-modal title="新增分类" v-model="visible" @ok="addCategory">
      <a-form >
        <a-form-item label="名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-input v-model="add.name" />
        </a-form-item>
        <a-form-item label="英文名" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-input v-model="add.ename"/>
        </a-form-item>
        <a-form-item label="排序" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-input-number :min="10" :max="9999" step="10" v-model="add.sort"  />
        </a-form-item>
        <a-form-item label="图标" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
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
        <a-form-item label="是否显示" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-switch v-model="add.isShow" />
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
    width: "18%"
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: "15%"
  },
  {
    title: "英文名",
    dataIndex: "ename",
    key: "ename",
    width: "15%"
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort",
    width: "15%"
  },
  {
    title: "图标",
    key: "icon",
    scopedSlots: { customRender: "icon" },
    width: "10%"
  },
  {
    title: "是否显示",
    key: "isShow",
    scopedSlots: { customRender: "isShow" }
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
    this.getCategory();
  },
  data() {
    return {
      columns: columns,
      data: [],
      visible: false,
      add: {
        name: '',
        ename: '',
        sort: 0,
        icon: '',
        isShow: true
      },
      loading: false,
      imageUrl: '',
    };
  },
  methods: {
    getCategory() {
      let self = this;
      api.category(function(category) {
        self.data = category;
      });
    },
    showAddModel() {
      this.visible = true;
    },
    addCategory() {
      let self = this;
      http.post('/category', this.add)
          .then(function(resp){
            if(resp.data.code == 200){
              alert("成功");
              self.visible = false;
              self.getCategory();
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
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false
        })
        this.add.icon = info.file.response.data;
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
