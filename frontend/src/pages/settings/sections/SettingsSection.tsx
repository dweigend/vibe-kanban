import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface SettingsSectionProps {
  value: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({
  value,
  icon: Icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <AccordionItem value={value} className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
