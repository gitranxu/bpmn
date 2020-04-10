<template>
    <div class="start-node-card">
        节点名称：<input type="text" :value="nodeName" @input="nameChange">
        <div @click="console">打印</div>
        书写内容：<input type="text" :value="text" @input="textChange">
        <el-button>abc</el-button>
    </div>
</template>
<script>
import { initCreateExt } from 'components/util'
export default {
    data() {
        return {
            nodeName: '',
            text: ''
        }
    },
    created() {
        this.nodeName = this.element.businessObject.name;
        this.init();
        this.text = this.element.businessObject.extensionElements.values[0].string;
        console.log('this.element', this.element)
    },
    props: ['element', 'designerInstance'],
    methods: {
        init() {
            initCreateExt(this.designerInstance, this.element, 'flowable:field');
        },
        console() {
            this.designerInstance.saveXML({ format: true }, function(err, xml) {
                let xml1 = xml.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
                console.log(xml1)

            });
        },
        // 属性面板名称，更新回流程节点
        nameChange(name) {
            const modeling = this.designerInstance.get("modeling");
            console.log('modeling', modeling);
            modeling.updateLabel(this.element, name.target.value);
        },
        textChange(ele) {
            // this.updateProperties({
            //     string: ele.target.value
            // });
            this.element.businessObject.extensionElements.values[0].string = ele.target.value;
        },
        // 在这里我们封装一个通用的更新节点属性的方法
        updateProperties(properties) {
            const modeling = this.designerInstance.get("modeling");
            console.log('aaaa', modeling);
        }
    },
}
</script>