<template>
  <div>
    <h2>User List</h2>
    <hr>
    <v-btn @click="navigateToAnnounceList">Announce List</v-btn>
    <hr>

    <router-view></router-view>


  </div>

</template>

<script>


export default {
  name: "UserList",

  methods: {
    navigateToAnnounceList() {
      this.$router.push({path: '/announce'});
    }

  }
}
</script>

<style scoped>

</style>