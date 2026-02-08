import CardList from "@/components/CardList";
import HomeHeader from "@/components/HomeHeader";
import CustomInput from "@/components/ui/CustomInput";
import { CATEGORIES, images, offers } from "@/constants";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";

export default function Search() {
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        renderItem={({ item, index }) => <></>}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => {
          return (
            <View>
              <HomeHeader />

              <SearchBar />

              <Categories />
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
}
