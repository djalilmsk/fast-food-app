import HomeHeader from "@/components/HomeHeader";
import { FlatList, Text, View, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import useGetFood from "@/services/food/useGetFood";
import FoodCard from "./components/FoodCard";
import { images } from "@/constants";

export default function Search() {
  const { data: foods, isLoading } = useGetFood()
  const isEmpty = !foods || foods.length === 0

  return (
    <SafeAreaView className="flex-1">
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <HomeHeader />
        <SearchBar />
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FF8C00" />
        </View>
      ) : isEmpty ? (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 60 }}>
          <Image source={images.emptyState} style={{ width: 150 * 1.4, height: 120 * 1.4, marginBottom: 20 }} />
          <Text className="font-quicksand-bold pb-4" style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>
            Nothing matched your search
          </Text>
          <Text className="font-quicksand-medium" style={{ fontSize: 15, color: '#999', textAlign: 'center' }}>
            Try a different search term or check for typos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          renderItem={({ item }) => <FoodCard food={item} />}
          contentContainerClassName="pb-28 px-5"
          ListHeaderComponent={() => <Categories />}
          ListEmptyComponent={
            <View style={{ paddingVertical: 40, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#999' }}>No foods found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
