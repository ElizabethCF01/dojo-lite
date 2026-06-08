import { render } from '@testing-library/react-native';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders without crashing', () => {
    render(<Typography>Hello world</Typography>);
  });
});
