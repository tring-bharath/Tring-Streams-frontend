import renderer from 'react-test-renderer';
import HistoryCard from '../HistoryCard';

it('renders correctly', () => {
  const tree = renderer
    .create(<HistoryCard />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});