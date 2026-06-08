import { fireEvent, render } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label text', () => {
    const { getByText } = render(<Button label="Save" />);
    expect(getByText('Save')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Save" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button label="Save" disabled onPress={onPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders each variant without crashing', () => {
    const variants = ['primary', 'success', 'danger', 'ghost'] as const;
    for (const variant of variants) {
      render(<Button label={variant} variant={variant} />);
    }
  });
});
