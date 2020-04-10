export function initCreateExt(designer, element, extStr) {
    let moddle = designer.get('moddle');
    let businessObject = element.businessObject;
    let analysis = moddle.create(extStr,{
        name: 123
    });
    analysis.set('expression', '<![CDATA[${toUser}]]>');
    let analysis2 = moddle.create(extStr,{
        name: 'project'
    });
    analysis2.set('string', '<![CDATA[${这是一封邮件}]]>');
    businessObject.extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
    businessObject.extensionElements.get('values').push(analysis, analysis2);
    console.log('businessObject123123', businessObject);

    // let modeling = that.designer.get('modeling');
    // let shape = that.designer.get('elementRegistry').get('StartEvent_1');
    // modeling.updateProperties(shape, {
    //     name: 'test',
    //     "flowable:formFieldValidation": true
    // });
}
function createField(moddle, nameValue, val, fieldString) {
    let analysis = moddle.create('flowable:field',{
        name: nameValue
    });
    analysis.set(fieldString, `<![CDATA[${val}]]>`);
    return analysis;
}
function getExtension(element, type) {
    if (!element.extensionElements) {
        return null;
    }

    return element.extensionElements.values.filter(function(e) {
        return e.$instanceOf(type);
    })[0];
}