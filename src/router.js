import { createRouter, createWebHistory} from 'vue-router'

import TeamsListVue from './pages/TeamsList.vue';
import UsersListVue from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamFooter from './pages/TeamFooter.vue'
import UserFooter from './pages/UserFooter.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams'},
        { name: 'teams',
            path: '/teams', 
            meta: {needsAuth: true},
            components: {default: TeamsListVue,
            footer: TeamFooter},
         children: [
            {name: 'team-members', path: ':teamId', component: TeamMembers, props: true},
         ]
        },
        { path: '/users', 
          components: {
            default: UsersListVue, 
            footer: UserFooter
        },
        beforeEnter(to, from, next){
            console.log('users beforeEnter');
            console.log(to, from);
            next()
        }
     },
        
        { path: '/:notFound(.*)', component: NotFound}
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition){
        // console.log(to, from, savedPosition)
        if(savedPosition){
            return savedPosition
        }
        return {left: 0, top: 0};
    }
});
router.beforeEach(function(to, from, next){
    console.log('Global beforeEach');
    console.log(to, from);
    if(to.meta.needsAuth){
        console.log('Needs auth')
            next()
        
    }else{
        next()
    }
    // next()
    // if(to.name === 'team-members'){
    //     next();
    // }else{
    //     next({name:'team-members', params: {teamId: 't2'}})
    // }
});
router.afterEach(function(to, from){
    // sending analytics data to the server
    console.log('Global afterEach');
    console.log(to, from)
});

export default router;

