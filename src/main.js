import { createApp, defineAsyncComponent } from 'vue';
import store from './store/index.js';
import App from './App.vue';
import router from './router.js';
// import BaseCard from './components/ui/BaseCard.vue';
// import BaseButton from './components/ui/BaseButton.vue';
// import BaseBadge from './components/ui/BaseBadge.vue';
// import BaseSpinner from './components/ui/BaseSpinner.vue';
// import BaseDialog from './components/ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/ui/BaseDialog.vue')
);
const BaseCard = defineAsyncComponent(() =>
  import('./components/ui/BaseCard.vue')
);
const BaseButton = defineAsyncComponent(() =>
  import('./components/ui/BaseButton.vue')
);
const BaseBadge = defineAsyncComponent(() =>
  import('./components/ui/BaseBadge.vue')
);
const BaseSpinner = defineAsyncComponent(() =>
  import('./components/ui/BaseSpinner.vue')
);

const app = createApp(App);
app.use(router);
app.use(store);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
