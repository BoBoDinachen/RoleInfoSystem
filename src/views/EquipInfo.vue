<template>
  <div>
    <breadcrumb firstTitle="信息展示" secondTitle="装备信息"/>
    <div id="equip">
      式神装备
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/public/Breadcrumb.vue'
export default {
  components:{
    Breadcrumb
  }
}
</script>

<style scoped>
  #equip{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 50px;
    border-left: 2px solid purple;
  }
</style>