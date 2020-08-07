<template>
  <div class="threeMap">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabStyle">
          <el-tab-pane  class="more-btn" name="first">
            <div slot="label" class="labelSty"><i class="iconfont icon">&#xe675;</i>人行</div>
             <search 
              :startCoordinates="coord1" 
              :endCoordinates="coord2" 
              @selectPonit="Ponit">
            </search>
          </el-tab-pane>
          <el-tab-pane  class="more-btn" name="second">
            <div slot="label" class="labelSty"><i class="iconfont icon">&#xe67a;</i>驾车</div>
            <search 
              :startCoordinates="coord1" 
              :endCoordinates="coord2" 
              @selectPonit="Ponit">
            </search>
          </el-tab-pane>
          <el-tab-pane  class="more-btn" name="third">
            <div slot="label" class="labelSty"><i class="iconfont icon">&#xe622;</i>航行</div>
             <search 
              :startCoordinates="coord1" 
              :endCoordinates="coord2" 
              @selectPonit="Ponit">
            </search>
          </el-tab-pane>
    </el-tabs>
    <div id="cesiumContainer"></div>
    <div id="mes" class="mes">{{mes}}</div>
  </div>
</template>

<script>
import {UrlTemplateImageryProvider,Cartographic,Viewer,Rectangle,ScreenSpaceEventHandler,Math,ScreenSpaceEventType } from 'cesium'
import viewerCesiumNavigationMixin from '@znemz/cesium-navigation'
import Search from '../components/Search/Search'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import '@znemz/cesium-navigation/dist/index.css'
import {Set_Path} from "../api/index"

export default {
name:"ThreeMap",
data () {
  return {
    mes:"",
    activeName: 'first',
    coord1:"",
    coord2:"",
    index:0,
    viewer:"",
    handler:"",
    guid:"128989-2192-21948-103214"
  }
},
components: {
  Search
},
mounted () {
  this.initMap();
},
methods: {
  handleClick(tab) {
   
    let objParames = {
      guid:this.guid
    }
    if(tab.index == 1){
      // 驾车
      objParames.mode = 1;
      Set_Path(objParames)
    }
    else if(tab.index == 2){
      // 航行
      objParames.mode = 2;
      Set_Path(objParames)
    }
    else if(tab.index == 0){
      // 步行
      objParames.mode = 0;
      Set_Path(objParames)
    }
  },
  Ponit(payload){
    this.index =payload;
  },
  initMap(){
    let googleMapProvider = new UrlTemplateImageryProvider({
      url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
    })
    const viewer = (new Viewer('cesiumContainer', {
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        timeline: false,
        animation: false,
        imageryProvider: googleMapProvider
    }))

    viewer._cesiumWidget._creditContainer.style.display = 'none';//版权信息清除
    viewer.scene.globe.showGroundAtmosphere = false;

    let rectangle = new Rectangle.fromDegrees(112.237698, 21.696994, 112.274776, 21.735266);
    viewer.camera.flyTo({
      destination:rectangle
    });
    this.initNavgationBar(viewer);
    let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    this.mouseMoveHandler(handler,viewer)
    this.leftClickHandler(handler,viewer)
  },
  initNavgationBar(viewer) {
    var options = {}
    options.defaultResetView = Cartographic.fromDegrees(116.39, 39.9, 5000000.0)
    options.enableCompass = true
    options.enableZoomControls = true
    options.enableDistanceLegend = true
    options.enableCompassOuterRing = true
    viewerCesiumNavigationMixin(viewer, options)
  },
  mouseMoveHandler(handler,viewer){
    handler.setInputAction((event)=>{
      var ellipsoid = viewer.scene.globe.ellipsoid; //全局椭球体
      var cartesian = viewer.scene.pickPosition(event.endPosition); //拾取鼠标在椭圆上的结束点笛卡尔坐标点
      //转化笛卡尔坐标 为经纬度
      if (cartesian) {
      var cartographic = ellipsoid.cartesianToCartographic(cartesian); //笛卡尔坐标转制图坐标
      var coordinate =
      "经度:" +
       Math.toDegrees(cartographic.longitude).toFixed(6) +
      ",纬度:" +
       Math.toDegrees(cartographic.latitude).toFixed(6) +
      " 高度:" +
      cartographic.height.toFixed(2); //模型高度;
      this.mes = coordinate;
    }
    },ScreenSpaceEventType.MOUSE_MOVE)
  },
  leftClickHandler(handler,viewer){
    handler.setInputAction((event)=>{
      var earthPosition  = viewer.camera.pickEllipsoid(event.position,viewer.scene.globe.ellipsoid);
      var cartographic = Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cartographic());
      var lat= Math.toDegrees(cartographic.latitude);
      var lng= Math.toDegrees(cartographic.longitude);
      if(this.index == 0){
        this.coord1=lng+","+lat;
      }
      else{
        this.coord2=lng+","+lat;
      }
    },ScreenSpaceEventType.LEFT_CLICK)
  }
},

}
</script>

<style scoped>
.threeMap{

}
#cesiumContainer {
  position: absolute;
  top: 60px;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.mes {
  position: absolute;
  right: 2%;
  top: 5%;
  color: white;
  font-size: 12px;
  z-index: 9999;
}
.tabStyle{
  position: absolute;
  left: 50px;
  top: 100px;
  z-index: 10;
  background-color: #fff;
  padding: 5px 10px;
}
.icon{
  margin:0 5px;
}
.labelSty{
  margin:0 10px;
}
</style>