import Link from "next/link";
import { ReactNode } from "react";
import { GlyphIcon, type IconName } from "@/components/icons";

export function WorkspaceBadge({ initials }: { initials: string }) {
  return <div className="workspace-badge">{initials}</div>;
}

export function ToolButton({
  label,
  name,
  className = "",
  active = false,
}: {
  label: string;
  name: IconName;
  className?: string;
  active?: boolean;
}) {
  return (
    <button className={`icon-button ${active ? "active" : ""} ${className}`.trim()} aria-label={label}>
      <GlyphIcon name={name} className="icon-glyph" />
    </button>
  );
}

export function HeaderAction(props: { label: string; name: IconName; className?: string; active?: boolean }) {
  return <ToolButton {...props} className={`header-tool ${props.className ?? ""}`.trim()} />;
}

export function SidebarNavItem({
  href,
  icon,
  label,
  count,
  active = false,
  muted = false,
}: {
  href?: string;
  icon: IconName;
  label: string;
  count?: number;
  active?: boolean;
  muted?: boolean;
}) {
  const className = `nav-item ${active ? "active" : muted ? "muted" : ""}`.trim();
  const content = (
    <>
      <GlyphIcon name={icon} className="nav-icon" />
      <span>{label}</span>
      {typeof count === "number" ? <strong>{count}</strong> : null}
    </>
  );

  if (href) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return <a className={className}>{content}</a>;
}

export function SurfaceSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`sidebar-cluster ${className}`.trim()}>{children}</div>;
}
