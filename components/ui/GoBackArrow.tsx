import { images } from "@/constants"
import { router } from "expo-router"
import { TouchableOpacity, View, Image } from "react-native"

function GoBackArrow() {
  return (
    <TouchableOpacity onPress={() => { router.back() }} >
      <View className="items-center justify-center">
        <Image source={images.arrowBack} className='h-6 w-6' style={{ tintColor: '#000' }} />
      </View>
    </TouchableOpacity>
  )
}

export default GoBackArrow
