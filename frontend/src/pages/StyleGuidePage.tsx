import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, Plus, Trash2, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { ThemeMode } from 'shared/types';

// Color definitions from STYLE-GUIDE.md
const COLORS = {
  base: [
    { name: 'bg', hex: '#09090b', hsl: '240 10% 4%', usage: 'Background' },
    { name: 'surface', hex: '#18181b', hsl: '240 6% 10%', usage: 'Cards, Container' },
    { name: 'border', hex: '#3f3f46', hsl: '240 4% 26%', usage: 'Borders' },
    { name: 'foreground', hex: '#fafafa', hsl: '0 0% 98%', usage: 'Text' },
    { name: 'muted', hex: '#a1a1aa', hsl: '240 4% 65%', usage: 'Secondary Text' },
  ],
  accent: [
    { name: 'primary', hex: '#a78bfa', usage: 'Actions, Links' },
    { name: 'research', hex: '#3b82f6', usage: 'Research Tasks' },
    { name: 'coding', hex: '#f97316', usage: 'Dev Tasks' },
    { name: 'notes', hex: '#eab308', usage: 'Notes' },
    { name: 'destructive', hex: '#ef4444', usage: 'Errors, Delete' },
    { name: 'success', hex: '#22c55e', usage: 'Success, Active' },
  ],
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ColorSwatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 border border-border"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="font-mono text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{hex}</p>
        <p className="text-xs text-muted-foreground">{usage}</p>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  const { theme, setTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold">STYLE GUIDE</h1>
            <p className="text-muted-foreground mt-1">
              Brutalist Design System - Knowledge Orchestrator
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
          >
            {theme === ThemeMode.DARK ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </header>

        {/* Typography */}
        <Section title="01. Typography">
          <div className="grid gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                font-sans // Inter // Bold // 32px
              </p>
              <h1 className="text-3xl font-bold">Technical Documentation</h1>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                font-sans // Inter // Semibold // 24px
              </p>
              <h2 className="text-2xl font-semibold">Component Specifications</h2>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                font-sans // Inter // Semibold // 18px
              </p>
              <h3 className="text-lg font-semibold">Section Header</h3>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                font-mono // JetBrains Mono // Regular // 14px
              </p>
              <p className="font-mono">
                The quick brown fox jumps over the lazy dog.
                <br />
                func initiate_sequence() -&gt; Void
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                font-sans // Inter // Regular // 14px
              </p>
              <p className="text-sm">
                High contrast UI design ensures readability in low-light
                environments. Essential for developer focused dashboards.
              </p>
            </div>
          </div>
        </Section>

        {/* Color Palette */}
        <Section title="02. Color Palette">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Base Colors</h3>
              <div className="space-y-4">
                {COLORS.base.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Accent Colors</h3>
              <div className="space-y-4">
                {COLORS.accent.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="03. Buttons">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button variant="icon" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="icon" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="xs">Extra Small</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Inputs */}
        <Section title="04. Input Components">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label className="text-xs uppercase tracking-wider mb-2 block">Default State</Label>
                <Input placeholder="Type command..." />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider mb-2 block">With Value</Label>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter text..."
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider mb-2 block">Disabled</Label>
                <Input disabled placeholder="Disabled input" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-xs uppercase tracking-wider mb-2 block">Select</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider mb-2 block">Textarea</Label>
                <Textarea placeholder="Enter description..." rows={3} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mt-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="checkbox-demo"
                checked={checkboxChecked}
                onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
              />
              <Label htmlFor="checkbox-demo">Enabled Option</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="checkbox-disabled" disabled />
              <Label htmlFor="checkbox-disabled" className="text-muted-foreground">
                Disabled Option
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="switch-demo"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
              <Label htmlFor="switch-demo">Toggle Switch</Label>
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section title="05. Card Anatomy">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">#RES-04</span>
                  <span className="text-muted-foreground">...</span>
                </div>
                <CardTitle className="text-base">Marktanalyse KI-Tools 2026</CardTitle>
                <CardDescription>Research task with blue left border</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-blue-500 border-blue-500">
                  #RESEARCH
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">#DEV-22</span>
                  <span className="text-muted-foreground">&lt;&gt;</span>
                </div>
                <CardTitle className="text-base">Refactor Sidebar Component</CardTitle>
                <CardDescription>Development task with orange left border</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-orange-500 border-orange-500">
                  #DEV-OPS
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">#NOTE</span>
                  <span className="text-muted-foreground">📝</span>
                </div>
                <CardTitle className="text-base">Meeting Notizen: UX Sync</CardTitle>
                <CardDescription>Notes task with yellow left border</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                  #NOTES
                </Badge>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Tags & Badges */}
        <Section title="06. Tags & Badges">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Type Tags</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-blue-500 border-blue-500">
                  #RESEARCH
                </Badge>
                <Badge variant="outline" className="text-orange-500 border-orange-500">
                  #DEV-OPS
                </Badge>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                  #NOTES
                </Badge>
                <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                  #IDLE
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Status Tags</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-green-500 border-green-500">
                  ACTIVE
                </Badge>
                <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                  IDLE
                </Badge>
                <Badge variant="outline" className="text-orange-500 border-orange-500">
                  BUSY
                </Badge>
                <Badge variant="outline" className="text-red-500 border-red-500">
                  ERROR
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Default Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </div>
        </Section>

        {/* Reference Images */}
        <Section title="07. Mockup Reference">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                design-system-brutalist.png
              </p>
              <img
                src="/dev/ux/mockups/design-system-brutalist.png"
                alt="Brutalist Design System"
                className="w-full border border-border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <p className="hidden text-sm text-muted-foreground mt-2">
                Image not available - check dev/ux/mockups/
              </p>
            </div>
            <div className="border border-border p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                design-system-stylesheet.png
              </p>
              <img
                src="/dev/ux/mockups/design-system-stylesheet.png"
                alt="Stylesheet Components"
                className="w-full border border-border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <p className="hidden text-sm text-muted-foreground mt-2">
                Image not available - check dev/ux/mockups/
              </p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Knowledge Orchestrator - Brutalist Design System v1.0</p>
          <p className="mt-1">Reference: dev/ux/STYLE-GUIDE.md</p>
        </footer>
      </div>
    </div>
  );
}
