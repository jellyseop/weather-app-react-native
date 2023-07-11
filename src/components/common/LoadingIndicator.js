import { ActivityIndicator, Text, View } from "react-native";

import { styles } from "../../styles/globalStyles";

const LoadingIndicator = ({ loadingMsg }) => {
  return (
    <View style={styles.loading_container}>
      <ActivityIndicator size="large" color="#1f2937" />
      <Text style={styles.loading_text}>{loadingMsg}</Text>
    </View>
  );
};

export default LoadingIndicator;
