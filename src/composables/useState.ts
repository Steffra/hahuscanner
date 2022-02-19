import { readonly, ref } from 'vue'

export const useState = (initialState: any): any => {
    const state = ref(initialState)
    const setState = (newState: boolean) => {
        state.value = newState
    }

    return [readonly(state), setState]
}
