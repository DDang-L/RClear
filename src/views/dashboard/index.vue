<template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in imagebox" :key="item.id">
      <img :src="item.idView" class="image" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      imagebox: [
        { id: 0, idView: require("@/assets/imagebox/f.jpg") },
        { id: 1, idView: require("@/assets/imagebox/index.jpg") },
        { id: 2, idView: require("@/assets/imagebox/index2.jpg") },
        //imagebox是assets下一个放图片的文件夹
      ],
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>