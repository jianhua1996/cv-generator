import { markRaw } from 'vue';
import CHeader1 from './c-header1.vue';
import CHeader2 from './c-header2.vue';

const compoDesList = [
  {
    name: 'CHeader1',
    compo: markRaw(CHeader1),
    compoStates: {}
  },
  {
    name: 'CHeader2',
    compo: markRaw(CHeader2),
    compoStates: {}
  }
];

export default compoDesList;
