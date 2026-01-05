import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cloneDeep, merge, isEqual } from 'lodash';
import { useTheme } from '@/components/ThemeProvider';
import { useUserSystem } from '@/components/ConfigProvider';
import type { Config } from 'shared/types';

interface SettingsFormState {
  draft: Config | null;
  dirty: boolean;
  saving: boolean;
  error: string | null;
  success: boolean;
  hasUnsavedChanges: boolean;
}

interface SettingsFormActions {
  updateDraft: (patch: Partial<Config>) => void;
  handleSave: () => Promise<void>;
  handleDiscard: () => void;
  resetDisclaimer: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

export function useSettingsForm(): SettingsFormState &
  SettingsFormActions & {
    config: Config | null;
    loading: boolean;
  } {
  const { t } = useTranslation(['settings']);
  const { config, loading, updateAndSaveConfig } = useUserSystem();
  const { setTheme } = useTheme();

  const [draft, setDraft] = useState<Config | null>(() =>
    config ? cloneDeep(config) : null
  );
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Sync draft when config loads (if not dirty)
  useEffect(() => {
    if (!config || dirty) return;
    setDraft(cloneDeep(config));
  }, [config, dirty]);

  const hasUnsavedChanges = useMemo(() => {
    if (!draft || !config) return false;
    return !isEqual(draft, config);
  }, [draft, config]);

  // Warn on tab close with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  const updateDraft = useCallback(
    (patch: Partial<Config>) => {
      setDraft((prev: Config | null) => {
        if (!prev) return prev;
        const next = merge({}, prev, patch);
        if (!isEqual(next, config)) {
          setDirty(true);
        }
        return next;
      });
    },
    [config]
  );

  const handleSave = useCallback(async () => {
    if (!draft) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateAndSaveConfig(draft);
      setTheme(draft.theme);
      setDirty(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(t('settings.general.save.error'));
      console.error('Error saving config:', err);
    } finally {
      setSaving(false);
    }
  }, [draft, updateAndSaveConfig, setTheme, t]);

  const handleDiscard = useCallback(() => {
    if (!config) return;
    setDraft(cloneDeep(config));
    setDirty(false);
  }, [config]);

  const resetDisclaimer = useCallback(async () => {
    if (!config) return;
    await updateAndSaveConfig({ disclaimer_acknowledged: false });
  }, [config, updateAndSaveConfig]);

  const resetOnboarding = useCallback(async () => {
    if (!config) return;
    await updateAndSaveConfig({ onboarding_acknowledged: false });
  }, [config, updateAndSaveConfig]);

  return {
    // State
    config,
    loading,
    draft,
    dirty,
    saving,
    error,
    success,
    hasUnsavedChanges,
    // Actions
    updateDraft,
    handleSave,
    handleDiscard,
    resetDisclaimer,
    resetOnboarding,
  };
}
