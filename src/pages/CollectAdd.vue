<template>
  <div>
    <a-row type="flex">
      <a-col :span="3"></a-col>
      <a-col :span="18">
         <a-form >
          <a-form-item
            label='标题'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-input v-model="title" />
          </a-form-item>
          <a-form-item 
            label='内容'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
          >
          <Media v-for="media of medias" v-bind:key="media.id" :media="media"></Media>
          </a-form-item>
          <a-form-item 
            label='增加'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-button type='dashed' @click="addMedia" style="width: 100%">
              <a-icon type='plus' /> Add media
            </a-button>
          </a-form-item>
          <a-form-item
            :wrapperCol="{ span: 12, offset: 5 }"
          >
            <a-button type='primary' @click="submit" :disabled="submitBtnDisable">
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <a-modal title="Add Media" v-model="visible" :footer="null" :maskClosable="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="爬虫" key="1">
          <a-input-search
            placeholder="请输入URL"
            enterButton
            @search="searchResource"
            v-model="resourceURL"
            :disabled="searchResourceDisable"
          /><br><br>
          <a-alert message="支持：抖音，快手，快拍视频地址" type="success" /><br><br>
          <Media :media="mediaPreview"></Media><br><br>
          <a-checkbox @change="setCover" v-model="checkboxCover">设置为封面</a-checkbox>
          <br><br>
          <a-button type="primary" @click="saveSource">保存</a-button>
        </a-tab-pane>
        <a-tab-pane tab="文本" key="2">
          <a-textarea placeholder="输入文本" v-model="text" />
          <br><br>
          <a-button type="primary" @click="saveText">保存</a-button>
        </a-tab-pane>
        <a-tab-pane tab="上传图片" key="3">
          <a-upload-dragger name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/">
            <p class="ant-upload-drag-icon">
              <a-icon type="picture" />
            </p>
            <p class="ant-upload-text">点击选择上传的图片</p>
            <p class="ant-upload-hint">支持文件拖拽上传</p>
          </a-upload-dragger>
        </a-tab-pane>
        <a-tab-pane tab="上传视频" key="4">
          <a-upload-dragger name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/">
            <p class="ant-upload-drag-icon">
              <a-icon type="video-camera" />
            </p>
            <p class="ant-upload-text">点击选择上传的视频</p>
            <p class="ant-upload-hint">支持文件拖拽上传</p>
          </a-upload-dragger>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import http from '../util/http';

export default {
  data(){
    return {
      visible: false,
      medias: [],
      text: '',
      resourceURL: '',
      searchResourceDisable: false,
      mediaPreview: {},
      cover: {},
      title: '',
      checkboxCover: false,
      submitBtnDisable: false,
    }
  },
  methods: {
    addMedia() {
      this.visible = true;
    },
    submit(){
      // this.submitBtnDisable = true;
      let param = {
        title: this.title,
        cover: this.cover,
        medias: this.medias
      }
      http.post('collect', param)
          .then(function(resp){
            console.log(resp);
            if(resp.data.code == 200){
              alert('添加成功');
            } else {
              alert(resp.data.message);
            }
          });
    },
    setCover(e) {
      if(e.target.checked){
        this.cover = this.mediaPreview;
      }
    },
    saveSource(){
      this.mediaPreview.notAutoplay= true;
      this.medias.push(this.mediaPreview);
      this.mediaPreview = {};
      this.checkboxCover = false;
    },
    saveText(){
      this.medias.push({
        type: "TEXT",
        text: this.text
      });
      this.text = '';
    },
    searchResource(){
      this.searchResourceDisable = true;
      let self = this;
      http.get(`spider/resource?url=${this.resourceURL}`)
          .then(function(resp) {
            self.searchResourceDisable = false;
            let data = resp.data;
            if(data.code != 200 || data.data.retCode != 200){
              alert('获取资源失败');
              self.resourceURL = '';
              return ;
            }
            let res = data.data.data;
            if(res.video.startsWith("//")){
              res.video = "http:" + res.video;
            }
            self.mediaPreview = {
              url: res.video,
              posterUrl: res.cover,
              type: 'VIDEO',
              source: self.resourceURL
            }
            self.resourceURL = '';
          })
    }
  }
}
</script>
