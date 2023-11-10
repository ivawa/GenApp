//Тут импортируем руты
import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Characters from "@/views/Characters.vue";
import Character_ids from "@/views/Character_ids.vue"
import Mycharacters from "@/views/Mycharacters.vue";

//Пошла жара

const routes = [
    {path:'/', name: 'Home', component: Home},
    {path:'/about', name: 'About', component: About},
    {path:'/characters', name: 'Characters', component: Characters},
    {path:'/characters/:name/:id', name: 'Character_ids', component: Character_ids, props: true},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router