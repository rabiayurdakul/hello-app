<template>
<header>
  <nav>
    <ul>
      <li>
      <router-link to="/teams">
<!--        main.jsde router içinde verdiğimiz isim-->
        Team
      </router-link>
      </li>
      <li>
       <router-link to="/users">
         User
       </router-link>
      </li>
    </ul>
  </nav>
</header>
</template>

<script>
export default {
name: "TheNavigation"
}
</script>

<style scoped>
a {
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  color: white;
  padding: 0.05rem 1.5rem;
  display: inline-block;
}
a:hover,
a:active,
a.router-link-active {
  color: bisque;
  border-color: bisque;
  background-color: darkblue;
}
</style>