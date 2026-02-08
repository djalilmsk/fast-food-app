import CustomInput from "@/components/ui/CustomInput"
import { images } from "@/constants"
import { View } from "react-native"

function SearchBar() {
  return (
    <View>
      <CustomInput
        placeholder='Search for any food...'
        rightIcon={images.search}
        variant='primary'
      />
    </View>
  )
}

export default SearchBar
