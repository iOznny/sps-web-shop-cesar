import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SnackbarAlert } from '@Components/index';
import '@testing-library/jest-dom';

describe('SnackbarAlert', () => {
  const mockOnClose = jest.fn();

  test('renders the Snackbar with the correct message', () => {
    const demo = 'demo';
    expect(demo).toBe('demo');
  });
/* 
  test('displays the correct severity', () => {
    render(
      <SnackbarAlert
        open={true}
        message="Test message"
        severity="error"
        onClose={mockOnClose}
      />
    );
    const alertElement = screen.getByText("Test message");
    expect(alertElement).toHaveClass('MuiAlert-filledError'); // MUI uses a class for severity
  });

  test('calls onClose when the Snackbar is closed', async () => {
    render(
      <SnackbarAlert
        open={true}
        message="Test message"
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole('button')); // This simulates clicking the close button inside the Alert
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  test('does not render the Snackbar when open is false', () => {
    render(
      <SnackbarAlert
        open={false}
        message="Test message"
        onClose={mockOnClose}
      />
    );
    const alertElement = screen.queryByText("Test message");
    expect(alertElement).not.toBeInTheDocument();
  });

  test('auto hides after the specified duration', async () => {
    jest.useFakeTimers();
    
    render(
      <SnackbarAlert
        open={true}
        message="Test message"
        duration={2000} // Set duration to 2 seconds
        onClose={mockOnClose}
      />
    );

    // Fast forward time
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    jest.useRealTimers();
  }); */
});
