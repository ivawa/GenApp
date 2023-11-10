//Это тут было предустановленно
import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import router from "@/router";

//Дичь
loadFonts()

//База
createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
