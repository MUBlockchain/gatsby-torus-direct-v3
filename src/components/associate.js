import React, { useState } from 'react'

const DEFAULT_ASSOCIATE_CONTEXT = {
    associateColor: null,
    setAssociateColor: null
  }
  
  export let AssociateContext = React.createContext(DEFAULT_ASSOCIATE_CONTEXT)

  export default function AssociateContextProvider({ children }) {
    const [associateColor, setAssociateColor] = useState('#c70000')

    const ctx = { associateColor, setAssociateColor }
    return <AssociateContext.Provider value={ctx}>{children}</AssociateContext.Provider>
  }