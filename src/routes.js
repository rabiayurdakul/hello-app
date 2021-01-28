import UserList from "@/components/users/UserList";
import TeamList from "@/components/teams/TeamList";
import AnnouncementList from "@/components/AnnouncementList";
import UserDetail from "@/components/users/UserDetail";
import UserStart from "@/components/users/UserStart";
//import DataListComponent from "@/components/dataList/DataListComponent";
import DynamicList from "@/components/dataList/DynamicList";
import AnnounceComp from "@/pages/AnnounceComp";
import UserComp from "@/pages/UserComp";
export const routes=[

    {path: '/user', component: UserList,

        children: [
            { path: '', component: UserStart },
            {path: ':id', component: UserDetail}

        ]},
    {path: '/team', component: TeamList, children: [
            //{path: '', component: DataListComponent},
          /*  {path: '/dynamicList', component: DynamicList},*/
            {path: '/userComp', component: UserComp},
            {path: '/announceComp', component: AnnounceComp}

            ]},
    {path: '/announce', component: AnnouncementList},
    {path: '/announceComp', component: AnnounceComp, children: [
            {path: '', component: DynamicList}
        ]},
    {path: '/userComp', component: UserComp, children: [
            {path: '', component: DynamicList}
        ]}
  //  {path: '/userDetail', component: UserDetail},


]
