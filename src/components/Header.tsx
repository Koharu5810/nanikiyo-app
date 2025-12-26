type HeaderProps = {
  dayLabel: string;
  dayText: string;
};

export function Header({ dayLabel, dayText }: HeaderProps) {
  return (
    <div className="weather-card-header">
      <div className="day-label">{dayLabel}</div>
      <div className="day-text">{dayText}</div>
    </div>
  );
}
