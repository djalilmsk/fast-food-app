import CustomButton from "@/components/ui/CustomButton"
import { images } from "@/constants"
import useLogout from "@/services/auth/useLogout"
import { router } from "expo-router"
import { View } from "react-native"

function ProfileFooter() {
  const { mutate: logout, isPending } = useLogout()

  return (
    <View className="mt-10 flex-col gap-5">
      <CustomButton title="Edit Profile" variant="secondary" onPress={() => { router.push("/edit-profile/edit") }} />
      <CustomButton title="Logout" variant="secondary destructive" icon={images.logout} onPress={() => { logout() }} loading={isPending} disabled={isPending} />
    </View>
  )
}

export default ProfileFooter
