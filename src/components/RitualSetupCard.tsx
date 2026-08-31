"use client";

import { useEffect, useState } from "react";
import { PanchangaSummary } from "@/components/PanchangaSummary";
import { RitualTypeSelector } from "@/components/RitualTypeSelector";
import {
  detectUserLocation,
  getGeolocationPermissionState,
  locationDefaultsFromBrowser,
  resolveCoordinates,
  resolveSetupLocation,
} from "@/lib/geolocation";
import { inferRitualTypeFromPanchanga, ritualTypeExplanationFromPanchanga, type CalendarInstant } from "@/lib/panchanga";
import { RitualTypeInferenceNote } from "@/components/RitualTypeInferenceNote";
import {
  COUNTRY_OPTIONS,
  DEFAULT_STATE_BY_COUNTRY,
  IN_STATES,
  US_STATES,
  formatLocationLabel,
  formatRitualDateLong,
  todayLocalDate,
  type UserConfig,
} from "@/lib/userConfig";

type SetupView = "loading" | "permission" | "summary" | "edit";

type RitualSetupCardProps = {
  config: UserConfig;
  calendarInstant: CalendarInstant | null;
  onConfigChange: (config: UserConfig) => void;
  onContinue: (config: UserConfig) => void;
};

function clearPreciseLocation(config: UserConfig): UserConfig {
  const { latitude: _lat, longitude: _lon, ...rest } = config;
  return rest;
}

