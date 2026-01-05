import { useTranslation } from 'react-i18next';
import { Palette } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeMode, UiLanguage, type Config } from 'shared/types';
import { getLanguageOptions } from '@/i18n/languages';
import { toPrettyCase } from '@/utils/string';
import { SettingsSection } from './SettingsSection';

interface AppearanceSectionProps {
  draft: Config | null;
  updateDraft: (patch: Partial<Config>) => void;
}

export function AppearanceSection({
  draft,
  updateDraft,
}: AppearanceSectionProps) {
  const { t } = useTranslation(['settings', 'common']);

  const languageOptions = getLanguageOptions(
    t('language.browserDefault', {
      ns: 'common',
      defaultValue: 'Browser Default',
    })
  );

  return (
    <SettingsSection
      value="appearance"
      icon={Palette}
      title={t('settings.general.appearance.title')}
      description={t('settings.general.appearance.description')}
    >
      <div className="space-y-2">
        <Label htmlFor="theme">
          {t('settings.general.appearance.theme.label')}
        </Label>
        <Select
          value={draft?.theme}
          onValueChange={(value: ThemeMode) => updateDraft({ theme: value })}
        >
          <SelectTrigger id="theme">
            <SelectValue
              placeholder={t('settings.general.appearance.theme.placeholder')}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ThemeMode).map((theme) => (
              <SelectItem key={theme} value={theme}>
                {toPrettyCase(theme)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          {t('settings.general.appearance.theme.helper')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">
          {t('settings.general.appearance.language.label')}
        </Label>
        <Select
          value={draft?.language}
          onValueChange={(value: UiLanguage) =>
            updateDraft({ language: value })
          }
        >
          <SelectTrigger id="language">
            <SelectValue
              placeholder={t(
                'settings.general.appearance.language.placeholder'
              )}
            />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          {t('settings.general.appearance.language.helper')}
        </p>
      </div>
    </SettingsSection>
  );
}
