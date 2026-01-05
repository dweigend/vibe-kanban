import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsSection } from './SettingsSection';

interface SafetySectionProps {
  resetDisclaimer: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

export function SafetySection({
  resetDisclaimer,
  resetOnboarding,
}: SafetySectionProps) {
  const { t } = useTranslation(['settings']);

  return (
    <SettingsSection
      value="safety"
      icon={AlertTriangle}
      title={t('settings.general.safety.title')}
      description={t('settings.general.safety.description')}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            {t('settings.general.safety.disclaimer.title')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.safety.disclaimer.description')}
          </p>
        </div>
        <Button variant="outline" onClick={resetDisclaimer}>
          {t('settings.general.safety.disclaimer.button')}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            {t('settings.general.safety.onboarding.title')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.safety.onboarding.description')}
          </p>
        </div>
        <Button variant="outline" onClick={resetOnboarding}>
          {t('settings.general.safety.onboarding.button')}
        </Button>
      </div>
    </SettingsSection>
  );
}
