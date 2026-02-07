import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function _layout() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'android' ? 120 : 60}
      keyboardShouldPersistTaps="handled"
      keyboardOpeningTime={0}
      showsVerticalScrollIndicator={false}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardAwareScrollView>
  );
}

export default _layout
