import { Image, StyleSheet, View } from "react-native";

type AvatarProps = {
  seed: string;
  size?: number;
  backgroundColor?: string;
  style?: string;
};

export function Avatar({
  seed,
  size = 50,
  backgroundColor = "4F46E5",
  style = "adventurer",
}: AvatarProps) {
  const bg = backgroundColor.replace("#", "");
  const uri = `https://api.dicebear.com/10.x/${style}/png?seed=${encodeURIComponent(
    seed,
  )}&size=${size * 2}&backgroundColor=${bg}&radius=50`;

  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
});
