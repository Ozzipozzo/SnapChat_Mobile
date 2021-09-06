import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Button, Image, Platform
} from "react-native";
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function CameraScreen() {

    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const cameraRef = useRef();


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                await cameraRef.current.pausePreview();
                setIsPreview(true);
                console.log("picture source", source);
            }
        }
    };

    const recordVideo = async () => {
        if (cameraRef.current) {
            try {
                const videoRecordPromise = cameraRef.current.recordAsync();
                if (videoRecordPromise) {
                    setIsVideoRecording(true);
                    const data = await videoRecordPromise;
                    const source = data.uri;
                    if (source) {
                        setIsPreview(true);
                        console.log("video source", source);
                        setVideoSource(source);
                    }
                }
            } catch (error) {
                console.warn(error);
            }
        }
    };

    const stopVideoRecording = () => {
        if (cameraRef.current) {
            setIsPreview(false);
            setIsVideoRecording(false);
            cameraRef.current.stopRecording();
        }
    };
    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };
    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
        setVideoSource(null);
    };

    const renderCancelPreviewButton = () => (
        <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
            <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
            <View
                style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
            />
        </TouchableOpacity>
    );

    const renderVideoPlayer = () => (
        <Video
            source={{ uri: videoSource }}
            shouldPlay={true}
            style={styles.media}
        />
    );
    const renderVideoRecordIndicator = () => (
        <View style={styles.recordIndicatorContainer}>
            <View style={styles.recordDot} />
            <Text style={styles.recordTitle}>{"Recording..."}</Text>
        </View>
    );
    const renderCaptureControl = () => (
        <View style={styles.control}>
            <Icon disabled={!isCameraReady}
                onPress={switchCamera}
                style={{ backgroundColor: '#c4c5c4' }}
                raised
                name='sync-alt'
                type='font-awesome-5'
                color='black'
                onPress={switchCamera}
                size={20}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onLongPress={recordVideo}
                onPressOut={stopVideoRecording}
                onPress={takePicture}
                style={styles.capture}
            />
            <Icon disabled={!isCameraReady}
                onPress={switchCamera}
                style={{ backgroundColor: '#c4c5c4' }}
                raised
                name='image'
                type='font-awesome-5'
                color='black'
                onPress={pickImage}
                size={20}
            />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        </View>
    );

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.container}
                type={cameraType}
                flashMode={Camera.Constants.FlashMode.on}
                onCameraReady={onCameraReady}
                onMountError={(error) => {
                    console.log("cammera error", error);
                }}
            />
            <View style={styles.container}>
                {isVideoRecording && renderVideoRecordIndicator()}
                {videoSource && renderVideoPlayer()}
                {isPreview && renderCancelPreviewButton()}
                {!videoSource && !isPreview && renderCaptureControl()}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    closeButton: {
        position: "absolute",
        top: 35,
        left: 15,
        height: closeButtonSize,
        width: closeButtonSize,
        borderRadius: Math.floor(closeButtonSize / 2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4c5c4",
        opacity: 0.7,
        zIndex: 2,
    },
    media: {
        ...StyleSheet.absoluteFillObject,
    },
    closeCross: {
        width: "68%",
        height: 1,
        backgroundColor: "black",
    },
    control: {
        position: "absolute",
        flexDirection: "row",
        bottom: 38,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    capture: {
        backgroundColor: "#f5f6f5",
        borderRadius: 5,
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31,
    },
    recordIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        top: 25,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        opacity: 0.7,
    },
    recordTitle: {
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center",
    },
    recordDot: {
        borderRadius: 3,
        height: 6,
        width: 6,
        backgroundColor: "#ff0000",
        marginHorizontal: 5,
    },
    text: {
        color: "#fff",
    },
});