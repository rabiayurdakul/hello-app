<template>
<div>
  <v-data-table :headers="headers"
                :items="announcements"
                item-key="announcement.ann_name"
                class="elevation-1"
                :search="search"
                :custom-filter="filterText"
                >
    <template v-slot:top>
      <v-text-field v-model="search"
                    label="Search"
                    class="mx-4">

      </v-text-field>
    </template>

    <template v-slot:item.action="{ item }">
      <v-btn class="ma-2" tile outlined color="success">
        <v-icon left @click="editItem(item)">
        mdi-pencil
      </v-icon >
        Edit</v-btn>
      <v-btn class="ma-2" tile outlined color="success">
        <v-icon left @click="deleteItem(item)">
          mdi-delete
        </v-icon >
        Delete</v-btn>
    </template>

  </v-data-table>
</div>
</template>

<script>
import json from "@/assets/announcment/announcment.json";
export default {
name: "dataListComponent",
  data: function (){
    return{
      search:'',
      announcements: json.announcments,
    };
  },
  computed:{
  headers(){
    return[
      { text: "", value: "action" },
      {
        text: 'Announce Name',
        align: 'start',
        sortable: 'false',
        value: 'ann_name'
      },
      {text: 'File Name', value: 'filename'},
      {text: 'Description', value: 'description'}
    ]
  },
  },
  methods: {
  filterText(value, search){
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