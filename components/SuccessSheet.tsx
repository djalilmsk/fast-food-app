import { Image, Text, View } from "react-native"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import success from "@/assets/images/success.png"
import CustomButton from "./ui/CustomButton"
import { router } from "expo-router"

export type SuccessSheetRef = {
  open: () => void
  close: () => void
  setMessage?: (title: string, subtitle: string) => void
}

interface SuccessSheetProps {
  title?: string
  subtitle?: string
}

const SuccessSheet = forwardRef<SuccessSheetRef, SuccessSheetProps>(({
  title = "Login Successful!",
  subtitle = "You're all set to continue where you left off."
}, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [messageTitle, setMessageTitle] = useState(title)
  const [messageSubtitle, setMessageSubtitle] = useState(subtitle)

  const snapPoints = useMemo(() => ["1%", "50%"], [])

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.snapToIndex(1),
    close: () => bottomSheetRef.current?.close(),
    setMessage: (newTitle: string, newSubtitle: string) => {
      setMessageTitle(newTitle)
      setMessageSubtitle(newSubtitle)
    }
  }))


  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        pressBehavior="none"
      />
    ),
    []
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      enableDynamicSizing={false}
      enableOverDrag={false}
      handleIndicatorStyle={{ backgroundColor: '#E5E7EB', width: 40, height: 4 }}
      backgroundStyle={{ borderRadius: 20 }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="pt-10 px-6">
        <Image source={success} className='h-44 self-center mb-5' resizeMode='contain' />
        <Text className="text-center text-2xl font-quicksand-semibold">{messageTitle}</Text>
        <Text className="text-center text-base font-quicksand-regular mt-2">{messageSubtitle}</Text>
        <CustomButton title="Go to Home Page" className="mt-10" onPress={() => {
          bottomSheetRef.current?.close()
          router.replace('/')
        }} />
      </BottomSheetView>
    </BottomSheet>
  )
})

SuccessSheet.displayName = 'SuccessSheet'

export default SuccessSheet