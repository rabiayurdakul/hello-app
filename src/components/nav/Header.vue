<template>
  <ul class="nav nav-pills">


       <router-link to="/user" tag="li" active-class="active" exact><a>User</a></router-link>
        <router-link  to="/team" tag="li" active-class="active"><a>Team</a></router-link>

  </ul>

</template>

<script>
export default {
name: "Header"


}
</script>

<style scoped>

</style>