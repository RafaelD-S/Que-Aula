import "./progressTracker.style.scss";
import { IProgressTrackerProps } from "./progressTracker.interface";

const ProgressTracker = ({
  classesAmount,
  checkedAmount,
}: IProgressTrackerProps) => {
  const percentage = Math.round((checkedAmount / classesAmount) * 100);

  return (
    <section
      className="progress-tracker"
      style={{ "--percentage": `${percentage}%` } as React.CSSProperties}
    >
      <div className="progress-tracker__bar">
        <div className="progress-tracker__progress" />
      </div>
      <p className="progress-tracker__percentage-text">{percentage}%</p>
    </section>
  );
};

export default ProgressTracker;
