import HomeHeader from "@/components/HomeHeader";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import useGetFood from "@/services/food/useGetFood";
import FoodCard from "./components/FoodCard";

export default function Search() {
  const { data: foods, isLoading } = useGetFood()
  console.log(foods)

  return (
    <SafeAreaView className="flex-1">
      <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
        <HomeHeader />
        <SearchBar />
        <Categories />
      </View>
      <FlatList
        data={foods}
        renderItem={({ item }) => <FoodCard food={item} />}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  );
}
