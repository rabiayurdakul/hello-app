<template>
<app-dynamic-list></app-dynamic-list>
</template>

<script>
import DynamicList from "@/components/dataList/DynamicList";
import jsonUser from "@/assets/announcment/user.json";
export default {
  components:{
  appDynamicList: DynamicList,

  },
  beforeMount(){
    //sayfa yüklenirken yapılacaklar.
    this.$store.state.url="Users";
    this.$store.state.items= jsonUser.users;
  },
}
</script>

<style scoped>

</style>