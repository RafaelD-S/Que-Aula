export const getPeriodString = (period: number) => {
  switch (period) {
    case 0:
      return "17h";
    case 1:
      return "17h50";
    case 2:
      return "18h40";
    case 3:
      return "19h30";
    case 4:
      return "20h20";
    case 5:
      return "21h10";
    case 6:
      return "22h";
    default:
      return "undefined";
  }
};
