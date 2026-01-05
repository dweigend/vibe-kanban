import { useTranslation } from 'react-i18next';
import { Tags } from 'lucide-react';
import { TagManager } from '@/components/TagManager';
import { SettingsSection } from './SettingsSection';

export function TaskTemplatesSection() {
  const { t } = useTranslation(['settings']);

  return (
    <SettingsSection
      value="task-templates"
      icon={Tags}
      title={t('settings.general.taskTemplates.title')}
      description={t('settings.general.taskTemplates.description')}
    >
      <TagManager />
    </SettingsSection>
  );
}
