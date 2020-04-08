import gldButton from './button/index.js';
import gldButton2 from './button2/index.js';
import gldBpmnViewer from './viewer/index.js';

const components = [
    gldButton,
    gldButton2,
    gldBpmnViewer
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    gldButton,
    gldButton2,
    gldBpmnViewer
}