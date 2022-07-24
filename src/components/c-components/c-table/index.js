import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: 'CTable',
  compo: markRaw(Compo),
  compoStates: {}
};
