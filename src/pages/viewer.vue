<template>
    <div class="test">
        aaaa
        <gld-bpmn-viewer
            :xml="xml"
            :bpmn-viewer="BpmnViewer"></gld-bpmn-viewer>
    </div>
</template>
<script>
import gldBpmnViewer from 'components/viewer';
import Viewer from 'bpmn-js';
import testXML from './qr-code';
export default {
    created() {
        setTimeout(() => {
            console.log('-----here....');
            this.xml = testXML;
        }, 2000);
    },
    data() {
        return {
            xml: '',
            BpmnViewer: Viewer
        }
    },
    components: {
        gldBpmnViewer
    }
}
</script>
<style lang="sass">
.test{
    height: 400px;
}
</style>