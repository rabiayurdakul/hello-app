<template>
  <div>
    <h2>Team List</h2>
    <hr>
    <v-btn @click="showUserList" to="/userComp">User</v-btn>
    <v-btn @click="showAnnouncementList" to="/announceComp">Announcements</v-btn>

<!--    <router-view :itemprop="passJsonName"></router-view>-->

  </div>
</template>

<script>



import jsonAnn from "@/assets/announcment/announcment.json";
import jsonUser from "@/assets/announcment/user.json";
export default {

name: "TeamList",


 methods: {

    showUserList(){

      this.$store.state.url="Users";
      this.$store.state.items= jsonUser.users;
    },
    showAnnouncementList(){
      this.$store.state.url="Announcements";
      this.$store.state.items= jsonAnn.announcments;
    }



  }

};

</script>

<style scoped>

</style>