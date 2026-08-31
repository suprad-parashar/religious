"use client";

import { RITUAL_TYPE_OPTIONS, type RitualType } from "@/lib/userConfig";

type RitualTypeSelectorProps = {
  value: RitualType;
  onChange: (ritualType: RitualType) => void;
};

export function RitualTypeSelector({ value, onChange }: RitualTypeSelectorProps) {
  return (
    <section className="ritual-type" aria-labelledby="ritual-type-heading">
      <h2 id="ritual-type-heading">Ritual type</h2>
      <div className="user-config-options">
        {RITUAL_TYPE_OPTIONS.map((option) => (
          <label key={option.value} className="user-config-choice user-config-choice--stacked">
            <input
              type="radio"
              name="ritualType"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="user-config-choice-label">{option.label}</span>
            <span className="user-config-choice-hint">{option.hint}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
