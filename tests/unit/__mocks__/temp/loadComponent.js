import { defineAsyncComponent } from 'vue'

export function loadComponent(file) {
  try {
    return defineAsyncComponent(() => import('./test-component.vue'))
  } catch (err) {
    console.log(err)
  }
}

export function loadComponentAsString(file) {
  try {
    return import('./test-component.text.vue?raw')
  } catch (err) {
    console.log(err)
  }
}
