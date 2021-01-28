<template>
  <app-dynamic-list></app-dynamic-list>
</template>

<script>
import DynamicList from "@/components/dataList/DynamicList";
import jsonAnn from "@/assets/announcment/announcment.json";
export default {
  components:{
    appDynamicList: DynamicList,

  },
  beforeMount(){
    //sayfa yüklenirken yapılacaklar.
    this.$store.state.url="Announcements";
    this.$store.state.items= jsonAnn.announcments;
  },
}
</script>

<style scoped>

</style>