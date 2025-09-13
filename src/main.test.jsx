import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from 'react';

vi.mock('./App.jsx', () => ({
  default: () => <div data-testid="app-component">Mocked App Component</div>
}));

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: vi.fn(() => ({
      render: vi.fn()
    }))
  }
}));

describe('Main Entry Point', () => {
  let originalGetElementById;
  let mockRootElement;
  let ReactDOM;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    mockRootElement = document.createElement('div');
    mockRootElement.id = 'root';
    originalGetElementById = document.getElementById;
    document.getElementById = vi.fn(() => mockRootElement);
    
    ReactDOM = (await import('react-dom/client')).default;
  });

  afterEach(() => {
    document.getElementById = originalGetElementById;
    vi.resetModules();
  });

  describe("Application Bootstrap", () => {
    it("should setup and render the React application correctly", async () => {
      const mockRender = vi.fn();
      ReactDOM.createRoot.mockReturnValue({ render: mockRender });
      
      await import('./main.jsx');
      
      expect(document.getElementById).toHaveBeenCalledWith('root');
      expect(ReactDOM.createRoot).toHaveBeenCalledWith(mockRootElement);
      expect(mockRender).toHaveBeenCalledTimes(1);
      const renderCall = mockRender.mock.calls[0][0];
      expect(renderCall.type).toBe(React.StrictMode);
      expect(renderCall.props.children).toBeDefined();
    });

    it("should handle missing root element gracefully", async () => {
      document.getElementById = vi.fn(() => null);
      
      await import('./main.jsx');
      
      expect(ReactDOM.createRoot).toHaveBeenCalledWith(null);
    });
  });

  describe("Error Handling", () => {
    it("should handle ReactDOM createRoot errors", async () => {
      ReactDOM.createRoot.mockImplementation(() => {
        throw new Error('CreateRoot failed');
      });
      
      await expect(async () => {
        await import('./main.jsx');
      }).rejects.toThrow('CreateRoot failed');
    });

    it("should handle render errors", async () => {
      const mockRender = vi.fn().mockImplementation(() => {
        throw new Error('Render failed');
      });
      ReactDOM.createRoot.mockReturnValue({ render: mockRender });
      
      await expect(async () => {
        await import('./main.jsx');
      }).rejects.toThrow('Render failed');
    });
  });

  describe("React StrictMode", () => {
    it("should wrap App component in StrictMode with correct configuration", async () => {
      const mockRender = vi.fn();
      ReactDOM.createRoot.mockReturnValue({ render: mockRender });
      
      await import('./main.jsx');
      
      const renderCall = mockRender.mock.calls[0][0];
      expect(renderCall.type).toBe(React.StrictMode);
      expect(renderCall.props).toHaveProperty('children');
      
      const appElement = renderCall.props.children;
      expect(appElement).toBeDefined();
      expect(appElement.type).toBeDefined();
    });
  });
});
