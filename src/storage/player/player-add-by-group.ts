import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/app-error";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storage-config";
import { playersGetByGroup } from "./players-get-by-group";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playerAlreadyExists = storedPlayers?.findIndex(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists !== -1) {
      throw new AppError(
        `This person is already part of another team in the same group`
      );
    }

    const collectionKey = `${PLAYER_COLLECTION}-${group}`;
    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(collectionKey, storage);
  } catch (err) {
    throw err;
  }
}
