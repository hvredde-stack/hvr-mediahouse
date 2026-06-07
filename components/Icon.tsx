import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

type IconProps = LucideProps & { name: string };

/** Renders any lucide-react icon by its name (see https://lucide.dev/icons). */
export function Icon({ name, ...props }: IconProps) {
  const icons = LucideIcons as unknown as Record<
    string,
    ComponentType<LucideProps>
  >;
  const Cmp = icons[name] ?? LucideIcons.Sparkles;
  return <Cmp {...props} />;
}
