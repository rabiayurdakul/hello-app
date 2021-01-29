<template>
  <div>
    <h1>{{setUser}}</h1>
    <v-data-table :headers="showHeader"
                  :items="showItems"
                  item-key="item.id"
                  class="elevation-1"
                  :search="search"
                  :custom-filter="filterText">
      <template v-slot:top>
        <v-text-field v-model="search"
                      label="Search"
                      class="mx-4">

        </v-text-field>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="ma-2" tile  color="dark">
          <v-icon left small @click="editItem(item)">
            mdi-pencil
          </v-icon >
          </v-btn>
        <v-btn class="ma-2" tile  color="dark">
          <v-icon left  small @click="deleteItem(item)">
            mdi-delete
          </v-icon >
          </v-btn>
      </template>
    </v-data-table>

  </div>
</template>

<script>





export default {
  data: function (){
    return{
      search:'',

    };
  },
  computed: {
    setUser() {
      return this.$store.state.url;
    },
    showItems(){
      return this.$store.state.items;
    },

      // eslint-disable-next-line vue/return-in-computed-property
      showHeader(){
        if (this.$store.state.url == "Users") {
          return this.$store.getters.showUsers.headers;
        } else if (this.$store.state.url == "Announcements") {
          return this.$store.getters.showAnnouncements.headers;
        }
      },



  },
  methods: {
    filterText(value, search) {
      return value != null &&
          search != null &&
          typeof value == 'string' &&
          value.toString().indexOf(search) !== -1
    },
    editItem (item) {
      this.editedIndex = this.announcements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.announcements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.announcements.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },



}
</script>

<style scoped>

</style>