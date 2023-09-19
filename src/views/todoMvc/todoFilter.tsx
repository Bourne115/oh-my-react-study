import { useDispatch, useSelector } from "react-redux"
import { setVisibility } from "../../store/visibilitySlice"
import VisibilityFilters from "../../constants/VisibilityFilters"

import "./todoFilter.scss"

export default function TodoFilter() {
  const visibility = useSelector((state: any) => state.visibility)
  const getSelectedClass = (filter: string) =>
    visibility === filter ? "selected" : ""
  const dispatch = useDispatch()
  const setVisibilityFilter = (filter: string) =>
    dispatch(setVisibility(filter))

  return (
    <div className="filter-wrapper">
      <button
        className={getSelectedClass(VisibilityFilters.SHOW_ALL)}
        onClick={() => setVisibilityFilter(VisibilityFilters.SHOW_ALL)}
      >
        All
      </button>
      <button
        className={getSelectedClass(VisibilityFilters.SHOW_ACTIVE)}
        onClick={() => setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE)}
      >
        Active
      </button>
      <button
        className={getSelectedClass(VisibilityFilters.SHOW_COMPLETED)}
        onClick={() => setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED)}
      >
        Completed
      </button>
    </div>
  )
}
