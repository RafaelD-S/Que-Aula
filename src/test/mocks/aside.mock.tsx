import { vi } from "vitest";

export const MockFooter = ({ hasCredits }: { hasCredits?: boolean }) => (
  <div data-testid="mock-footer">
    Footer Mock {hasCredits ? "with credits" : "without credits"}
  </div>
);

export const MockLink = ({ to, children, onClick }: any) => (
  <a href={to} onClick={onClick} data-testid={`link-${to}`}>
    {children}
  </a>
);

export const mockAsideOpenerText = "☰ Menu";

export const MockAsideOpener = () => (
  <button data-testid="menu-opener">
    {mockAsideOpenerText}
  </button>
);

export const mockSimpleChildren = <span>Abrir Menu</span>;

export const getDefaultAsideProps = () => ({
  children: <MockAsideOpener />
});

export const getSimpleAsideProps = () => ({
  children: mockSimpleChildren
});

export const getAsidePropsWithoutChildren = () => ({
  children: undefined
});

export const mockAsideAssets = {
  close: "mocked-close-icon.svg",
  logo: "mocked-logo.svg"
};

export const asideTestScenarios = {
  states: {
    closed: "Menu fechado (estado inicial)",
    opened: "Menu aberto após clique no opener"
  },
  
  children: {
    component: "Children como componente React",
    text: "Children como texto simples",
    undefined: "Sem children definido"
  },
  
  closingMethods: {
    overlay: "Clique no overlay (fundo escuro)",
    closeButton: "Clique no botão X de fechar",
    logoClick: "Clique no logo",
    navigationClick: "Clique em item de navegação"
  },
  
  elements: {
    opener: "Botão que abre o menu",
    overlay: "Overlay/background do menu",
    container: "Container principal do menu",
    header: "Cabeçalho com logo e botão fechar",
    navigation: "Área de navegação com links",
    footer: "Rodapé do menu"
  }
};

export const resetAsideMocks = () => {
  vi.clearAllMocks();
};

export const expectedNavigationItems = [
  { text: "Página Inicial", path: "/" },
  { text: "Todas as Aulas", path: "/todas-as-aulas" },
  { text: "Fluxograma", path: "/fluxograma" }
];

export const expectedAsideTexts = [
  "Página Inicial",
  "Todas as Aulas", 
  "Fluxograma"
];
