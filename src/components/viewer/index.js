import gldBpmnViewer from './src/index.vue';

gldBpmnViewer.install = Vue => {
    Vue.component(gldBpmnViewer.name, gldBpmnViewer);
}

export default gldBpmnViewer;