<template>
    <div class="gld-bpmn-designer">
        <div class="js-canvas"></div>
        <div class="js-properties-panel">
            <!-- 用来展示属性相关信息 -->
        </div>
        <node-card
            :designer-instance="designer"></node-card>
    </div>
</template>
<script>
import bpmnDefault from './default';
import flowableModdleDescriptor from './moddleExtensions.json';
import nodeCard from './nodes/index';

export default {
    name: 'gldBpmnDesigner',
    mounted() {
        let container = this.$el.querySelector('.js-canvas');
        let propertiesPanel = this.$el.querySelector('.js-properties-panel');
        //console.log('container', container);
        this.designer = new this.BpmnDesigner({
            container: container,
            moddleExtensions: {
                flowable: flowableModdleDescriptor
            }
        });
        this.renderXML(this.xml);

        let that = this;
        that.designer.on('element.click', function(event) {
            //console.log('event', event)
            that.element = event.element;
        });
        // $('.btn1').click(function() {
        //     that.designer.saveXML({ format: true }, function(err, xml) {
        //         let xml1 = xml.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
        //         console.log(xml1)

        //     });
        // });
        $('.btn2').click(function() {
            let moddle = that.designer.get('moddle');
            console.log('moddle', moddle)
            let businessObject = that.element.businessObject;
            let analysis = that.getExtension(businessObject, 'flowable:field');
            if(!analysis) {
                analysis = moddle.create('flowable:field',{
                    name: 123
                });
                analysis.set('expression', '<![CDATA[${toUser}]]>');
                analysis.set('string', '<![CDATA[${这是一封邮件}]]>');
                //analysis.set('name', 444);
                //let analysis2 = moddle.create('flowable:string');
                //let analysis3 = moddle.create('flowable:expression');
                //analysis.get('values').push(analysis2);
                //console.log('analysis',analysis.get('values'));
                //analysis2.$parent = analysis;
                //analysis3.get('abc').push('<![CDATA[${toUser}]]>');
                //analysis3.set('abc','123asdfasdf');
                //analysis.get('values').push(analysis2, analysis3);
                businessObject.extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
                businessObject.extensionElements.get('values').push(analysis);
            }
            console.log('businessObject', businessObject);


            let modeling = that.designer.get('modeling');
            let shape = that.designer.get('elementRegistry').get('StartEvent_1');
            modeling.updateProperties(shape, {
                name: 'test',
                "flowable:formFieldValidation": true
            });
        });

    },
    data() {
        return {
            designer: null,
            element: null
        }
    },
    props: {
        BpmnDesigner: {
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
    components: {
        nodeCard
    },
    methods: {
        getExtension(element, type) {
            if (!element.extensionElements) {
                return null;
            }

            return element.extensionElements.values.filter(function(e) {
                return e.$instanceOf(type);
            })[0];
        },
        renderXML(xml) {
            if(!xml) {
                console.log('请传递一个合法的xml', xml);
                return;
            }
            this.designer.importXML(xml, err => {
                if(!err) {
                    console.log('success!');
                    this.designer.get('canvas').zoom('fit-viewport');
                }else {
                    console.log('something went wrong:', err);
                }
            });
        }
    },
}
</script>
<style lang="sass">
.gld-bpmn-designer, .js-canvas{
    height: 100%;
    width: 100%;
}
.js-properties-panel{
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>