import { store } from '@/store/'

const install = (vue) => {
	vue.prototype.storeCommit = (type, data = {}) => {
		store.commit(type, data)
	}
}

export { install as default }
