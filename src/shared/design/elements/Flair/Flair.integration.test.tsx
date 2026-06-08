/**
 * Integration tests for Flair — exercises the Flair+Typography composition.
 * Both components are rendered real (no mocks), so a bug in either will fail here.
 */
import { render } from '@testing-library/react-native';
import { colors } from '../../foundations';
import { Flair } from './Flair';

describe('Flair + Typography integration', () => {
  it('surfaces the label text through the internal Typography', () => {
    const { getByText } = render(<Flair label="Champion" />);
    expect(getByText('Champion')).toBeTruthy();
  });

  it('applies the caption font size from Typography variant', () => {
    const { getByText } = render(<Flair label="Pro" />);
    const text = getByText('Pro');
    const flatStyle = Array.isArray(text.props.style)
      ? Object.assign({}, ...text.props.style)
      : text.props.style;
    expect(typeof flatStyle.fontSize).toBe('number');
  });

  it('uses the correct text color for each tone', () => {
    const cases: Array<{
      tone: 'success' | 'danger' | 'brand' | 'neutral';
      expected: string;
    }> = [
      { tone: 'success', expected: colors.textOnBrand },
      { tone: 'danger', expected: colors.textOnBrand },
      { tone: 'brand', expected: colors.brand },
      { tone: 'neutral', expected: colors.textSecondary },
    ];

    for (const { tone, expected } of cases) {
      const { getByText } = render(<Flair label={tone} tone={tone} />);
      const text = getByText(tone);
      const flatStyle = Array.isArray(text.props.style)
        ? Object.assign({}, ...text.props.style)
        : text.props.style;
      expect(flatStyle.color).toBe(expected);
    }
  });
});
