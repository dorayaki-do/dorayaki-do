import React, { useState } from "react"

export const UserContext = React.createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const userLoggedIn = (u) => setUser(u)
  const userLoggedOut = () => setUser(null)
  return (
    <UserContext.Provider
      value={{ user, userLoggedIn, userLoggedOut, setUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer
