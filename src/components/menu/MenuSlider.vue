<template>
  <div>
<!--  <v-card
      class="mx-auto overflow-hidden"
      height="400"
      width="344"
  >-->
<!--    <v-system-bar color="red"></v-system-bar>-->

<!--    <v-app-bar
        color="red"

        dense
        prominent
    >-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

<!--      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>-->

<!--      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>-->
<!--    </v-app-bar>-->

    <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
        dark

    >
      <v-list
          nav
          dense
          rounded

      >


        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <h1 class="h1" >......</h1>
          <Voda  class="v-icon"/>
          </v-list-item>

          <v-list-item @click="showUserList" to="/userComp">
            <v-icon medium color="blue darken-2">
              mdi-bullhorn-outline
            </v-icon>

            <v-list-item-title >Tüm Anonslar</v-list-item-title>

          </v-list-item>

          <v-list-item @click="showAnnouncementList" to="/announceComp">
            <v-icon medium color="blue darken-2" class="material-icons">
              mdi-alert-circle-outline
            </v-icon>
            <v-list-item-title>IVR Bilgilendirme Anonsları</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-icon medium  >
              mdi-alert-outline
            </v-icon>
            <v-list-item-title>Arıza</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-icon medium  >
              mdi-newspaper-variant-outline
            </v-icon>
            <v-list-item-title>Kural Listesi</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon medium  >
              mdi-newspaper-variant-multiple-outline
            </v-icon>

            <v-list-item-title>Raporlar</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

<!--    <v-card-text>
      The navigation drawer will appear from the bottom on smaller size screens.
    </v-card-text>-->
  </div>
<!--  </v-card>-->
</template>

<script>
import Voda from "@/assets/voda-icon.svg";
import jsonUser from "@/assets/announcment/user.json";
import jsonAnn from "@/assets/announcment/announcment.json";

export default {
  components:{
    Voda,
  },
  data: () => ({
    drawer: false,
    group: null,
   // mySVG: require('@/assets/voda-icon.svg')

  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
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

}
</script>
<style>
.v-icon {
  width: 4em;
  height: 4em;
  fill: crimson;
}
.h1{
  color: #353535;
}
</style>