import type { AccessoryView } from "@/types/accessory";

type OutfitSummaryProps = {
  icon: string;
  label: string;
  description?: string;
  accessories?: AccessoryView[];
};

export function OutfitSummary({
  icon,
  label,
  // description,
  accessories,
}: OutfitSummaryProps) {
  return (
    <div className="outfit-summary">
      <img
        src={`/icons/outfit/${icon}.svg`}
        alt={label}
        className="outfit-icon"
      />

      {accessories && accessories.length > 0 && (
        <div className="accessories">
          {accessories.slice(0, 3).map((a) => (
            <div key={a.type} className="accessory-badge">
              {a.icon && (
                <img
                  src={`/icons/outfit/${a.icon}.svg`}
                  alt={a.label}
                  className="accessory-icon"
                />
              )}

              <div className="accessory-badge">
                {a.IconComponent && (
                  <a.IconComponent className="accessory-icon" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="outfit-label">{label}</p>

      {/* {description && (
          <p className="outfit-description">
            {description}
          </p>
        )} */}
    </div>
  );
}