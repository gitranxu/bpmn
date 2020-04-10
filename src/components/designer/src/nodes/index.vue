<template>
    <div class="node-card" v-show="!isNodeShow('bpmn:Process')">
        <start-node 
            v-if="isNodeShow('bpmn:StartEvent')"
            :designer-instance="designerInstance"
            :element="element"></start-node>
        <task-node 
            v-if="isNodeShow('bpmn:Task')"
            :designer-instance="designerInstance"
            :element="element"></task-node>
        <end-node 
            v-if="isNodeShow('bpmn:EndEvent')"
            :designer-instance="designerInstance"
            :element="element"></end-node>
    </div>
</template>
<script>
import startNode from './start-node';
import taskNode from './task-node';
import endNode from './end-node';
export default {
    data() {
        return {
            element: null
        }
    },
    props: {
        designerInstance: {
            type: Object
        },
    },
    watch: {
        designerInstance(val) {
            //console.log('val', val);
            this.addEvents();
        }
    },
    components: {
        startNode,
        taskNode,
        endNode,
    },
    methods: {
        isNodeShow(nodeType) {
            if(this.element) {
                return this.element.type == nodeType;
            }
            return false;
        },
        addEvents() {
            let that = this;
            console.log('123123123123');
            this.designerInstance.on('element.click', function(event) {
                console.log('event', event)
                that.element = event.element;
            });
        }
    },
}
</script>
<style lang="scss">
.node-card{
    padding: 10px;
    background: #3212fe;
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>