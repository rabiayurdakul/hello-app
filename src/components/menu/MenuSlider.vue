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

    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Tüm Anonslar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>IVr Bilgilendirme Anonsları</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Arıza</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Kural Listesi</v-list-item-title>
          </v-list-item>
          <v-list-item>
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
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>