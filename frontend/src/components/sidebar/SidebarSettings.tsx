import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Settings } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSettingsForm } from '@/pages/settings/useSettingsForm';
import {
  AppearanceSection,
  EditorSection,
  GitSection,
  PullRequestsSection,
  NotificationsSection,
  PrivacySection,
  TaskTemplatesSection,
  SafetySection,
} from '@/pages/settings/sections';

const DEFAULT_OPEN_SECTIONS = ['appearance'];

export function SidebarSettings() {
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
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>{t('settings.general.loadError')}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <Settings className="h-4 w-4" />
        <h2 className="font-semibold">{t('settings.general.title')}</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
      </div>

      {/* Sticky Save Bar */}
      <div className="border-t bg-background p-4">
        <div className="flex items-center justify-between gap-2">
          {hasUnsavedChanges ? (
            <span className="text-xs text-muted-foreground">
              {t('settings.general.save.unsavedChanges')}
            </span>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDiscard}
              disabled={!hasUnsavedChanges || saving}
            >
              {t('settings.general.save.discard')}
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasUnsavedChanges || saving || !!branchPrefixError}
            >
              {saving && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              {t('settings.general.save.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
