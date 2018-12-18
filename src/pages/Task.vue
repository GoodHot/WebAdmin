<template>
  <div>
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
      style="width: 600px;"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta
          :description="item.subtitle"
        >
          <a slot="title" href="https://vuecomponent.github.io/ant-design-vue/">{{item.title}}</a>
          <a-avatar slot="avatar">S</a-avatar>
        </a-list-item-meta>
        <a slot="actions" @click="doTask(item.key)">开始执行({{getCount(item.key)}})</a>
      </a-list-item>
    </a-list>
    <a-card title="result log">
      <iframe :src="iframe" width="100%" height="500" frameborder="0"></iframe>
    </a-card>
  </div>
</template>
<script>
import http from '../util/http';
import api from '../util/api';

const data = [
  {
    title: '内容下载转码',
    subtitle: '对审核后的内容进行下载和转码',
    key: 'archiveTask'
  }
]
export default {
  data () {
    return {
      data,
      count: {
          archiveTask: 0
      },
      iframe: ''
    }
  },
  mounted(){
      this.getArchiveTaskCount();
  },
  methods: {
      getCount(key){
          return this.count[key];
      },
      getArchiveTaskCount(){
          let self = this;
          http.get('/task/archive-task-count')
              .then(function(resp) {
                  self.count.archiveTask = resp.data.data;
              })
      },
      doTask(key) {
        let url = '';
        if(key == 'archiveTask'){
          url = api.url('/task/start-archive-task')
        }
        this.iframe = url;
      }
  }
}
</script>