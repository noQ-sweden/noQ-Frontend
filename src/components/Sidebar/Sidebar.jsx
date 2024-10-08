import React from 'react'
import { FaCog, FaUserAlt, FaSignOutAlt } from 'react-icons/fa'
import useLogin from './../../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import noQiconNoQRed from './../../assets/images/noQiconNoQRed.svg'
import noQiconNoQRedWhite from './../../assets/images/noQiconNoQRedWhite.svg'
import GetMenuItems from './GetMenuItems'

export default function Sidebar() {
  const navigate = useNavigate()
  const { login } = useLogin()

  // Lisa
  const colorSchemeUser1 = {
    iconColor: '#E04430',
    hoverColor: '#F7F6F5',
    logoSrc: noQiconNoQRed
  }

  // Tommy
  const colorSchemeUser2 = {
    iconColor: '#6B7280',
    hoverColor: '#E04430',
    iconHoverColor: '#FEF9ED',
    logoSrc: noQiconNoQRedWhite
  }

  // Select the correct color scheme based on user type
  const isUserLisa = login?.first_name?.toLowerCase() === 'lisa'
  const isUserTommy = login?.first_name?.toLowerCase() === 'tommy'
  const colors = isUserLisa ? colorSchemeUser1 : colorSchemeUser2

  const liStyle =
    'py-5 text-gray-500 hover:bg-gray-100 transition-colors duration-200 rounded-2xl'
  const liTextStyle = 'flex gap-4 pl-5 pr-5 text-l'

  const handleLogout = () => {
    localStorage.clear()
    navigate('/', { replace: true })
    window.location.reload()
  }

  const sidebarItemsTop = GetMenuItems(login.usergroups[0])

  const sidebarItemsBottom = [
    { icon: FaCog, label: 'Inställningar' },
    { icon: FaUserAlt, label: 'Användare' },
    { icon: FaSignOutAlt, label: 'Logga ut', action: handleLogout }
  ]

  return (
    <div className="flex flex-col text-white min-h-screen bg-white m-0 select-none w-64">
      <div
        className="items-center mt-4 mb-5 rounded-full"
        style={{ transition: 'background-color 0.3s ease' }}
        onMouseEnter={(e) => {
          if (isUserLisa) {
            e.currentTarget.style.backgroundColor = colors.hoverColor
          }
        }}
        onMouseLeave={(e) => {
          if (isUserLisa) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        <img
          src={colors.logoSrc}
          alt="noQ Logo"
          className="h-20 mx-auto w-auto"
          onClick={() => navigate('host', { replace: false })}
        />
      </div>
      <div className="align-top p-8">
        <ul>
          {sidebarItemsTop.map(({ icon: Icon, label, sideBarLink, action }) => (
            <div
              onClick={() => {
                if (action) {
                  action()
                } else if (sideBarLink) {
                  navigate(sideBarLink, { replace: false })
                }
              }}
              key={label}
            >
              <li
                className={liStyle}
                style={{ color: colors.iconColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverColor
                  if (isUserTommy) {
                    e.currentTarget.style.color = colors.iconHoverColor
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  if (isUserTommy) {
                    e.currentTarget.style.color = colors.iconColor
                  }
                }}
              >
                <span className={liTextStyle}>
                  <Icon size="25" />
                  {label}
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="align-bottom p-8">
        <ul>
          {sidebarItemsBottom.map(
            ({ icon: Icon, label, sideBarLink, action }) => (
              <div
                onClick={() => {
                  if (action) {
                    action()
                  } else if (sideBarLink) {
                    navigate(sideBarLink, { replace: false })
                  }
                }}
                key={label}
              >
                <li
                  className={liStyle}
                  style={{ color: colors.iconColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.hoverColor
                    if (isUserTommy) {
                      e.currentTarget.style.color = colors.iconHoverColor
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    if (isUserTommy) {
                      e.currentTarget.style.color = colors.iconColor
                    }
                  }}
                >
                  <span className={liTextStyle}>
                    <Icon size="25" />
                    {label}
                  </span>
                </li>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  )
}
