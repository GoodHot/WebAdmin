<template>
  <a-table :columns="columns" :dataSource="data" :pagination="false">
      <span slot="isShow" slot-scope="col">
        <a-badge v-if="col.isShow" status="success" text="显示" />
        <a-badge v-else status="error" text="隐藏" />
      </span>
      <span slot="icon" slot-scope="col">
          <a-avatar :src="col.icon" />
      </span>
      <span slot="opt" slot-scope="col">
          <a href="javascript:;">编辑</a>
          <a-divider type="vertical" />
          <a href="javascript:;">删除</a>
          <a-divider type="vertical" />
          <a v-if="col.isShow" href="javascript:;">隐藏</a>
          <a v-else href="javascript:;">显示</a>
      </span>
  </a-table>
</template>
<script>
import api from '../util/api';

const columns = [ {
  title: 'id',
  dataIndex: 'id',
  key: 'id',
  width: '18%'
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  width: '15%'
}, {
  title: '英文名',
  dataIndex: 'ename',
  key: 'ename',
  width: '15%'
}, {
  title: '排序',
  dataIndex: 'sort',
  key: 'sort',
  width: '15%'
}, {
  title: '图标',
  key: 'icon',
  scopedSlots: { customRender: 'icon' },
  width: '10%'
}, {
  title: '是否显示',
  key: 'isShow',
  scopedSlots: { customRender: 'isShow' },
}, {
  title: '操作',
  key: 'opt',
  scopedSlots: { customRender: 'opt' },
}];

export default {
    mounted(){
        this.getCategory();
    },
    data(){
        return {
            columns: columns,
            data: []
        }
    },
    methods: {
        getCategory(){
            let self = this;
            api.category(function(category){
                self.data = category;
            });
        }
    }
}
</script>
