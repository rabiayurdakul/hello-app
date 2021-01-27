<template>
  <div>
  <hr>

    <router-link tag="li" to="/announce" class="list-group-item" style="cursor: pointer">Announce</router-link>
  <router-link tag="li" to="/user/1" class="list-group-item" style="cursor: pointer">User 1</router-link>
    <router-link tag="li" to="/user/2" class="list-group-item" style="cursor: pointer">User 2</router-link>
  </div>
</template>

<script>
export default {
name: "UserStart"
}
</script>

<style scoped>

</style>