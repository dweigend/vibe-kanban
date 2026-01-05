import { useTranslation } from 'react-i18next';
import { GitPullRequest } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DEFAULT_PR_DESCRIPTION_PROMPT, type Config } from 'shared/types';
import { SettingsSection } from './SettingsSection';

interface PullRequestsSectionProps {
  draft: Config | null;
  updateDraft: (patch: Partial<Config>) => void;
}

export function PullRequestsSection({
  draft,
  updateDraft,
}: PullRequestsSectionProps) {
  const { t } = useTranslation(['settings']);

  const isCustomPromptEnabled = draft?.pr_auto_description_prompt != null;

  const toggleCustomPrompt = (checked: boolean) => {
    updateDraft({
      pr_auto_description_prompt: checked
        ? DEFAULT_PR_DESCRIPTION_PROMPT
        : null,
    });
  };

  return (
    <SettingsSection
      value="pull-requests"
      icon={GitPullRequest}
      title={t('settings.general.pullRequests.title')}
      description={t('settings.general.pullRequests.description')}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id="pr-auto-description"
          checked={draft?.pr_auto_description_enabled ?? false}
          onCheckedChange={(checked: boolean) =>
            updateDraft({ pr_auto_description_enabled: checked })
          }
        />
        <div className="space-y-0.5">
          <Label htmlFor="pr-auto-description" className="cursor-pointer">
            {t('settings.general.pullRequests.autoDescription.label')}
          </Label>
          <p className="text-sm text-muted-foreground">
            {t('settings.general.pullRequests.autoDescription.helper')}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="use-custom-prompt"
          checked={isCustomPromptEnabled}
          onCheckedChange={toggleCustomPrompt}
        />
        <Label htmlFor="use-custom-prompt" className="cursor-pointer">
          {t('settings.general.pullRequests.customPrompt.useCustom')}
        </Label>
      </div>

      <div className="space-y-2">
        <textarea
          id="pr-custom-prompt"
          className={`flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            !isCustomPromptEnabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          value={
            draft?.pr_auto_description_prompt ?? DEFAULT_PR_DESCRIPTION_PROMPT
          }
          disabled={!isCustomPromptEnabled}
          onChange={(e) =>
            updateDraft({ pr_auto_description_prompt: e.target.value })
          }
        />
        <p className="text-sm text-muted-foreground">
          {t('settings.general.pullRequests.customPrompt.helper')}
        </p>
      </div>
    </SettingsSection>
  );
}
