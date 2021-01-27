<template>
 <table name="table-style">
        <thead>
        <tr>
          <th></th>
          <th scope="col">Name</th>
          <th scope="col">File Name</th>
          <th scope="col">Description</th>
        </tr>
        </thead>

        <tr v-for="announcement in announcements" :key="announcement.ann_name">

          <td><button>Edit </button></td>
          <td ><p>{{ announcement.ann_name }}</p></td>
          <td > <p>{{ announcement.filename }}</p></td>
          <td ><p>{{ announcement.description }}</p></td>

        </tr>

      </table>



</template>

<script>
import json from "@/assets/announcment/announcment.json";
export default {
  name: "AnnouncementList",
  data: function (){
    return{
      announcements: json.announcments,
    };
  },
  mounted: function (){

  },
};
</script>

<style type="text/css">


</style>