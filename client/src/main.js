'use strict'

/* IMPORT VUE */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './sass/main.sass'

/* CREATE VUE APP */
const app = createApp(App)

/* SETUP VUE */
app.use(router)

/* SETUP BASE COMPONENTS */
const baseComponents = require.context('./components', true, /Base[A-Z]\w+\.(vue|js)$/)
baseComponents.keys().forEach(fileName => {
  let baseComponentConfig = baseComponents(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  app.component(baseComponentName, baseComponentConfig)
})

/* MOUNT APP */
app.mount('#app')
