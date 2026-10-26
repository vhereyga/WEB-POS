import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DailySellingActivity from './DailySellingActivity';
import LatestTransaction from './LatestTransaction';
import PopularProduct from './PopularProduct';
import Sidebar from './Sidebar';
import StockReceiptIssued from './StockReceiptIssued';
import DashboardPage from '../app/page';

describe('dashboard components', () => {
  it('renders the daily selling card with summary data', () => {
    render(<DailySellingActivity selectedYear="2024" />);

    expect(screen.getByText(/daily selling activity/i)).toBeInTheDocument();
    expect(screen.getByText('$2,420.22')).toBeInTheDocument();
    expect(screen.getByText(/real-time hourly revenue distribution/i)).toBeInTheDocument();
  });

  it('renders the latest transactions table', () => {
    render(<LatestTransaction />);

    expect(screen.getByText(/latest transaction/i)).toBeInTheDocument();
    expect(screen.getByText('T21.0331')).toBeInTheDocument();
    expect(screen.getByText('Showing 6 latest entries')).toBeInTheDocument();
  });

  it('renders popular products and stock status', () => {
    render(<PopularProduct />);

    expect(screen.getByText(/popular product/i)).toBeInTheDocument();
    expect(screen.getByText('Rhinotomy machine x250')).toBeInTheDocument();
    expect(screen.getAllByText('14').length).toBeGreaterThan(0);
  });

  it('renders stock receipt and issued events', () => {
    render(<StockReceiptIssued />);

    expect(screen.getByText(/stock receipt \/ issued/i)).toBeInTheDocument();
    expect(screen.getByText('Warehouse A')).toBeInTheDocument();
    expect(screen.getAllByText(/In|Out/i).length).toBeGreaterThan(0);
  });

  it('renders the sidebar navigation and handles close action', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const setActiveMenu = vi.fn();

    render(
      <Sidebar
        activeMenu="Dashboard"
        setActiveMenu={setActiveMenu}
        isOpen={true}
        onClose={onClose}
      />,
    );

    expect(screen.getByText('WEB POS')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('INVENTORY')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close sidebar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('allows switching the chart filter and opening the menu', async () => {
    const user = userEvent.setup();

    render(<DailySellingActivity selectedYear="2025" />);

    await user.click(screen.getByRole('button', { name: /week/i }));
    expect(screen.getByText(/real-time hourly revenue distribution \(2025\)/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/daily selling options/i));
    expect(screen.getByText(/export csv data/i)).toBeInTheDocument();
    expect(screen.getByText(/sync pos feeds/i)).toBeInTheDocument();
  });

  it('updates the active sidebar item when dashboard is selected', async () => {
    const user = userEvent.setup();
    const setActiveMenu = vi.fn();

    render(
      <Sidebar
        activeMenu="Dashboard"
        setActiveMenu={setActiveMenu}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: /dashboard/i }));
    expect(setActiveMenu).toHaveBeenCalledWith('Dashboard');
  });

  it('renders the main dashboard page shell', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/selling activity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dashboard details/i)).toBeInTheDocument();
  });
});
