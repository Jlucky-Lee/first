<template>
  <div id="app">
  <Home/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/cesium">Cesium</router-link>
    </div> -->
   <keep-alive>
    <router-view />
   </keep-alive>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import Home from './views/Home'
export default {
  name: "App",
  components: {
    Home
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@font-face {
  font-family: "iconfont";
  src: url('assets/iconfont/iconfont.eot'); /* IE9*/
  src: url('assets/iconfont/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('assets/iconfont/iconfont.woff') format('woff'), /* chrome, firefox */
  url('assets/iconfont/iconfont.woff2') format('woff2'), /* chrome, firefox */
  url('assets/iconfont/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('assets/iconfont/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
