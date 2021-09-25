import { createContext, useState } from 'react'

interface RarityMode {
  normalized: boolean
  toggle: () => void
}

export const RarityModeContext = createContext<RarityMode>({
  normalized: true,
  toggle: () => {},
})

interface RarityModeProviderProps {
  children: React.ReactNode
}

export const RarityModeProvider: React.FC<RarityModeProviderProps> = ({
  children,
}) => {
  const [normalized, setNormalized] = useState(true)
  const toggle = () => setNormalized((n) => !n)
  return (
    <RarityModeContext.Provider value={{ normalized, toggle }}>
      {children}
    </RarityModeContext.Provider>
  )
}
