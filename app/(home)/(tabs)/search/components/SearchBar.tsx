import CustomInput from "@/components/ui/CustomInput"
import { images } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import z from "zod"

const search = z.object({
  name: z.string()
})

function SearchBar() {
  const router = useRouter()
  const { formState: { errors }, control } = useForm<z.infer<typeof search>>({
    resolver: zodResolver(search),
    defaultValues: {
      name: '',
    }
  })

  const handleSearchChange = (value: string) => {
    router.setParams({ search: value })
  }

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <CustomInput
            placeholder='Search for any food...'
            rightIcon={images.search}
            variant='primary'
            label='Search'
            value={value}
            onChangeText={(text) => {
              onChange(text)
              handleSearchChange(text)
            }}
            error={errors.name?.message}
          />
        )}
      />
    </View>
  )
}

export default SearchBar
