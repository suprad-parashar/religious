"use client";

import {
  japaOptionsForRitual,
  marriedLabel,
  upperGarmentLabel,
  type JapaCount,
  type UserConfig,
} from "@/lib/userConfig";

type GuidePreferencesCardProps = {
  config: UserConfig;
  onChange: (config: UserConfig) => void;
};

export function GuidePreferencesCard({ config, onChange }: GuidePreferencesCardProps) {
  const japaOptions = japaOptionsForRitual(config.ritualType);

  return (
    <section className="user-config" aria-labelledby="guide-preferences-heading">
      <h2 id="guide-preferences-heading">Preferences</h2>

      <div className="user-config-field">
        <p className="section-label">Marital status</p>
        <div className="user-config-options">
          {[true, false].map((married) => (
            <label key={String(married)} className="user-config-choice">
              <input
                type="radio"
                name="married"
                checked={config.married === married}
                onChange={() => onChange({ ...config, married })}
              />
              {marriedLabel(married)}
            </label>
          ))}
        </div>
      </div>

      <div className="user-config-field">
        <p className="section-label">Upper garment</p>
        <div className="user-config-options">
          {[true, false].map((wearsYagnopaveetam) => (
            <label key={String(wearsYagnopaveetam)} className="user-config-choice">
              <input
                type="radio"
                name="wearsYagnopaveetam"
                checked={config.wearsYagnopaveetam === wearsYagnopaveetam}
                onChange={() => onChange({ ...config, wearsYagnopaveetam })}
              />
              {upperGarmentLabel(wearsYagnopaveetam)}
            </label>
          ))}
        </div>
        <p className="user-config-hint">
          Choose Yagnopaveetam if you wear the sacred thread instead of an Uttariya.
        </p>
      </div>

      {config.ritualType === "upakarma" && (
        <div className="user-config-field">
          <p className="section-label">Japa count</p>
          <div className="user-config-options">
            {japaOptions.map((option) => (
              <label key={String(option.value)} className="user-config-choice">
                <input
                  type="radio"
                  name="japaCount"
                  value={String(option.value)}
                  checked={config.japaCount === option.value}
                  onChange={() =>
                    onChange({
                      ...config,
                      japaCount: option.value as JapaCount,
                    })
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
