
import { StyleSheet } from "react-native";

const flexStyles = {
  display: "flex",
  flex: 1,
  justifyContent: "space-around",
  alignItems: "stretch",
};

const circleStyle = (heightWidth) => ({
  borderRadius: heightWidth / 2,
  width: heightWidth,
  height: heightWidth,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const styles = StyleSheet.create({
  topSection: {
    ...flexStyles,
    flex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  progrsBarSection: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  buttonsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    display: "flex",
  },
  buttonsCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  playPauseButton: {
    ...circleStyle(60),
    backgroundColor: "#52527a",
  },
  playPauseIcon: {
    color: "#fff",
  },
  trackArtBox: {
    ...flexStyles,
    flex: 2,
    display: "flex",
  },
  trackArt: {
    ...circleStyle(90),
    borderWidth: 2,
  },
  trackDesc: {
    ...flexStyles,
    alignItems: "center",
    justifyContent: "center",
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3d3d5c",
  },
  trackSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3d3d5c",
  },
});
