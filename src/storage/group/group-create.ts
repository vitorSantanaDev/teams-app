import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/app-error";
import { groupsGetAll } from "./groups-get-all";
import { GROUP_COLLECTION } from "@storage/storage-config";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll();
    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError(`Group ${newGroup} already exists`);
    }

    const storage = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (err) {
    throw err;
  }
}
