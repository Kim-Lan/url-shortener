import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCopy, faTriangleExclamation);

const pinia = createPinia();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount('#app');
