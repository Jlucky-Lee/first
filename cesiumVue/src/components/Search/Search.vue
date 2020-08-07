<template>
  <div class="search">
    <div class="left">
      <i class="iconfont change" @click="changeLocAndDes">&#xe63b;</i>
    </div>
    <div class="right">
      
      <el-input placeholder="请选择起点" v-model="startCoordinate_">
        <i slot="prefix" class="el-icon-location commonIcon startIcon" @click="sendPonit(0)"></i>
        <i slot="suffix" class="el-icon-error commonIcon " @click="clearInput(0)"></i>
      </el-input>
      <el-input placeholder="请选择终点" v-model="endCoordinate_">
        <i slot="prefix" class="el-icon-location commonIcon endIcon" @click="sendPonit(1)"></i>
        <i slot="suffix" class="el-icon-error commonIcon" @click="clearInput(1)"></i>
      </el-input>
      <div class="btnWrapper">
        <el-button type="primary" :loading="false" size="mini" @click="searchRoutes">路线查询</el-button>
        <el-button type="primary" :loading="false" size="mini">开始导航</el-button>
        <el-button type="danger" :loading="false" size="mini">结束导航</el-button>
      </div>
      
    </div>
  </div>
</template>

<script>
import {Search_Guid,Init_Navigation,Get_Path} from "../../api/index"
export default {
name:"Search",
data () {
  return {
    index:0,
    startCoordinate_:this.startCoordinates,
    endCoordinate_:this.endCoordinates,
    guid:"128989-2192-21948-103214",
    initGuid:{
      guid:"128989-2192-21948-103214",
      coodinate:0,   	
      mode:1,			
      speedMode:0,			
      noDataAlarmTime:0,
      stateChanged:(state)=>{console.log("stateChanged",state);},
      pathDeviated:(res)=>{console.log("pathDeviated",res);},
      speedUpdated:(speedObj)=>{console.log("speedUpdated",speedObj);},
      distanceUpdated:(res)=>{ console.log("distanceUpdated",res); },
    }
  }
},
// props: ["startCoordinates","endCoordinates"],
props: {
  startCoordinates: {
				type: String,
				required: true,
				default: ""
	},
  endCoordinates: {
				type: String,
				required: true,
				default: ""
  }
},
methods: {
  sendPonit(index){
    this.index=index;
    if(index === 0){
      this.$emit('selectPonit',0);
    }
    else{
      this.$emit('selectPonit', 1);
    }
  },
  clearInput(index){
    if(index === 0){
      this.startCoordinate_ = "";
    }
    else{
      this.endCoordinate_= "";
    }
  },
  changeLocAndDes(){
    let params = this.startCoordinate_;
    this.startCoordinate_ = this.endCoordinate_;
    this.endCoordinate_ = params;
  },
  searchRoutes(){
    Search_Guid(this.guid).then((res)=>{
        console.log(res,"res");
        if(res.state === 0){ 
          // 未注册
          let l =this.startCoordinate_.split(",");
          let d =this.endCoordinate_.split(",")
          this.initGuid.location={
            x:l[0],
            y:l[1]
          }
          this.initGuid.destination={
            x:d[0],
            y:d[1]
          }
          Init_Navigation(this.initGuid).then((res)=>{
            console.log("init",res);
          })
         }
        // 获取路线
        Get_Path(this.guid).then((res)=>{
          console.log("getPath",res);
          
        });
    });
  }
 
},
watch: {
  startCoordinates:function(newVal,oldVal){
    if(this.index === 0){
      this.startCoordinate_=newVal;
    }
    else{
      this.startCoordinate_=oldVal;
    }
  },
  endCoordinates:function(newV,oldV){
    if(this.index === 1){
      this.endCoordinate_=newV;
    }
    else{
      this.endCoordinate_=oldV;
    }
  },
}
}
</script>

<style scoped lang="scss">
.search{
  display: flex;
  align-items: center;
  justify-content: space-around;
  &.left{
    flex: 1;
  }
  &.right{
    flex: 4;
  }
}
.commonIcon{
  margin: 12px 0;
  display: inline-block;
}
.startIcon{
  color: lightgreen;
}
.endIcon{
  color: lightcoral;
}
.change{
  font-size: 30px;
}
.change:hover{
  color: #409EFF;
}
.btnWrapper{
  text-align: right;
  margin: 10px 0 0 0;
}
</style>