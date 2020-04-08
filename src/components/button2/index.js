import gldButton from './src/index.vue';

gldButton.install = Vue => {
    Vue.component(gldButton.name, gldButton);
}

export default gldButton;