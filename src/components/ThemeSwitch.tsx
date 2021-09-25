import { useState } from 'react'
import { Switch } from '@headlessui/react'
import useDarkMode from 'use-dark-mode'

function ThemeSwitch() {
  const { value, toggle } = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
  })

  return (
    <Switch
      checked={value}
      onChange={() => toggle()}
      className={`${
        value ? 'bg-background-dark' : 'bg-background'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span
        className={`${
          value ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-background dark:bg-background-dark rounded-full`}
      />
    </Switch>
  )
}

export default ThemeSwitch
