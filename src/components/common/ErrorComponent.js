import { Text } from "react-native";

const ErrorComponent = ({ errorMsg }) => {
  return (
    <>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        {errorMsg}
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 5,
        }}
      >
        Plz restart the app...
      </Text>
    </>
  );
};

export default ErrorComponent;
