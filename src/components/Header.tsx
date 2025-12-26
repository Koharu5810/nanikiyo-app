type HeaderProps = {
  label: string;
  icon: string;
};

export function Header({ label, icon }: HeaderProps) {
  return (
    <div className="weather-card-header">
      <span className="day-label">{label}</span>

      <img
        src={`/icons/weather/${icon}.svg`}
        alt=""
        className="weather-icon"
      />
    </div>
  );
}