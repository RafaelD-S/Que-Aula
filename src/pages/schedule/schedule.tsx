import "./schedule.style.scss";
import Download from "../../assets/download.svg";
import { useState, useRef } from "react";
import Warning from "../../components/warning/warning";
import html2canvas from "html2canvas";
import { Calendar } from "../../components/calendar/calendar";
import { useAppContext } from "../../context/AppContext";

const Schedule = () => {
  const calendarRef = useRef(null);
  const { storedClasses } = useAppContext();

  const [warning, setWarning] = useState(false);

  const saveImage = () => {
    if (!calendarRef.current) return;

    const backgroundColor = "#080e13";
    const imgBackgroundColor = "#0d4852";

    html2canvas(calendarRef.current, {
      backgroundColor: backgroundColor,
      useCORS: true,
      scale: 4,
      windowWidth: 420,
    }).then((canvas) => {
      const padding = 20;
      const bottomPadding = 10;
      const textHeight = 96;

      const newCanvas = document.createElement("canvas");
      const ctx = newCanvas.getContext("2d");

      if (!ctx) {
        setWarning(true);
        return;
      }

      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height + padding + textHeight + bottomPadding;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

      ctx.fillStyle = imgBackgroundColor;
      ctx.fillRect(0, 0, newCanvas.width, padding);

      ctx.fillStyle = imgBackgroundColor;
      ctx.fillRect(0, padding, newCanvas.width, textHeight);

      ctx.font = "700 64px Montserrat, Arial, Helvetica, sans-serif";
      ctx.fillStyle = "#c6f3f5";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textX = newCanvas.width / 2;
      const textY = (padding + textHeight) / 2;

      ctx.fillText("Que Aula?", textX, textY);

      ctx.drawImage(canvas, 0, padding + textHeight);

      const link = document.createElement("a");
      link.href = newCanvas.toDataURL("image/png");
      link.download = "que-aula-calendario.png";
      link.click();
    });
  };

  return (
    <main className="schedule">
      <div className="schedule__warning">
        <Warning
          message="Não foi possível fazer o download da imagem. Tente novamente mais tarde."
          type="warning"
          opened={warning}
          isClosable
          buttonLabel="Fechar"
        />
      </div>
      <h2 className="schedule__title">Todas as Aulas</h2>

      <Calendar ref={calendarRef} classes={storedClasses} />

      <Warning
        message="Seu download foi iniciado. Aguarde."
        type="info"
        buttonLabel="Fechar"
        disabled={warning}
      >
        <button className="schedule__button" onClick={saveImage}>
          Salvar imagem do calendário
          <img src={Download} alt="download icon" className="schedule__button__icon" />
        </button>
      </Warning>
    </main>
  );
};

export default Schedule;
