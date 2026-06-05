import { render } from '@testing-library/react-native';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders without crashing', () => {
    render(<Icon name="star" />);
  });
});
