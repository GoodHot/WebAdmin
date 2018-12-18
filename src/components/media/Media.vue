<template>
  <div class="media">
    <div v-if="media.type == 'JPEG'" class="image">
      <img :src="media.url">
    </div>
    <div v-else-if="media.type == 'VIDEO'" class="video">
      <video preload="auto" :poster="media.posterUrl" loop="loop" autoplay>
        <source :src="media.url" type="video/mp4">
      </video>
    </div>
    <div v-else-if="media.type == 'COUB_EMBED'" class="coub">
      <iframe
        :src="this.coubEmableURL(media.url)"
        allowfullscreen
        frameborder="0"
        width="100%"
        allow="autoplay"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    media: {
      type: Object
    }
  },
  methods: {
      coubEmableURL(coubURL){
          return `${coubURL}?muted=true&autostart=false&originalSize=true&startWithHD=true`;
      }
  }
};
</script>

<style lang="scss" scoped>
.media {
  .image {
    text-align: center;
    img {
      border-radius: 0.5rem;
      border: 1px solid #ddd;
      padding: 1rem;
      max-width: 100%;
    }
  }
  .video {
    text-align: center;
    video {
      border-radius: 0.5rem;
      border: 1px solid #ddd;
      padding: 1rem;
    }
  }
  .coub {
    iframe {
        width: 100%;
        height: 350px;
    }
  }
}
</style>
