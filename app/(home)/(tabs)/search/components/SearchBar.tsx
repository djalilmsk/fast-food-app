import CustomInput from "@/components/ui/CustomInput"
import { images } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import z from "zod"
import { useDebounce } from "@/lib/useDebounce"

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

  const handleSearchChange = useCallback((value: string) => {
    router.setParams({ search: value })
  }, [router])

  const debouncedSearch = useDebounce(handleSearchChange, 500)

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
              debouncedSearch(text)
            }}
            error={errors.name?.message}
          />
        )}
      />
    </View>
  )
}

export default SearchBar
