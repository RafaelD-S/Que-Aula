import "./progressTracker.style.scss";
import { progressTrackerProps } from "./progressTracker.interface";

const ProgressTracker = ({
  classesAmount,
  checkedAmount,
}: progressTrackerProps) => {
  const percentage = (checkedAmount / classesAmount) * 100;

  return (
    <section className="progress__tracker">
      <div className="progress__tracker__bar">
        <div
          className="progress__tracker__bar__completed"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="progress__tracker__percentage">{Math.round(percentage)}%</p>
    </section>
  );
};

export default ProgressTracker;
