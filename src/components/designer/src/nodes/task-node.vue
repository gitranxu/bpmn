<template>
    <div class="task-node-card">
        节点名称：<input type="text" :value="nodeName" @input="nameChange"><br>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nodeName: ''
        }
    },
    created() {
        this.nodeName = this.element.businessObject.name;
    },
    props: ['element', 'designerInstance'],
    watch: {
        'element.businessObject.name': {
            handler(val) {
                //console.log('val', val)
                this.nodeName = val;
            }
        }
    },
    methods: {
        // 属性面板名称，更新回流程节点
        nameChange(name) {
            const modeling = this.designerInstance.get("modeling");
            //console.log('modeling', modeling);
            modeling.updateLabel(this.element, name.target.value);
        },
    },
}
</script>