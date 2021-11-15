import { setTutorialVisible } from "actions/tutorial/setTutorialVisible"

export const shouldJfyTutorialBeVisible = () => (
    (dispatch, getState) => {
        const {menuCollections, tutorial} = getState()

        const cfyCollectionLoaded = menuCollections.find(
            collection => collection.get('slug') === 'recommendations'
        )

        const tutorialNameIsCFY = cfyCollectionLoaded && cfyCollectionLoaded.getIn(['properties', 'tutorial'])

        const jfyTutorialSeen = Boolean(tutorial && tutorial.getIn(['viewed', 'justforyou']))
        let shouldTutorialBeVisible = false

        if (tutorialNameIsCFY === 'jfy' && !jfyTutorialSeen) {
            shouldTutorialBeVisible = true
        }

        setTutorialVisible('justforyou', shouldTutorialBeVisible)(dispatch)
    }
)
