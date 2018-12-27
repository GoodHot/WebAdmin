<template>
  <div>
    <a-button class="editable-add-btn">
      <router-link to="/collect/add">新建合集</router-link>
    </a-button>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange">
      <span slot="opt" slot-scope="col">
        <a :href="col.id">编辑</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">删除</a>
      </span>
      <span slot="cover" slot-scope="col">
        <img :src="col.cover.posterUrl" width="100px" height="60px" />
      </span>
      <span slot="medias" slot-scope="col">
        {{col.medias.length}}
      </span>
    </a-table>
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

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "15%"
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: "15%"
  },
  {
    title: "封面",
    scopedSlots: { customRender: "cover"},
    key: "cover",
    width: "10%"
  },
  {
    title: "资源数",
    scopedSlots: { customRender: "medias"},
    key: "medias",
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

export default {
  mounted() {
    this.getCollect();
  },
  data() {
    return {
      columns: columns,
      pagination: {},
      handleTableChange: function(){},
      data: [],
    };
  },
  methods: {
    getCollect() {
      let self = this;
      api.pager('/collect/page/', 1, function(ds, pg, change){
        self.data =ds;
        self.pagination = pg;
        self.handleTableChange = change;
      });
    },
  }
};
</script>
