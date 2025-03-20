import renderer from "react-test-renderer";
import Dashboard from "../Dashboard/Dashboard";

it("renders correctly", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
