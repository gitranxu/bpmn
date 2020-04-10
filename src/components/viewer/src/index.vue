<template>
    <div class="gld-bpmn-viewer"></div>
</template>
<script>
import bpmnDefault from './default';
//import BpmnViewer from 'bpmn-js';
export default {
    name: 'gldBpmnViewer',
    mounted() {
        let container = this.$el;
        this.viewer = new this.BpmnViewer({
            container: container
        });
        this.renderXML(this.xml);
    },
    data() {
        return {
            viewer: null
        }
    },
    props: {
        BpmnViewer: {
            type: Function
        },
        xml: {
            type: String,
            default() {
                console.log('如果未传值则使用默认值...')
                return bpmnDefault;
            }
        }
    },
    watch: {
        xml(newVal) {
            this.renderXML(newVal);
        }
    },
    methods: {
        renderXML(xml) {
            if(!xml) {
                console.log('请传递一个合法的xml', xml);
                return;
            }
            this.viewer.importXML(xml, err => {
                if(!err) {
                    console.log('success!');
                    this.viewer.get('canvas').zoom('fit-viewport');
                }else {
                    console.log('something went wrong:', err);
                }
            });
        }
    },
}
</script>
<style lang="sass">
.gld-bpmn-viewer{
    height: 100%;
    width: 100%;
}
</style>