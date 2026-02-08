import { createContext, useContext, useRef, RefObject } from 'react'
import { FoodDetailsSheetRef } from '@/components/FoodDetailsSheet'

interface FoodDetailsSheetContextType {
  foodDetailsSheetRef?: RefObject<FoodDetailsSheetRef>
}

const FoodDetailsSheetContext = createContext<FoodDetailsSheetContextType | undefined>(undefined)

export const FoodDetailsSheetProvider: React.FC<{
  children: React.ReactNode
  foodDetailsSheetRef: RefObject<FoodDetailsSheetRef>
}> = ({ children, foodDetailsSheetRef }) => {
  return (
    <FoodDetailsSheetContext.Provider value={{ foodDetailsSheetRef }}>
      {children}
    </FoodDetailsSheetContext.Provider>
  )
}

export const useFoodDetailsSheet = () => {
  const context = useContext(FoodDetailsSheetContext)
  if (!context) {
    throw new Error('useFoodDetailsSheet must be used within FoodDetailsSheetProvider')
  }
  return context
}
