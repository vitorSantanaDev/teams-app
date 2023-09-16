import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";

import { AppError } from "@utils/app-error";
import { groupCreate } from "@storage/group/group-create";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [newGroup, setNewGroup] = useState("");

  const navigation = useNavigation();

  async function handleGoToNewGroups() {
    try {
      if (!newGroup.trim().length) {
        Alert.alert("New group", "Enter the name of the group");
        return;
      }

      await groupCreate(newGroup);

      navigation.navigate("players", { group: newGroup });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New group", error.message);
        return;
      }

      Alert.alert("New group", "Unable to create a new group");
      console.error({ error });
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="New team" subtitle="Create the team to add members" />
        <Input onChangeText={setNewGroup} placeholder="Team name" />
        <Button
          onPress={handleGoToNewGroups}
          style={{ marginTop: 20 }}
          label="Create"
        />
      </Content>
    </Container>
  );
}
