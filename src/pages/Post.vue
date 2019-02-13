<template>
  <div>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange">
      <span slot="counter" slot-scope="col">
        <a-tag>{{col.views}}</a-tag>
        <a-tag>{{col.like}}</a-tag>
        <a-tag>{{col.dislike}}</a-tag>
        <a-tag>{{col.comments}}</a-tag>
      </span>
      <span slot="category" slot-scope="col" >
        <a-tag>{{col.category.name}}</a-tag>
      </span>
      <span slot="option" slot-scope="col" >
        <a :href="col.id">编辑</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">删除</a>
      </span>
      <span slot="source" slot-scope="col">
        <a :href="col.source" >来源</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import api from "../util/api";

const columns = [
  {
    title: "id",
    key: "id",
    dataIndex: "id",
    width: "18%"
  },
  {
    title: "标题",
    key: "title",
    dataIndex: "title",
    width: "15%"
  },
  {
    title: "计数",
    key: "counter",
    scopedSlots: { customRender: "counter" },
    width: "10%"
  },
  {
    title: "分类",
    key: "category",
    scopedSlots: { customRender: "category" },
    width: "10%"
  },
  {
    title: "来源",
    key: "source",
    scopedSlots: { customRender: "source" },
    width: "5%"
  },
  {
    title: "创建时间",
    dataIndex: "created",
    key: "created",
    width: "20%"
  },
  {
    title: "操作",
    key: "option",
    scopedSlots: { customRender: "option" }
  }
];

export default {
  mounted() {
    this.getPosts();
  },
  data() {
    return {
      columns: columns,
      data: [],
      pagination: {},
      handleTableChange: function(){},
    };
  },
  methods: {
    getPosts() {
      let self = this;
      api.pager('/post/page/', 1, function(ds, pg, change){
        self.data =ds;
        self.pagination = pg;
        self.handleTableChange = change;
      });
    },
  }
};
</script>
