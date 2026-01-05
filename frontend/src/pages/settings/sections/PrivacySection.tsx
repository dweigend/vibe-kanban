import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { Config } from 'shared/types';
import { SettingsSection } from './SettingsSection';

interface PrivacySectionProps {
  draft: Config | null;
  updateDraft: (patch: Partial<Config>) => void;
}

export function PrivacySection({ draft, updateDraft }: PrivacySectionProps) {
  const { t } = useTranslation(['settings']);

  return (
    <SettingsSection
      value="privacy"
      icon={Shield}
      title={t('settings.general.privacy.title')}
      description={t('settings.general.privacy.description')}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id="analytics-enabled"
          checked={draft?.analytics_enabled ?? false}
          onCheckedChange={(checked: boolean) =>
            updateDraft({ analytics_enabled: checked })
          }
        />
        <div className="space-y-0.5">
          <Label htmlFor="analytics-enabled" className="cursor-pointer">
            {t('settings.general.privacy.telemetry.label')}
          </Label>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.privacy.telemetry.helper')}
          </p>
        </div>
      </div>
    </SettingsSection>
  );
}
