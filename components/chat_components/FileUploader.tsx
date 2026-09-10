import { File, Paths } from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
const pickAndSaveFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      const file = new File(uri);
      console.log(file.textSync());
      const destination = Paths.document + file.name;
    }
  } catch (er) {
    console.error("Error picking file: ", er);
  }
};

export default pickAndSaveFile;
