import Vue from 'vue';
import Vuex from 'vuex';
//import jsonAnn from "@/assets/announcment/announcment.json";
//import jsonUser from "@/assets/announcment/user.json";

Vue.use(Vuex);
export const store = new Vuex.Store({
   state:{
       url:"",
       items: []
   },
    getters:{

        showUsers(){
            return {
                selectedItem: {},
                showDialog: false,
                search: '',
                //items: jsonUser,
                headers: [
                    {text: "", value: "action"},
                    {text:"ID", value: 'id'},
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: 'false',
                        value: 'name'
                    },
                    {text: 'Last Name', value: 'lastname'},
                    {text: 'E-Mail', value: 'e-mail'}
                ],
            }
        },


        showAnnouncements(){
            return {
                selectedItem: {},
                showDialog: false,
                search: '',
               // items: jsonAnn.announcments,
                headers: [
                    {text: "", value: "action"},
                    {text:"ID", value: 'id'},
                    {
                        text: 'Announce Name',
                        align: 'start',
                        sortable: 'false',
                        value: 'ann_name'
                    },
                    {text: 'File Name', value: 'filename'},
                    {text: 'Description', value: 'description'}
                ],
            }
        }
    }


});