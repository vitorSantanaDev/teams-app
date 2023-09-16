import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storage-config";

import { playersGetByGroup } from "./players-get-by-group";

export async function playerRemoveByGroup(
  playerName: string,
  groupName: string
) {
  try {
    const stored = await playersGetByGroup(groupName);
    const filtered = stored.filter((p) => p.name !== playerName);

    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupName}`, players);
  } catch (error) {
    throw error;
  }
}
