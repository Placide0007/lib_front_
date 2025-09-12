import { createApp } from 'vue'
import './app.css'
import App from './App.vue'
import 'typeface-poppins'
import 'typeface-nunito'
import 'typeface-montserrat'
import 'typeface-jetbrains-mono'
import 'typeface-inter'
import 'typeface-merienda'
import 'typeface-saira'
import 'typeface-caveat'
import 'typeface-dancing-script'
import router from './routes'


createApp(App).use(router).mount('#app')
