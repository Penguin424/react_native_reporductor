import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    position: "absolute",
    width: width,
    height: height / 3,
  },
  containerVideo: {
    // position: "absolute",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangulo: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  buttonsMediaPlayers: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

const Clases = () => {
  const [isPause, setIsPause] = useState<boolean>(false);
  const [isViewButtons, setIsViewButtons] = useState<boolean>(true);

  const video = React.useRef<Video>(null);

  const handlePlayPause = async () => {
    if (isPause) {
      setIsPause(!isPause);
      video.current?.pauseAsync();
    } else {
      setIsPause(!isPause);
      setIsViewButtons(false);
      video.current?.playAsync();
    }
  };

  const handleTouchMedia = () => {
    setIsViewButtons(!isViewButtons);
  };

  const handleRowLeft = async () => {
    let statusVideo = await video.current?.getStatusAsync();

    if (statusVideo?.isLoaded) {
      video.current?.setPositionAsync(statusVideo.positionMillis - 5000);
    }
  };

  const handleRowRight = async () => {
    let statusVideo = await video.current?.getStatusAsync();

    if (statusVideo?.isLoaded) {
      video.current?.setPositionAsync(statusVideo.positionMillis + 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleTouchMedia} style={styles.containerVideo}>
        <Video
          ref={video}
          style={styles.video}
          volume={0}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          source={{
            uri: "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4",
          }}
          isLooping
        />
        {isViewButtons ? (
          <View style={styles.buttonsMediaPlayers}>
            <Pressable onPress={handleRowLeft} style={styles.rectangulo}>
              <AntDesign name="leftcircleo" size={32} color="#4CAAB1" />
            </Pressable>
            <Pressable onPress={handlePlayPause} style={styles.rectangulo}>
              {!isPause ? (
                <AntDesign name="play" size={32} color="#4CAAB1" />
              ) : (
                <AntDesign name="pausecircle" size={32} color="#4CAAB1" />
              )}
            </Pressable>
            <Pressable onPress={handleRowRight} style={styles.rectangulo}>
              <AntDesign name="rightcircleo" size={32} color="#4CAAB1" />
            </Pressable>
          </View>
        ) : (
          <View></View>
        )}
      </Pressable>
    </View>
  );
};

export default Clases;
