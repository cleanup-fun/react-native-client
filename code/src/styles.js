import {
  StyleSheet,
} from 'react-native';

const repeatedStyles = StyleSheet.create({
  centeringContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flexGrow: 1,
  },
  errorText: {
    backgroundColor: "#FF9999",
  },
  kvPair: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
});

export { repeatedStyles }
