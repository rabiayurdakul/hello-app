import UserList from "@/components/users/UserList";
import TeamList from "@/components/teams/TeamList";
import AnnouncementList from "@/components/AnnouncementList";
import UserDetail from "@/components/users/UserDetail";
import UserStart from "@/components/users/UserStart";
//import DataListComponent from "@/components/dataList/DataListComponent";
import DynamicList from "@/components/dataList/DynamicList";
export const routes=[

    {path: '/user', component: UserList,

        children: [
            { path: '', component: UserStart },
            {path: ':id', component: UserDetail}

        ]},
    {path: '/team', component: TeamList, children: [
            //{path: '', component: DataListComponent},
            {path: '/dynamicList', component: DynamicList}

            ]},
    {path: '/announce', component: AnnouncementList},
  //  {path: '/userDetail', component: UserDetail},


]
