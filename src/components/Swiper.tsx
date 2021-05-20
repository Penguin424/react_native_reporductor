import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Pressable,
  Animated,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

interface IDataCardsSwiper {
  text: string;
  color: string;
}

const CardInSwiper = ({
  text,
  color,
}: {
  text: string;
  color: string;
}): JSX.Element => {
  const navigation = useNavigation();

  const handleNavigationTo = () => {
    navigation.navigate("/clases");
  };

  return (
    <Pressable
      onPress={handleNavigationTo}
      style={{ ...styles.caja, backgroundColor: color }}
    >
      <Image
        source={{
          uri: text,
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

const Swiper = () => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const data: IDataCardsSwiper[] = [
    {
      color: "#BFE3ED",
      text:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA9nUo3iGn3tH8rm6CGNQjZWA7EUOph2K_d2fNvw0fTTaf9SdTkCC1yqMC9dRh5uzpG9c&usqp=CAU",
    },
    {
      color: "#BFE3ED",

      text:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4FpOg4S-SJuc3NmchTa6I1KqJW7-5RIqlxTsLdBjol4psKnAlAq7xwFn0Ku6qp5ibLM&usqp=CAU",
    },
    {
      color: "#BFE3ED",
      text:
        "https://enlinea.santotomas.cl/wp-content/uploads/sites/2/2020/10/Perros-mestizos.jpg",
    },
  ];

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: IDataCardsSwiper }) => {
          return <CardInSwiper color={item.color} text={item.text} />;
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />

      <View style={styles.dotView}>
        {data.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 10,
                width: 10,
                backgroundColor: "#595959",
                margin: 8,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caja: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    // flex: 25,
  },
});

export default Swiper;
