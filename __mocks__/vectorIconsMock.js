const React = require("react");
const { Text } = require("react-native");

function MockIcon({ name, testID }) {
  return React.createElement(
    Text,
    { testID: testID ?? `icon-${name}` },
    name ?? "icon",
  );
}

module.exports = {
  FontAwesome6: MockIcon,
  FontAwesome5: MockIcon,
  Ionicons: MockIcon,
  MaterialIcons: MockIcon,
};
