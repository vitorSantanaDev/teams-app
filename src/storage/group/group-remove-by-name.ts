import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storage-config";

import { groupsGetAll } from "./groups-get-all";

export async function groupRemoveByName(groupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const filteredGroups = storedGroups.filter((g) => g !== groupName);

    const storageGroup = JSON.stringify(filteredGroups);
    await AsyncStorage.setItem(GROUP_COLLECTION, storageGroup);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (err) {
    throw err;
  }
}
