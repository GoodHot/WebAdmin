<template>
    <div>
        <a-card
        style="width:100%"
        :tabList="tabListNoTitle"
        :activeTabKey="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
        >
            <p v-if="noTitleKey === '9GAG'">
                <a-input-search placeholder="抓取数量" @search="onSearch" enterButton="开始" />
                <br><br>
                <a-table :columns="columns" :dataSource="data">
                </a-table>
            </p>
            <p v-else="noTitleKey === 'COUB'">
            </p>
        </a-card>
    </div>
</template>
<script>
const columns = [{
  title: '页码',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '链接',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '有效内容',
  key: 'tags',
  dataIndex: 'tags',
}, {
  title: '无效内容',
  key: 'action',
  dataIndex: 'action',
}];

const data = [{
  age: 1,
  address: 'http://www.9gag.com/page/1',
  tags: 10,
  action: 0
}, {
  age: 2,
  address: 'http://www.9gag.com/page/2',
  tags: 10,
  action: 0
}, {
  age: 3,
  address: 'http://www.9gag.com/page/3',
  tags: 10,
  action: 0
}];

export default {
  data () {
    return {
      tabListNoTitle: [{
        key: '9GAG',
        tab: '9GAG',
      }, {
        key: 'COUB',
        tab: 'COUB',
      }],
      key: '9GAG',
      noTitleKey: '9GAG',
      columns,
      data
    }
  },
  methods: {
    onTabChange (key, type) {
      this[type] = key
    },
  },
}
</script>