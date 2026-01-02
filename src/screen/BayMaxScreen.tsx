import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../utils/Constant'
import Background from '../components/bayMax/Background'
import Loading from '../components/bayMax/Loading'
import BigHero6 from '../components/bayMax/BigHero6'
import Tts from 'react-native-tts'
import Instruction from '../components/bayMax/Instruction'
import Padometer from '../components/padometer/Padometer'
import { main } from '../service/ApiService'
import { prompt } from '../utils/data'



const BayMaxScreen: FC = () => {

    const [showInstruction, setShowInstruction] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [message, setShowMessage] = useState('');
    const [showPedometer, setShowPadometer] = useState(false);

    const blurOpacity = useRef(new Animated.Value(0)).current;

    const stateBlur = () => {
        Animated.timing(blurOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }
        ).start();
    }
    useEffect(() => {
        const initTts = async () => {
            try {
                await Tts.setDefaultLanguage('hi-IN');
                Tts.setDefaultRate(0.5, true); // Adding 'true' as second param skip error on some versions
                Tts.setDefaultPitch(1.0);
            } catch (err) {
                console.log("TTS Init Error:", err);
            }
        };

        initTts();

        let timer = setTimeout(() => {
            stateBlur();
        }, 2000);
        return () => {
            clearTimeout(timer);
            Tts.stop(); 
        };
    }, []);
    const unBlur = () => {
        Animated.timing(blurOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }
        ).start();
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            stateBlur();
        }, 2000)
        return () => clearTimeout(timer);
    }, [])



    const onOptionPressHandler = (type: string) => {
        console.log('Pressed', type)
        setShowInstruction(true)
        if (type === 'pedometer') {
            setShowPadometer(true)
            setShowLoader(false)
            return
        }
        switch (type) {
            case 'meditation':
                handleResponse(type, prompt.health)
                break
            case 'health':
                handleResponse(type, prompt.health)
                break
            case 'happiness':
                handleResponse(type, prompt.joke)
                break
            case 'motivation':
                handleResponse(type, prompt.motivation)
                break
            default:
                break
        }
    }

    const handleResponse = async (type: string, promptText: string) => {

        try {
            if (type === "meditation") {
                Tts.speak("Focus on your breath !!");
                setShowMessage("meditation")
                return;

            }
            const data = await main(promptText);

            if (!data) {
                setShowMessage("Sorry, I couldn't generate a response.");
                return;
            }

            setShowMessage(data);
            Tts.speak(data);
            unBlur();

        }
        catch (e) {
            Tts.speak("An error Occurend ! please try again");
            stateBlur();
            setShowLoader(true);
            setShowMessage('');
            setShowInstruction(true);
            console.log(e);
        }
        finally {
            setShowLoader(false);
        }
    }

    return (
        <View style={styles.container}>
            {
                message && (<View style={{ zIndex: 2, width: "100%", }}><Instruction message={message} onCross={() => {
                    setShowLoader(true);
                    stateBlur();
                    setShowMessage("");
                    setShowInstruction(false);

                }}>
                </Instruction></View>)
            }
              {
                showPedometer && (<View style={{ zIndex: 2, width: "100%", }}><Instruction message={message} onCross={() => {
                    setShowLoader(true);
                    stateBlur();
                    setShowMessage("");
                    setShowInstruction(false);

                }}>
                </Instruction></View>)
            }
            {
                showLoader && (<View style={styles.loaderContainer}>
                    <Loading></Loading>
                </View>)
            }
            {
                !showInstruction && <View style={styles.BigHero6}>
                    <BigHero6 onPress={onOptionPressHandler}>
                    </BigHero6>
                </View>
            }

            <Background blurOpacity={blurOpacity} />
        </View>
    )
}

export default BayMaxScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondry,
        justifyContent: "center",
        alignItems: "center",
    },
    loaderContainer: {
        position: "absolute",
        zIndex: 2
    },
    BigHero6: {
        position: "absolute",
        zIndex: 2
    }

})