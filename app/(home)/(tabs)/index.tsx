import CardList from "@/components/CardList";
import HomeHeader from "@/components/HomeHeader";
import { offers } from "@/constants";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        renderItem={({ item, index }) => <CardList item={item} index={index} />}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => <HomeHeader />}
      />
    </SafeAreaView>
  );
}
