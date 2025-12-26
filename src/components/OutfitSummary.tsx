type OutfitSummaryProps = {
  icon: string;
  label: string;
  description?: string;
};

export function OutfitSummary({
  icon,
  label,
  // description,
}: OutfitSummaryProps) {
  return (
    <div className="outfit-summary">
      <img
        src={`/icons/outfit/${icon}.svg`}
        alt={label}
        className="outfit-icon"
      />
      <p className="outfit-label">{label}</p>

      {/* {description && (
          <p className="outfit-description">
            {description}
          </p>
        )} */}
    </div>
  );
}