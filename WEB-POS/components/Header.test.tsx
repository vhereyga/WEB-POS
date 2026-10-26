import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  it('renders dashboard title and default year', () => {
    render(
      <Header
        selectedYear="2024"
        setSelectedYear={vi.fn()}
        activeTab="General"
        setActiveTab={vi.fn()}
        onOpenSidebar={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('heading', { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('calls setSelectedYear when a different year is chosen', async () => {
    const setSelectedYear = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        selectedYear="2024"
        setSelectedYear={setSelectedYear}
        activeTab="General"
        setActiveTab={vi.fn()}
        onOpenSidebar={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /select year/i }));
    await user.click(screen.getByRole('button', { name: /2025/i }));

    expect(setSelectedYear).toHaveBeenCalledWith('2025');
  });
});
