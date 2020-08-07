<template>
  <div class="home">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#184d47" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">Cesium地图</el-menu-item>
      <el-menu-item index="2">Openlayer地图</el-menu-item>
      <el-menu-item index="3">Echarts</el-menu-item>
      <el-menu-item index="4">v-charts</el-menu-item>
  </el-menu>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data () {
    return {
       activeIndex: "1",  
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key == 1){
        this.$router.push("/threeMap")
      }
      else if(key == 2){
        this.$router.push("/openlayer")
      }
      else if(key == 3){
        this.$router.push("/echarts")
      }
      else if(key == 4){
        this.$router.push("/vcharts")
      }
    }
  }
};
</script>
