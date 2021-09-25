import config from '../rarityConfig'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import openSea from '../opensea.svg'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="flex items-center w-full shadow-2xl justify-between">
      <div className="h-full flex items-center">
        <Link to="/">
          <h1 className="text-2xl ml-5" style={{ ...config.headerTextStyle }}>
            {config.headerText}
          </h1>
        </Link>

        {config.logoURL ? (
          <Link to="/" className="h-full">
            <img
              src={config.logoURL}
              alt="logo"
              className="ml-5 h-full"
              style={{
                ...config.logoStyle,
              }}
            />
          </Link>
        ) : null}
      </div>

      <div>
        <ProjectLinks />
      </div>
    </header>
  )
}

export default Header

const ProjectLinks: React.FC = () => {
  if (!config.links) return null
  return (
    <div className="flex items-center gap-3 text-sm mr-6 text-gray-700">
      {config.links.website ? <a href={config.links.website}>Website</a> : null}
      {config.links.twitter ? (
        <a href={config.links.twitter}>
          <FaTwitter className="h-4 w-4" />
        </a>
      ) : null}
      {config.links.discord ? (
        <a href={config.links.discord}>
          <FaDiscord className="h-4 w-4" />
        </a>
      ) : null}
      {config.links.openSea ? (
        <a href={config.links.openSea}>
          <img className="h-4 w-4" src={openSea} alt="OpenSea logo" />
        </a>
      ) : null}
      {config.links.etherscan ? (
        <a href={config.links.etherscan}>Etherscan</a>
      ) : null}
    </div>
  )
}
