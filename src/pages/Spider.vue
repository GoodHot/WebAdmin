<template>
    <div>
        <a-card
        style="width:100%"
        :tabList="tabListNoTitle"
        :activeTabKey="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
        >
            <p v-if="noTitleKey === '9GAG'">
                <a-input-search placeholder="抓取数量" @search="gagStart" enterButton="开始" v-model="gagSize" />
                <br><br>
                <a-card title="result log">
                  <iframe :src="gagIframe" width="100%" height="500" frameborder="0"></iframe>
                </a-card>
            </p>
            <p v-else-if="noTitleKey === 'COUB'">
                <a-input-search placeholder="抓取数量" @search="coubStart" enterButton="开始" v-model="coubSize" />
                <br><br>
                <a-card title="result log">
                  <iframe :src="coubIframe" width="100%" height="500" frameborder="0"></iframe>
                </a-card>
            </p>
        </a-card>
    </div>
</template>
<script>
import api from '../util/api';
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
      gagSize: 10,
      gagIframe: "",
      coubSize: 10,
      coubIframe: ""
    }
  },
  methods: {
    onTabChange (key, type) {
      this[type] = key
    },
    gagStart(){
      this.gagIframe = api.url(`/spider/gag/${this.gagSize}`);
    },
    coubStart(){
      this.coubIframe = api.url(`/spider/coub/${this.coubSize}`);
    }
  },
}
</script>