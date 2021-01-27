import json from "@/assets/announcment/announcment.json";

export default {

    data() {
        return {
            selectedItem: {},
            showDialog: false,
            search: '',
            items: json.user,
            headers: [
                {text: "", value: "action"},
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
    showData(){
        return {
            selectedItem: {},
            showDialog: false,
            search: '',
            items: json.user,
            headers: [
                {text: "", value: "action"},
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
    methods: {
        editItem(item) {
            this.showDialog = true
            this.selectedItem = item
        },
        deleteItem() {
        },
        /* save(item) {
         },*/
        cancel() {
        },
    }
}