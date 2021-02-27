export function loadComponent (file) {
  try {
    return import('./test-component.vue').then(component => component.default);
  } catch (err) {
    console.log(err);
  }
}

export function loadComponentAsString (file) {
  try {
    return import('./test-component.text.vue').then(component => component.default);
  } catch (err) {
    console.log(err);
  }
}
