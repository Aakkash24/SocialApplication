import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { PermissionsAndroid } from "react-native";
import { Platform } from "react-native";

class UserPermissions {
  getCameraPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("We need permission to use your camera roll");
      }
    }
    //  else if (Platform.OS == "android") {
    // //   const status = await PermissionsAndroid.request(
    // //     PermissionsAndroid.PERMISSIONS.CAMERA_ROLL
    // //   );
    // //   if (status == PermissionsAndroid.RESULTS.GRANTED) {
    // //     console.log(status);
    // //   }
    // // }
  };
}

export default new UserPermissions();
