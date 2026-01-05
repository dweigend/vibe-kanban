import { useTranslation } from 'react-i18next';
import { Code } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EditorType, type Config } from 'shared/types';
import { toPrettyCase } from '@/utils/string';
import { useEditorAvailability } from '@/hooks/useEditorAvailability';
import { EditorAvailabilityIndicator } from '@/components/EditorAvailabilityIndicator';
import { SettingsSection } from './SettingsSection';

interface EditorSectionProps {
  draft: Config | null;
  updateDraft: (patch: Partial<Config>) => void;
}

const EDITORS_WITH_SSH = [
  EditorType.VS_CODE,
  EditorType.CURSOR,
  EditorType.WINDSURF,
];

export function EditorSection({ draft, updateDraft }: EditorSectionProps) {
  const { t } = useTranslation(['settings']);
  const editorAvailability = useEditorAvailability(draft?.editor.editor_type);

  const isCustomEditor = draft?.editor.editor_type === EditorType.CUSTOM;
  const supportsSsh =
    draft?.editor.editor_type &&
    EDITORS_WITH_SSH.includes(draft.editor.editor_type);

  const updateEditor = (patch: Partial<Config['editor']>) => {
    if (!draft) return;
    updateDraft({ editor: { ...draft.editor, ...patch } });
  };

  return (
    <SettingsSection
      value="editor"
      icon={Code}
      title={t('settings.general.editor.title')}
      description={t('settings.general.editor.description')}
    >
      <div className="space-y-2">
        <Label htmlFor="editor-type">
          {t('settings.general.editor.type.label')}
        </Label>
        <Select
          value={draft?.editor.editor_type}
          onValueChange={(value: EditorType) =>
            updateEditor({ editor_type: value })
          }
        >
          <SelectTrigger id="editor-type">
            <SelectValue
              placeholder={t('settings.general.editor.type.placeholder')}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.values(EditorType).map((editor) => (
              <SelectItem key={editor} value={editor}>
                {toPrettyCase(editor)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!isCustomEditor && (
          <EditorAvailabilityIndicator availability={editorAvailability} />
        )}

        <p className="text-sm text-muted-foreground">
          {t('settings.general.editor.type.helper')}
        </p>
      </div>

      {isCustomEditor && (
        <div className="space-y-2">
          <Label htmlFor="custom-command">
            {t('settings.general.editor.customCommand.label')}
          </Label>
          <Input
            id="custom-command"
            placeholder={t('settings.general.editor.customCommand.placeholder')}
            value={draft?.editor.custom_command || ''}
            onChange={(e) =>
              updateEditor({ custom_command: e.target.value || null })
            }
          />
          <p className="text-sm text-muted-foreground">
            {t('settings.general.editor.customCommand.helper')}
          </p>
        </div>
      )}

      {supportsSsh && (
        <>
          <div className="space-y-2">
            <Label htmlFor="remote-ssh-host">
              {t('settings.general.editor.remoteSsh.host.label')}
            </Label>
            <Input
              id="remote-ssh-host"
              placeholder={t(
                'settings.general.editor.remoteSsh.host.placeholder'
              )}
              value={draft?.editor.remote_ssh_host || ''}
              onChange={(e) =>
                updateEditor({ remote_ssh_host: e.target.value || null })
              }
            />
            <p className="text-sm text-muted-foreground">
              {t('settings.general.editor.remoteSsh.host.helper')}
            </p>
          </div>

          {draft?.editor.remote_ssh_host && (
            <div className="space-y-2">
              <Label htmlFor="remote-ssh-user">
                {t('settings.general.editor.remoteSsh.user.label')}
              </Label>
              <Input
                id="remote-ssh-user"
                placeholder={t(
                  'settings.general.editor.remoteSsh.user.placeholder'
                )}
                value={draft?.editor.remote_ssh_user || ''}
                onChange={(e) =>
                  updateEditor({ remote_ssh_user: e.target.value || null })
                }
              />
              <p className="text-sm text-muted-foreground">
                {t('settings.general.editor.remoteSsh.user.helper')}
              </p>
            </div>
          )}
        </>
      )}
    </SettingsSection>
  );
}
