import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/player-add-by-group";
import { groupRemoveByName } from "@storage/group/group-remove-by-name";
import { playerRemoveByGroup } from "@storage/player/player-remove-by-group";
import { playersGetByGroupAndTeam } from "@storage/player/players-get-by-group-and-team";

import { AppError } from "@utils/app-error";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { ListEmpty } from "@components/ListEmpty";
import { Highlight } from "@components/Highlight";
import { PlayerCard } from "@components/PlayerCard";
import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = { group: string };

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState("Team A");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const route = useRoute();

  const { group } = route.params as RouteParams;

  function fetchPlayersByTeam() {
    (async () => {
      try {
        setIsLoading(true);
        const players = await playersGetByGroupAndTeam(group, selectedTeam);
        setPlayers(players);
      } catch (err) {
        console.error({ err });
        Alert.alert("Members", "Unable to load team members");
      } finally {
        setIsLoading(false);
      }
    })();
  }
  async function handleAddPlayer() {
    if (!newPlayerName.trim().length) {
      return Alert.alert(`New member`, `Enter the member's name`);
    }

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team: selectedTeam,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();

      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (err) {
      if (err instanceof AppError) {
        return Alert.alert(`New Member`, err.message);
      }
      console.error({ err });
      Alert.alert(`New Member`, "Unable to add this new member to the team");
    }
  }

  async function handleRemovePlayer(member: string) {
    try {
      await playerRemoveByGroup(member, group);
      fetchPlayersByTeam();
    } catch (err) {
      console.error({ err });
    }
  }

  function groupRemove() {
    (async () => {
      try {
        await groupRemoveByName(group);
        navigation.navigate("groups");
      } catch (err) {
        console.log({ err });
      }
    })();
  }

  function handleRemoveGroup() {
    Alert.alert("Remove", "Do you really want to remove this team?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => groupRemove(),
      },
    ]);
  }

  useEffect(fetchPlayersByTeam, [group, selectedTeam]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Add the crowd in their respective teams"
      />
      <Form>
        <Input
          autoCorrect={false}
          value={newPlayerName}
          placeholder="New member"
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon onPress={handleAddPlayer} icon="add" />
      </Form>
      <HeaderList>
        <FlatList
          horizontal
          data={["Team A", "Team B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              label={item}
              isActive={item === selectedTeam}
              onPress={() => setSelectedTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlayerCard
              onRemove={() => handleRemovePlayer(item.name)}
              name={item.name}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="There are no members on this team" />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            !players.length && { flex: 1 },
          ]}
        />
      )}
      <Button
        type="SECONDARY"
        label="Remove group"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
