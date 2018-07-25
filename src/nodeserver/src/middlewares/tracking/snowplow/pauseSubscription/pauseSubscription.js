import seActions from './seActions'
import seRecoveryAttemptTypesByModalType from './seRecoveryAttemptTypesByModalType'

const seCategory = 'PauseSubscription'

function pauseAttempt(action) {
	return {
		type: seActions.SUBSCRIPTION_PAUSE_ATTEMPT,
		data: action.metaData,
		seCategory,
	}
}

function startModalViewed() {
	return {
		type: seActions.START_MODAL_VIEWED,
		seCategory,
	}
}

function reasonCategoryModalViewed() {
	return {
		type: seActions.REASON_CATEGORY_MODAL_VIEWED,
		seCategory,
	}
}

function reasonCategorySelected(action) {
	return {
		type: seActions.REASON_CATEGORY_SELECTED,
		data: { selected_category: action.selectedCategory },
		seCategory,
	}
}

function reasonListModalViewed(action) {
	return {
		type: seActions.REASON_LIST_MODAL_VIEWED,
		data: { selected_category: action.selectedCategory },
		seCategory,
	}
}

function reasonSelected(action) {
	return {
		type: seActions.REASON_SELECTED,
		data: { reason: action.selectedReason },
		seCategory,
	}
}

function recoveryAttemptModalViewed(action) {
	return {
		type: seActions.RECOVERY_ATTEMPT_MODAL_VIEWED,
		data: { recovery_attempt_type: seRecoveryAttemptTypesByModalType[action.modalType] },
		seCategory,
	}
}

function subscriptionKeptActive(action) {
	const seRecoveryType = action.seRecoveryType || seRecoveryAttemptTypesByModalType[action.modalType]
	let seModal = action.seModal
	if (!seModal) {
		switch (action.modalType) {
			case 'startOsr':
				seModal = 'StartModal'
				break
			case 'copy':
			case 'contact':
			case 'promo':
			case 'quote':
			case 'skipBox':
			case 'changeDeliveryDate':
			case 'quoteSkipNext':
				seModal = 'RecoveryAttemptModal'
				break
			case 'recovered':
			case 'recoveredPromo':
			case 'recoveredSkipped':
				seModal = 'EndModal'
				break
			case 'other':
				seModal = 'OtherModal'
				break
			case 'categories':
				seModal = 'ReasonCategoryModal'
				break
			case 'reasons':
				seModal = 'ReasonListModal'
				break
			default:
				seModal = action.modalType
		}
	}

	return {
		type: seActions.SUBSCRIPTION_KEPT_ACTIVE,
		data: {
			reason_category: action.categorySlug,
			reason: action.reasonSlug,
			recovery_attempt_type: seRecoveryType,
			recovery_attempt_value: action.promoCode,
			modal: seModal,
		},
		seCategory,
	}
}

function subscriptionPaused(action) {
	return {
		type: seActions.SUBSCRIPTION_PAUSED,
		data: {
			reason: action.reason,
			recovery_attempt_type: seRecoveryAttemptTypesByModalType[action.modalType],
		},
		seCategory,
	}
}

function endModalViewed() {
	return {
		type: seActions.END_MODAL_VIEWED,
		seCategory,
	}
}

export {
	pauseAttempt,
	startModalViewed,
	reasonCategoryModalViewed,
	reasonCategorySelected,
	reasonListModalViewed,
	reasonSelected,
	recoveryAttemptModalViewed,
	subscriptionKeptActive,
	subscriptionPaused,
	endModalViewed,
}
