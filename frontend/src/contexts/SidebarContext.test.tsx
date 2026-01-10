import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SidebarProvider, useSidebar } from './SidebarContext';

function TestComponent() {
  const {
    collapsed,
    toggle,
    mode,
    setMode,
    selectedTaskId,
    selectTask,
    clearTask,
  } = useSidebar();

  return (
    <div>
      <span data-testid="collapsed">{String(collapsed)}</span>
      <span data-testid="mode">{mode}</span>
      <span data-testid="selectedTaskId">{selectedTaskId ?? 'null'}</span>
      <button data-testid="toggle" onClick={toggle}>
        Toggle
      </button>
      <button data-testid="setDashboard" onClick={() => setMode('dashboard')}>
        Dashboard
      </button>
      <button data-testid="setTasks" onClick={() => setMode('tasks')}>
        Tasks
      </button>
      <button data-testid="selectTask" onClick={() => selectTask('task-123')}>
        Select Task
      </button>
      <button data-testid="clearTask" onClick={clearTask}>
        Clear Task
      </button>
    </div>
  );
}

describe('SidebarContext', () => {
  it('provides default values', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('collapsed')).toHaveTextContent('false');
    expect(screen.getByTestId('mode')).toHaveTextContent('dashboard');
    expect(screen.getByTestId('selectedTaskId')).toHaveTextContent('null');
  });

  it('toggles collapsed state', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('collapsed')).toHaveTextContent('false');

    act(() => {
      screen.getByTestId('toggle').click();
    });

    expect(screen.getByTestId('collapsed')).toHaveTextContent('true');
  });

  it('persists mode to localStorage', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    act(() => {
      screen.getByTestId('setTasks').click();
    });

    expect(localStorage.getItem('sidebar-mode')).toBe('"tasks"');
  });

  it('loads mode from localStorage', () => {
    localStorage.setItem('sidebar-mode', '"tasks"');

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('tasks');
  });

  it('selectTask switches to task-detail mode', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    act(() => {
      screen.getByTestId('selectTask').click();
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('task-detail');
    expect(screen.getByTestId('selectedTaskId')).toHaveTextContent('task-123');
  });

  it('clearTask returns to tasks mode', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    act(() => {
      screen.getByTestId('selectTask').click();
    });
    expect(screen.getByTestId('mode')).toHaveTextContent('task-detail');

    act(() => {
      screen.getByTestId('clearTask').click();
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('tasks');
    expect(screen.getByTestId('selectedTaskId')).toHaveTextContent('null');
  });

  it('setMode clears selectedTaskId when not task-detail', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    act(() => {
      screen.getByTestId('selectTask').click();
    });
    expect(screen.getByTestId('selectedTaskId')).toHaveTextContent('task-123');

    act(() => {
      screen.getByTestId('setDashboard').click();
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('dashboard');
    expect(screen.getByTestId('selectedTaskId')).toHaveTextContent('null');
  });

  it('throws error when useSidebar is used outside provider', () => {
    const consoleError = console.error;
    console.error = () => {};

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSidebar must be used within a SidebarProvider');

    console.error = consoleError;
  });
});
