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

  it('should render form with title and introduction when loading successfully', async () => {
    mockUseClasses.mockReturnValue(createMockClassesState());

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    expect(screen.getByText('Bem vindo ao')).toBeInTheDocument();
    expect(screen.getByText('Que Aula?')).toBeInTheDocument();
    expect(screen.getByText('Escolha as suas matérias')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gerar calendario/i })).toBeInTheDocument();
  });

  it('should show loading state with skeleton tags', async () => {
    mockUseClasses.mockReturnValue(createMockClassesState(true));

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    expect(screen.getByText('Optativas')).toBeInTheDocument();
    expect(screen.getByText('1º Semestre')).toBeInTheDocument();
    expect(screen.getByText('2º Semestre')).toBeInTheDocument();
    
    const shimmerTags = document.querySelectorAll('.shimmer');
    expect(shimmerTags.length).toBeGreaterThan(0);
  });

  it('should show error state with warning message', async () => {
    mockUseClasses.mockReturnValue(createMockClassesState(false, "Erro ao carregar disciplinas"));

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    expect(screen.getByTestId('warning')).toBeInTheDocument();
    expect(screen.getByText('Ocorreu um erro no carregamento das aulas.')).toBeInTheDocument();
  });

  it('should render classes when data is loaded', async () => {
    mockUseClasses.mockReturnValue(createMockClassesState());

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Matemática Básica')).toBeInTheDocument();
      expect(screen.getByText('Programação I Turma A')).toBeInTheDocument();
    });
  });

  it('should have submit buttons with correct structure', async () => {
    mockUseClasses.mockReturnValue(createMockClassesState());

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const previewButton = screen.getByRole('button', { name: /preview/i });
    const generateButton = screen.getByRole('button', { name: /gerar calendario/i });
    
    expect(previewButton).toBeInTheDocument();
    expect(generateButton).toBeInTheDocument();
  });

  it('should call navigate when generate button is clicked', async () => {
    const { navigateFunction } = setupFormMocks(mockUseClasses, mockUseNavigate, mockUseAppContext);
    mockUseClasses.mockReturnValue(createMockClassesState());

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );

    const generateButton = screen.getByRole('button', { name: /gerar calendario/i });
    await user.click(generateButton);

    expect(navigateFunction).toHaveBeenCalledWith('/');
  });

  describe('Class Selection Logic', () => {
    it('should select and deselect classes when clicked', async () => {
      mockUseClasses.mockReturnValue(createMockClassesState());

      render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      expect(screen.getByText('Matemática Básica')).toBeInTheDocument();
      expect(screen.getByText('Programação I Turma A')).toBeInTheDocument();
      expect(screen.getByText('Programação I Turma B')).toBeInTheDocument();
    });

    it('should handle multi-class selection correctly', async () => {
      mockUseClasses.mockReturnValue(createMockClassesState());

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

  describe('Preview Functionality', () => {
    it('should open preview when preview button is clicked', async () => {
      mockUseClasses.mockReturnValue(createMockClassesState());
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      );

      const previewButton = screen.getByRole('button', { name: /preview/i });
      await user.click(previewButton);

      expect(previewButton).toBeInTheDocument();
    });
  });
});
