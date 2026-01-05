import { useTranslation } from 'react-i18next';
import { Bell, Volume2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SoundFile, type Config } from 'shared/types';
import { toPrettyCase } from '@/utils/string';
import { SettingsSection } from './SettingsSection';

interface NotificationsSectionProps {
  draft: Config | null;
  updateDraft: (patch: Partial<Config>) => void;
}

async function playSound(soundFile: SoundFile): Promise<void> {
  const audio = new Audio(`/api/sounds/${soundFile}`);
  try {
    await audio.play();
  } catch (err) {
    console.error('Failed to play sound:', err);
  }
}

export function NotificationsSection({
  draft,
  updateDraft,
}: NotificationsSectionProps) {
  const { t } = useTranslation(['settings']);

  const updateNotifications = (patch: Partial<Config['notifications']>) => {
    if (!draft) return;
    updateDraft({ notifications: { ...draft.notifications, ...patch } });
  };

  const soundEnabled = draft?.notifications.sound_enabled;

  return (
    <SettingsSection
      value="notifications"
      icon={Bell}
      title={t('settings.general.notifications.title')}
      description={t('settings.general.notifications.description')}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id="sound-enabled"
          checked={soundEnabled}
          onCheckedChange={(checked: boolean) =>
            updateNotifications({ sound_enabled: checked })
          }
        />
        <div className="space-y-0.5">
          <Label htmlFor="sound-enabled" className="cursor-pointer">
            {t('settings.general.notifications.sound.label')}
          </Label>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.notifications.sound.helper')}
          </p>
        </div>
      </div>

      {soundEnabled && draft && (
        <div className="ml-6 space-y-2">
          <Label htmlFor="sound-file">
            {t('settings.general.notifications.sound.fileLabel')}
          </Label>
          <div className="flex gap-2">
            <Select
              value={draft.notifications.sound_file}
              onValueChange={(value: SoundFile) =>
                updateNotifications({ sound_file: value })
              }
            >
              <SelectTrigger id="sound-file" className="flex-1">
                <SelectValue
                  placeholder={t(
                    'settings.general.notifications.sound.filePlaceholder'
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SoundFile).map((sf) => (
                  <SelectItem key={sf} value={sf}>
                    {toPrettyCase(sf)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => playSound(draft.notifications.sound_file)}
              className="px-3"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.notifications.sound.fileHelper')}
          </p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="push-notifications"
          checked={draft?.notifications.push_enabled}
          onCheckedChange={(checked: boolean) =>
            updateNotifications({ push_enabled: checked })
          }
        />
        <div className="space-y-0.5">
          <Label htmlFor="push-notifications" className="cursor-pointer">
            {t('settings.general.notifications.push.label')}
          </Label>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.notifications.push.helper')}
          </p>
        </div>
      </div>
    </SettingsSection>
  );
}