export function RitualSetupCard({
  config,
  calendarInstant,
  onConfigChange,
  onContinue,
}: RitualSetupCardProps) {
  const [view, setView] = useState<SetupView>("loading");
  const [draft, setDraft] = useState(config);
  const [usedDefaults, setUsedDefaults] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [requestingLocation, setRequestingLocation] = useState(false);
  const [applyingEdits, setApplyingEdits] = useState(false);
  const showLocationFields = draft.country === "us" || draft.country === "in";
  const stateOptions = draft.country === "us" ? US_STATES : IN_STATES;
  const ritualDate = draft.ritualDate || todayLocalDate();
  const ritualInference = ritualTypeExplanationFromPanchanga(draft, calendarInstant);

  useEffect(() => {
    setDraft((current) => ({
      ...current,
      ritualType: config.ritualType,
      japaCount: config.japaCount,
    }));
  }, [config.japaCount, config.ritualType]);

  const applyResolvedLocation = async (base: UserConfig) => {
    setView("loading");
    setStatusMessage(null);
    const { config: resolved, usedDefaults: fellBack } = await resolveSetupLocation(base);
    setDraft(resolved);
    onConfigChange(resolved);
    setUsedDefaults(fellBack);
    setView("summary");
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const base = {
        ...config,
        ritualDate: todayLocalDate(),
      };
      setDraft(base);

      const permission = await getGeolocationPermissionState();
      if (cancelled) return;

      if (permission === "granted") {
        await applyResolvedLocation(base);
        return;
      }

      if (permission === "denied") {
        await applyResolvedLocation(base);
        return;
      }

      setView("permission");
    };

    void init();
    return () => {
      cancelled = true;
    };
    // Run once on mount; config from parent is only used for ritual preferences.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAllowLocation = async () => {
    setRequestingLocation(true);
    setStatusMessage(null);
    try {
      await applyResolvedLocation({ ...draft, ritualDate });
    } finally {
      setRequestingLocation(false);
    }
  };

  const handleContinueManually = async () => {
    setApplyingEdits(true);
    setStatusMessage(null);
    try {
      const next = {
        ...draft,
        ritualDate: draft.ritualDate || todayLocalDate(),
      };
      const canResolveLocation =
        (next.country === "us" || next.country === "in") && Boolean(next.state.trim());

      if (!canResolveLocation) {
        setStatusMessage("Select a country and state.");
        return;
      }

      const coords = await resolveCoordinates(clearPreciseLocation(next), { force: true });
      if (!coords) {
        setStatusMessage(
          "Could not find coordinates for this place. Try a different state or city.",
        );
        return;
      }

      const resolved = { ...next, ...coords };
      onConfigChange(resolved);
      onContinue(resolved);
    } finally {
      setApplyingEdits(false);
    }
  };

  if (view === "loading") {
    return (
      <section className="ritual-setup" aria-labelledby="ritual-setup-heading">
        <h2 id="ritual-setup-heading">Before you begin</h2>
        <p className="ritual-setup-lead">Finding your location and calculating today&apos;s panchanga…</p>
      </section>
    );
  }

  if (view === "permission") {
    return (
      <section className="ritual-setup" aria-labelledby="ritual-setup-heading">
        <h2 id="ritual-setup-heading">Before you begin</h2>
        <p className="ritual-setup-lead">
          Panchanga for sankalpa depends on where you are and the date. Allow location access so we
          can use your place for sunrise, tithi, and other details.
        </p>
        <p className="user-config-hint">
          If you prefer not to share location, we will use a default place based on your browser
          timezone (Karnataka for India, California for the United States).
        </p>
        {statusMessage && <p className="user-config-hint">{statusMessage}</p>}
        <div className="setup-actions">
          <button
            type="button"
            className="user-config-button user-config-button--primary"
            onClick={() => void handleAllowLocation()}
            disabled={requestingLocation}
          >
            {requestingLocation ? "Detecting…" : "Allow location access"}
          </button>
          <button
            type="button"
            className="user-config-button"
            onClick={() => void applyResolvedLocation({ ...draft, ritualDate })}
            disabled={requestingLocation}
          >
            Use default location
          </button>
          <button
            type="button"
            className="user-config-button"
            onClick={() => setView("edit")}
            disabled={requestingLocation}
          >
            Choose manually
          </button>
        </div>
      </section>
    );
  }

  if (view === "edit") {
    return (
      <section className="ritual-setup" aria-labelledby="ritual-setup-heading">
        <h2 id="ritual-setup-heading">Choose manually</h2>
        <p className="ritual-setup-lead">
          Select the ritual type, date, and location. You will continue to the guide when ready.
        </p>

        <RitualTypeSelector
          value={draft.ritualType}
          onChange={(ritualType) => setDraft({ ...draft, ritualType })}
        />

        <div className="user-config-field">
          <label className="section-label" htmlFor="ritual-setup-date">
            Date for sankalpa
          </label>
          <input
            id="ritual-setup-date"
            className="user-config-input"
            type="date"
            value={ritualDate}
            onChange={(event) =>
              setDraft({
                ...draft,
                ritualDate: event.target.value,
              })
            }
          />
        </div>

        <div className="user-config-field">
          <div className="user-config-row">
            <p className="section-label">Location</p>
            <button
              type="button"
              className="user-config-button"
              onClick={() => {
                setRequestingLocation(true);
                setStatusMessage(null);
                void detectUserLocation()
                  .then(async (detected) => {
                    const merged = {
                      ...draft,
                      ...detected,
                      ritualDate,
                    };
                    const coords =
                      merged.latitude != null && merged.longitude != null
                        ? { latitude: merged.latitude, longitude: merged.longitude }
                        : await resolveCoordinates(clearPreciseLocation(merged), { force: true });
                    const resolved = coords ? { ...merged, ...coords } : merged;
                    setDraft(resolved);
                    setUsedDefaults(false);
                  })
                  .catch(() => {
                    const defaults = locationDefaultsFromBrowser();
                    setDraft((current) => ({ ...current, ...defaults }));
                    setStatusMessage("Could not detect location.");
                  })
                  .finally(() => setRequestingLocation(false));
              }}
              disabled={requestingLocation || applyingEdits}
            >
              {requestingLocation ? "Detecting…" : "Use my location"}
            </button>
          </div>
        </div>

        <div className="user-config-field">
          <label className="section-label" htmlFor="ritual-setup-country">
            Country
          </label>
          <select
            id="ritual-setup-country"
            className="user-config-input"
            value={draft.country}
            onChange={(event) => {
              const country = event.target.value as UserConfig["country"];
              setDraft(
                clearPreciseLocation({
                  ...draft,
                  country,
                  state: DEFAULT_STATE_BY_COUNTRY[country],
                  city: "",
                }),
              );
            }}
          >
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {showLocationFields && (
          <>
            <div className="user-config-field">
              <label className="section-label" htmlFor="ritual-setup-state">
                State
              </label>
              <select
                id="ritual-setup-state"
                className="user-config-input"
                value={draft.state}
                onChange={(event) =>
                  setDraft(
                    clearPreciseLocation({
                      ...draft,
                      state: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select a state</option>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="user-config-field">
              <label className="section-label" htmlFor="ritual-setup-city">
                City
              </label>
              <input
                id="ritual-setup-city"
                className="user-config-input"
                type="text"
                value={draft.city}
                placeholder="City name (optional)"
                onChange={(event) =>
                  setDraft(
                    clearPreciseLocation({
                      ...draft,
                      city: event.target.value,
                    }),
                  )
                }
              />
            </div>
          </>
        )}

        {statusMessage && <p className="user-config-hint">{statusMessage}</p>}

        <div className="setup-actions">
          <button
            type="button"
            className="user-config-button user-config-button--primary"
            onClick={() => void handleContinueManually()}
            disabled={applyingEdits || requestingLocation}
          >
            {applyingEdits ? "Preparing…" : "Continue to guide"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ritual-setup" aria-labelledby="ritual-setup-heading">
      <h2 id="ritual-setup-heading">Before you begin</h2>
      <p className="ritual-setup-lead">
        Confirm today&apos;s panchanga for your location. These details are used in sankalpa and
        throughout the guide.
      </p>

      {ritualInference && (
        <RitualTypeInferenceNote explanation={ritualInference} variant="setup" />
      )}

      <dl className="setup-details">
        <div className="setup-details-item">
          <dt>Date</dt>
          <dd>{formatRitualDateLong(ritualDate)}</dd>
        </div>
        <div className="setup-details-item">
          <dt>Location</dt>
          <dd>{formatLocationLabel(draft)}</dd>
        </div>
      </dl>

      {usedDefaults && (
        <p className="user-config-hint">
          Location access was not available. Using the default place for your browser timezone.
        </p>
      )}

      <PanchangaSummary config={draft} calendarInstant={calendarInstant} />

      <div className="setup-actions">
        <button
          type="button"
          className="user-config-button user-config-button--primary"
          onClick={() => {
            const ritualType = inferRitualTypeFromPanchanga(draft, calendarInstant);
            onContinue({ ...draft, ritualType });
          }}
        >
          Continue
        </button>
        <button
          type="button"
          className="user-config-button"
          onClick={() => setView("edit")}
        >
          Choose manually
        </button>
      </div>
    </section>
  );
}
