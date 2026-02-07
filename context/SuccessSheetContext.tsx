import React, { createContext, useContext, RefObject } from 'react'
import { SuccessSheetRef } from '@/components/SuccessSheet'

interface SuccessSheetContextType {
  successSheetRef?: RefObject<SuccessSheetRef>
}

const SuccessSheetContext = createContext<SuccessSheetContextType | undefined>(undefined)

export const SuccessSheetProvider: React.FC<{
  children: React.ReactNode
  successSheetRef: RefObject<SuccessSheetRef>
}> = ({ children, successSheetRef }) => {
  return (
    <SuccessSheetContext.Provider value={{ successSheetRef }}>
      {children}
    </SuccessSheetContext.Provider>
  )
}

export const useSuccessSheet = () => {
  const context = useContext(SuccessSheetContext)
  if (!context) {
    throw new Error('useSuccessSheet must be used within SuccessSheetProvider')
  }
  return context
}
