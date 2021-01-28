<template>
<div class="container">
  <app-menuslider></app-menuslider>
<!--  <slider :width="300" format="push" direction="left" :opacity="0.15" :links="[{'id': 1, 'text': 'Link 1', 'url': 'https://github.com'}, {'id': 2, 'text': 'Link 2', 'url': 'https://github.com'}]"></slider>-->
  <div class="row">
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

      <hr>
    <app-header></app-header>
    <router-view></router-view>
      <hr>
      <appdynamic-list></appdynamic-list>
    </div>
  </div>
  </div>
<!--<section>
  <header>My First List</header>
  <ul>
 <AnnouncementList></AnnouncementList>
  </ul>
  </section>-->
</template>

<script>
import Header from "@/components/nav/Header";
import DynamicList from "@/components/dataList/DynamicList";
import MenuSlider from "@/components/menu/MenuSlider";
/*import Slider from "@jeremyhamm/vue-slider"*/

export default {
  components:{
    appHeader: Header,
    appdynamicList: DynamicList,
    appMenuslider: MenuSlider,
   /* 'slider':Slider*/
  }


}
</script>

<style>


html {
  font-family: 'Jost', sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 70%;
  max-width: 40rem;
}

p{
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: white;
  color: black;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;


}

li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 2rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 50%;
  max-width: 10rem;
  display: inline-block;

}

h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}
/*
button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

button:hover,
button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

 */
</style>
