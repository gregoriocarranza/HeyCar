import React from "react";
import { View } from "react-native";
import Footer from "./Footer/Footer";
import { styles } from "./ScreenLayout.Style";

const ScreenLayout = ({ children, showFooter, currentRoute = "undefine" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      {showFooter && <Footer currentRoute={currentRoute} />}
    </View>
  );
};

export default ScreenLayout;
