import renderer from 'react-test-renderer';
import VideoCard from '../VideoCard';

it('renders correctly', () => {
  const tree = renderer
    .create(<VideoCard/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});