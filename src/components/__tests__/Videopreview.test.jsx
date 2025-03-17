import renderer from "react-test-renderer";
import Videopreview from "../Videopreview";

it("renders correctly", () => {
  const tree = renderer.create(<Videopreview />).toJSON();
  expect(tree).toMatchSnapshot();
});
