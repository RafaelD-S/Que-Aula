import Footer from "../footer/footer";
import Header from "../header/header";
import { MainLayoutProps } from "./mainLayout.interface";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer
        calendarMessage="Criar um novo calendário"
        feedbackMessage="Achou algo ou quer dar uma sugestão?"
      />
    </>
  );
}
