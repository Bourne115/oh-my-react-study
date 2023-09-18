import './App.scss'

interface IState {
  visibility: string
  setVisibility: (type: string) => {}
}
export default function todoFilter({ visibility, setVisibility}: IState) {
  return (
    <div>
      <ul className="filters">
        <li>
          <button
            className={visibility === 'all' ? 'selected' : ''}
            onClick={() => setVisibility('all')}
          >
            All
          </button>
          <button
            className={visibility === 'active' ? 'selected' : ''}
            onClick={() => setVisibility('active')}
          >
            Active
          </button>
          <button
            className={visibility === 'completed' ? 'selected' : ''}
            onClick={() => setVisibility('button')}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  )
}
