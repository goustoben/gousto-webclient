async function selectOptionByText(selector, text, nightwatchCtx){
    this.waitForElementVisible(selector, 1000)
        .click(selector)

    this.elements('css selector', selector, function(optionsWdList) {
        optionsWdList.value.forEach(wdElm => {
            nightwatchCtx.api.elementIdText(wdElm.ELEMENT, currentOptionText => {
                if((typeof currentOptionText.value === 'string') && currentOptionText.value.startsWith(text)){
                    nightwatchCtx.api.elementIdClick(wdElm.ELEMENT)
                }   
            });
        })
    })

    return this
}

exports.command = selectOptionByText
