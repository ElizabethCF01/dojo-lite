import { render } from "@testing-library/react-native";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Flair } from "../Flair";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

describe("Avatar", () => {
  it("renders without crashing", () => {
    render(<Avatar seed="test-student" />);
  });
});

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button label="Click me" />);
  });
});

describe("Flair", () => {
  it("renders without crashing", () => {
    render(<Flair label="Champion" />);
  });
});

describe("Icon", () => {
  it("renders without crashing", () => {
    render(<Icon name="star" />);
  });
});

describe("Typography", () => {
  it("renders without crashing", () => {
    render(<Typography>Hello world</Typography>);
  });
});
