import gldBpmnDesigner from './src/index.vue';

gldBpmnDesigner.install = Vue => {
    Vue.component(gldBpmnDesigner.name, gldBpmnDesigner);
}

export default gldBpmnDesigner;