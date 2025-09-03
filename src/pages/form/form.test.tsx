import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import {
  setupFormTestMocks,
  createMockClassesState,
  setupFormMocks
} from "../../test/mocks/form.mock";

setupFormTestMocks();

import { useClasses } from '../../hooks/useClasses';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Form from "./form";

const mockUseClasses = vi.mocked(useClasses);
const mockUseNavigate = vi.mocked(useNavigate);
const mockUseAppContext = vi.mocked(useAppContext);

beforeEach(() => {
  vi.clearAllMocks();
  setupFormMocks(mockUseClasses, mockUseNavigate, mockUseAppContext);
});

describe('Form', () => {
  describe('Rendering and States', () => {
    it('should render form correctly with loading, error, and success states', async () => {
      mockUseClasses.mockReturnValue(createMockClassesState());

      const { unmount } = render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      expect(screen.getByText('Bem vindo ao')).toBeInTheDocument();
      expect(screen.getByText('Que Aula?')).toBeInTheDocument();
      expect(screen.getByText('Escolha as suas matérias')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /gerar calendario/i })).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByText('Matemática Básica')).toBeInTheDocument();
        expect(screen.getByText('Programação I Turma A')).toBeInTheDocument();
      });
      unmount();

      mockUseClasses.mockReturnValue(createMockClassesState(true));
      const { unmount: unmount2 } = render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      expect(screen.getByText('Optativas')).toBeInTheDocument();
      expect(screen.getByText('1º Semestre')).toBeInTheDocument();
      expect(screen.getByText('2º Semestre')).toBeInTheDocument();
      
      const shimmerTags = document.querySelectorAll('.shimmer');
      expect(shimmerTags.length).toBeGreaterThan(0);
      unmount2();

      mockUseClasses.mockReturnValue(createMockClassesState(false, "Erro ao carregar disciplinas"));
      render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      expect(screen.getByTestId('warning')).toBeInTheDocument();
      expect(screen.getByText('Ocorreu um erro no carregamento das aulas.')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle button interactions and navigation correctly', async () => {
      const { navigateFunction } = setupFormMocks(mockUseClasses, mockUseNavigate, mockUseAppContext);
      mockUseClasses.mockReturnValue(createMockClassesState());
      const user = userEvent.setup();

      const { unmount } = render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      const previewButton = screen.getByRole('button', { name: /preview/i });
      const generateButton = screen.getByRole('button', { name: /gerar calendario/i });
      
      expect(previewButton).toBeInTheDocument();
      expect(generateButton).toBeInTheDocument();

      await user.click(generateButton);
      expect(navigateFunction).toHaveBeenCalledWith('/');
      unmount();

      mockUseClasses.mockReturnValue(createMockClassesState());
      render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      const previewBtn = screen.getByRole('button', { name: /preview/i });
      await user.click(previewBtn);
      expect(previewBtn).toBeInTheDocument();
    });

    it('should handle class selection interactions correctly', async () => {
      mockUseClasses.mockReturnValue(createMockClassesState());

      const { unmount } = render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      expect(screen.getByText('Matemática Básica')).toBeInTheDocument();
      expect(screen.getByText('Programação I Turma A')).toBeInTheDocument();
      expect(screen.getByText('Programação I Turma B')).toBeInTheDocument();
      unmount();

      render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      const multiClassButtonA = screen.getByText('Programação I Turma A');
      const multiClassButtonB = screen.getByText('Programação I Turma B');
      
      expect(multiClassButtonA).toBeInTheDocument();
      expect(multiClassButtonB).toBeInTheDocument();
    });
  });
});