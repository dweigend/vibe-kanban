import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSettingsForm } from './useSettingsForm';
import {
  AppearanceSection,
  EditorSection,
  GitSection,
  PullRequestsSection,
  NotificationsSection,
  PrivacySection,
  TaskTemplatesSection,
  SafetySection,
} from './sections';

const DEFAULT_OPEN_SECTIONS = ['appearance', 'editor'];

export function GeneralSettings() {
  const { t } = useTranslation(['settings']);
  const [branchPrefixError, setBranchPrefixError] = useState<string | null>(
    null
  );

  const {
    loading,
    draft,
    error,
    success,
    saving,
    hasUnsavedChanges,
    updateDraft,
    handleSave,
    handleDiscard,
    resetDisclaimer,
    resetOnboarding,
  } = useSettingsForm();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{t('settings.general.loading')}</span>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="py-8">
        <Alert variant="destructive">
          <AlertDescription>{t('settings.general.loadError')}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          <AlertDescription className="font-medium">
            {t('settings.general.save.success')}
          </AlertDescription>
        </Alert>
      )}

      <Accordion
        type="multiple"
        defaultValue={DEFAULT_OPEN_SECTIONS}
        className="space-y-2"
      >
        <AppearanceSection draft={draft} updateDraft={updateDraft} />
        <EditorSection draft={draft} updateDraft={updateDraft} />
        <GitSection
          draft={draft}
          updateDraft={updateDraft}
          branchPrefixError={branchPrefixError}
          setBranchPrefixError={setBranchPrefixError}
        />
        <PullRequestsSection draft={draft} updateDraft={updateDraft} />
        <NotificationsSection draft={draft} updateDraft={updateDraft} />
        <PrivacySection draft={draft} updateDraft={updateDraft} />
        <TaskTemplatesSection />
        <SafetySection
          resetDisclaimer={resetDisclaimer}
          resetOnboarding={resetOnboarding}
        />
      </Accordion>

      {/* Sticky Save Bar */}
      <div className="sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm border-t py-4">
        <div className="flex items-center justify-between">
          {hasUnsavedChanges ? (
            <span className="text-sm text-muted-foreground">
              {t('settings.general.save.unsavedChanges')}
            </span>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDiscard}
              disabled={!hasUnsavedChanges || saving}
            >
              {t('settings.general.save.discard')}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || saving || !!branchPrefixError}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('settings.general.save.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
