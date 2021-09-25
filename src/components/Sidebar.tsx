import { Switch } from '@headlessui/react'
import TraitMenu from './TraitMenu'
import { useContext } from 'react'
import { RarityModeContext } from './RarityModeContext'

const Sidebar: React.FC = () => {
  return (
    <div className="hidden h-full overflow-auto lg:flex flex-col items-center bg-gray-200">
      <div className="w-5/6">
        <RarityMode />
        <TraitMenu />
      </div>
    </div>
  )
}

export default Sidebar

export const RarityMode: React.FC = () => {
  const { toggle, normalized } = useContext(RarityModeContext)
  return (
    <div className="flex w-full items-center mt-3 gap-3 justify-between">
      <div className="text-gray-700 text-sm leading-tight">
        Trait normalization
      </div>
      <Switch
        checked={normalized}
        onChange={() => toggle()}
        className={`${normalized ? 'bg-blue-400' : 'bg-gray-400'}
          mr-3 relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${normalized ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  )
}
