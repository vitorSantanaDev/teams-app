import { FlatList } from "react-native";
import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";

import { groupsGetAll } from "@storage/group/groups-get-all";

import { Container } from "./styles";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function getGroups() {
    (async () => {
      try {
        setIsLoading(true);
        const data = await groupsGetAll();
        setGroups(data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function handleGoToNewGroup() {
    navigation.navigate("new_group");
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      getGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Teams" subtitle="Play with your team" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
          )}
          contentContainerStyle={!groups.length && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="How about registering the first team?" />
          )}
          keyExtractor={(item) => item.replace(" ", "-").toLowerCase()}
        />
      )}

      <Button onPress={handleGoToNewGroup} label="Create a new team" />
    </Container>
  );
}
