import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GitBranch } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { Config } from 'shared/types';
import { SettingsSection } from './SettingsSection';

interface GitSectionProps {
  draft: Config | null;
  updateDraft: (patch: Partial<Config>) => void;
  branchPrefixError: string | null;
  setBranchPrefixError: (error: string | null) => void;
}

export function GitSection({
  draft,
  updateDraft,
  branchPrefixError,
  setBranchPrefixError,
}: GitSectionProps) {
  const { t } = useTranslation(['settings']);

  const validateBranchPrefix = useCallback(
    (prefix: string): string | null => {
      if (!prefix) return null;
      if (prefix.includes('/'))
        return t('settings.general.git.branchPrefix.errors.slash');
      if (prefix.startsWith('.'))
        return t('settings.general.git.branchPrefix.errors.startsWithDot');
      if (prefix.endsWith('.') || prefix.endsWith('.lock'))
        return t('settings.general.git.branchPrefix.errors.endsWithDot');
      if (prefix.includes('..') || prefix.includes('@{'))
        return t('settings.general.git.branchPrefix.errors.invalidSequence');
      if (/[ \t~^:?*[\\]/.test(prefix))
        return t('settings.general.git.branchPrefix.errors.invalidChars');

      for (let i = 0; i < prefix.length; i++) {
        const code = prefix.charCodeAt(i);
        if (code < 0x20 || code === 0x7f)
          return t('settings.general.git.branchPrefix.errors.controlChars');
      }
      return null;
    },
    [t]
  );

  const handleChange = (value: string) => {
    const trimmed = value.trim();
    updateDraft({ git_branch_prefix: trimmed });
    setBranchPrefixError(validateBranchPrefix(trimmed));
  };

  const branchPreview = draft?.git_branch_prefix
    ? t('settings.general.git.branchPrefix.previewWithPrefix', {
        prefix: draft.git_branch_prefix,
      })
    : t('settings.general.git.branchPrefix.previewNoPrefix');

  return (
    <SettingsSection
      value="git"
      icon={GitBranch}
      title={t('settings.general.git.title')}
      description={t('settings.general.git.description')}
    >
      <div className="space-y-2">
        <Label htmlFor="git-branch-prefix">
          {t('settings.general.git.branchPrefix.label')}
        </Label>
        <Input
          id="git-branch-prefix"
          type="text"
          placeholder={t('settings.general.git.branchPrefix.placeholder')}
          value={draft?.git_branch_prefix ?? ''}
          onChange={(e) => handleChange(e.target.value)}
          aria-invalid={!!branchPrefixError}
          className={branchPrefixError ? 'border-destructive' : undefined}
        />
        {branchPrefixError && (
          <p className="text-sm text-destructive">{branchPrefixError}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {t('settings.general.git.branchPrefix.helper')}{' '}
          {t('settings.general.git.branchPrefix.preview')}{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            {branchPreview}
          </code>
        </p>
      </div>
    </SettingsSection>
  );
}
