import json from "@/assets/announcment/announcment.json";

export default {

    data() {
        return {
            selectedItem: {},
            showDialog: false,
            search: '',
            items: json.announcments,
            headers: [
                {text: "", value: "action"},
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