import { create } from 'zustand'

type State = {
  count: number
  increment: () => void
  decrement: () => void
}

type TCatStoreState = {
  cats: {
    bigCats: number,
    smallCats: number
  }
}

export const useBearStore = create<State>()((set) => ({
  count: 0,
  increment: () => set((state) => {
    if(state.count === 10) {
      return { count: 0 }
    }
    return { count: state.count + 1 }
  }),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))



/** 修改嵌套的 state， 并且将转态操作和状态本身分离 */
export const useCatsStore = create<TCatStoreState>()(() => ({
  cats: {
    bigCats: 0,
    smallCats: 0
  }
}))

export const incBigCats = () => useCatsStore.setState((state) => {
  return { cats: { ...state.cats, bigCats: state.cats.bigCats + 1 } }
})

export const incSmallCats = () => useCatsStore.setState((state) => {
  return { cats: { ...state.cats, smallCats: state.cats.smallCats + 1 } }
})

export const decBigCats = () => useCatsStore.setState((state) => {
  return { cats: { ...state.cats, bigCats: state.cats.bigCats - 1 } }
})

export const decSmallCats = () => useCatsStore.setState((state) => {
  return { cats: { ...state.cats, smallCats: state.cats.smallCats - 1 } }
})