import Tts from 'react-native-tts';



export const initilizeListner =() =>
{
Tts.getInitStatus().then(() => {
}, (err) => {
  if (err.code === 'no_engine') {
    Tts.requestInstallEngine();
  }
});

Tts.setIgnoreSilentSwitch('ignore'),
Tts.setDefaultPitch(0.7)

}