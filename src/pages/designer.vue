<template>
    <div class="bbb">
        bbb
        <gld-bpmn-designer
            :bpmn-designer="designer"></gld-bpmn-designer>
    </div>
</template>
<script>
import gldBpmnDesigner from 'components/designer';
import designer from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
export default {
    data() {
        return {
            designer
        }
    },
    components: {
        gldBpmnDesigner
    }
}
</script>
<style>
.bbb{
    height: 700px;
}
</style>