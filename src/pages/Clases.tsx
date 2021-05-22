import React, { useEffect, useRef, useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { AVPlaybackStatus, Video } from "expo-av";
import Animated from "react-native-reanimated";
import * as ScreenOrientation from "expo-screen-orientation";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { msToTime } from "../utils/secons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    height: height / 3,
  },
  containerVideo: {
    backgroundColor: "black",
  },
  rectangulo: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  buttonsMediaPlayers: {
    position: "absolute",
    bottom: 0,
    top: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  fullscreen: {
    position: "absolute",
    bottom: 2,
    right: 10,
  },
  containerSliderVideo: {
    position: "absolute",
    bottom: 25,
    width: "100%",
  },
  sliderVideo: {
    height: "100%",
  },
  minsVideo: {
    position: "absolute",
    bottom: 0,
    left: 5,
  },
  minsVideoText: {
    color: "#4CAAB1",
    fontSize: 16,
  },
  titleClass: {
    position: "absolute",
    top: 5,
    height: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGoBack: {
    position: "absolute",
    top: 5,
    left: 5,
  },
});

const Clases = () => {
  const [isPause, setIsPause] = useState<boolean>(false);
  const [isViewButtons, setIsViewButtons] = useState<boolean>(true);
  const [stateVideom, setStateVideo] = useState<AVPlaybackStatus>();
  const [fullScreen, setFullScreen] = useState<number>(0.275);

  const navigation = useNavigation();

  useEffect(() => {
    video.current?.getStatusAsync().then((a) => setStateVideo(a));
  }, []);

  useEffect(() => {
    console.log(width);
  }, [width]);

  const video = useRef<Video>(null);

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

  const handleFullScreen = async () => {
    let orientation = await ScreenOrientation.getOrientationLockAsync();

    console.log(orientation);

    if (orientation === 3 || orientation === 2) {
      setFullScreen(1.1);
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else {
      setFullScreen(0.275);
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  const handleGoBack = async () => {
    navigation.goBack();
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={handleTouchMedia}
        style={{ ...styles.containerVideo, flex: fullScreen }}
      >
        <Video
          ref={video}
          style={styles.video}
          volume={1}
          onFullscreenUpdate={async (e) => {
            if (e.fullscreenUpdate === 3) {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
              );
              if (e.status.isLoaded) {
                setIsPause(e.status.isPlaying);
              }
            }
          }}
          onPlaybackStatusUpdate={(a) => setStateVideo(a)}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          source={{
            uri:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          }}
          isLooping
        />
        {isViewButtons && (
          <Animated.View style={styles.buttonsMediaPlayers}>
            <Pressable onPress={handleRowLeft} style={styles.rectangulo}>
              <AntDesign name="doubleleft" size={32} color="#4CAAB1" />
            </Pressable>
            <Pressable style={styles.buttonGoBack} onPress={handleGoBack}>
              <AntDesign name="arrowleft" size={32} color="#4CAAB1" />
            </Pressable>
            <Pressable onPress={handlePlayPause} style={styles.rectangulo}>
              {!isPause ? (
                <AntDesign name="play" size={32} color="#4CAAB1" />
              ) : (
                <AntDesign name="pausecircle" size={32} color="#4CAAB1" />
              )}
            </Pressable>
            <Pressable onPress={handleRowRight} style={styles.rectangulo}>
              <AntDesign name="doubleright" size={32} color="#4CAAB1" />
            </Pressable>

            <Pressable onPress={handleFullScreen} style={styles.fullscreen}>
              <MaterialCommunityIcons
                name="fullscreen"
                size={28}
                color="#4CAAB1"
              />
            </Pressable>
            <View style={styles.containerSliderVideo}>
              <Slider
                minimumValue={1}
                maximumValue={
                  stateVideom?.isLoaded ? stateVideom.durationMillis : 1
                }
                value={stateVideom?.isLoaded ? stateVideom.positionMillis : 0}
                style={{ ...styles.sliderVideo, width: "100%" }}
                onValueChange={async (a) => {
                  await video.current?.setPositionAsync(a);
                }}
                minimumTrackTintColor="#4CAAB1"
                maximumTrackTintColor="#BFE3ED"
              />
            </View>
            <View style={styles.minsVideo}>
              <Text style={styles.minsVideoText}>
                {`${msToTime(
                  stateVideom?.isLoaded ? stateVideom.positionMillis : 0
                )} / ${msToTime(
                  stateVideom?.isLoaded ? stateVideom.durationMillis : 0
                )}`}
              </Text>
            </View>
            <View style={styles.titleClass}>
              <Text style={{ color: "white", fontSize: 22 }}>Sintel</Text>
            </View>
          </Animated.View>
        )}
        <StatusBar barStyle="light-content" />
      </Pressable>
    </SafeAreaView>
  );
};

export default Clases;
