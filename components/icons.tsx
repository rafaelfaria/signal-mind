import { ReactElement } from "react";

export type IconName =
  | "inbox"
  | "drafts"
  | "projects"
  | "views"
  | "automation"
  | "team"
  | "priority"
  | "settings"
  | "notification"
  | "person"
  | "flag"
  | "status"
  | "members"
  | "releases"
  | "customize"
  | "search"
  | "compose"
  | "filter"
  | "display"
  | "link"
  | "branch"
  | "send"
  | "analytics"
  | "chevronDown"
  | "chevronRight"
  | "panelLeft";

function IconGlyph({ name }: { name: IconName }) {
  switch (name) {
    case "inbox":
      return <path d="M3.75 5.75A1.75 1.75 0 0 1 5.5 4h13a1.75 1.75 0 0 1 1.75 1.75v12.5A1.75 1.75 0 0 1 18.5 20h-13a1.75 1.75 0 0 1-1.75-1.75zm0 7h5l1.35 2h3.8l1.35-2h5" />;
    case "drafts":
      return <path d="M6.5 4.75h8.2l3.3 3.3v11.2a1.5 1.5 0 0 1-1.5 1.5H6.5A1.5 1.5 0 0 1 5 19.25v-13A1.5 1.5 0 0 1 6.5 4.75Zm8-.1v3.9h3.85M8 12h8M8 15.5h5" />;
    case "projects":
      return <path d="M4.75 7.5h6.5v10.25h-6.5zm8 0h6.5v6.5h-6.5zm0 8h6.5v2.25a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1z" />;
    case "views":
      return <path d="M4.75 6.25h14.5M4.75 12h14.5M4.75 17.75h14.5M7 4.75v14.5" />;
    case "automation":
      return <path d="M12 3.75v3m0 10.5v3m8.25-8.25h-3m-10.5 0h-3m11.08-5.83-2.12 2.12m-3.92 7.66-2.12 2.12m8.16 0-2.12-2.12M8.79 8.29 6.67 6.17M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />;
    case "team":
    case "members":
      return <path d="M8.25 11a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Zm7.25 1.5A2.25 2.25 0 1 0 15.5 8a2.25 2.25 0 0 0 0 4.5ZM4.75 18.75v-.7c0-2.05 2.15-3.8 5-3.8s5 1.75 5 3.8v.7m1.75 0v-.45c0-1.38-1.07-2.6-2.7-3.22" />;
    case "priority":
    case "flag":
      return <path d="M6.5 20V5m0 1h8.35l-1.55 3 1.55 3H6.5" />;
    case "settings":
    case "customize":
      return <path d="M12 4.5v2.25m0 10.5v2.25m7.5-7.5h-2.25M6.75 12H4.5m10.6-4.85-1.6 1.6m-3 6.1-1.6 1.6m6.2 0-1.6-1.6m-3-6.1-1.6-1.6M12 8.75A3.25 3.25 0 1 1 12 15.25 3.25 3.25 0 0 1 12 8.75Z" />;
    case "notification":
      return <path d="M12 4.5a4 4 0 0 0-4 4v1.15c0 .72-.23 1.43-.66 2.01L6 13.5h12l-1.34-1.84A3.5 3.5 0 0 1 16 9.65V8.5a4 4 0 0 0-4-4Zm-1.9 11.5a1.9 1.9 0 0 0 3.8 0" />;
    case "person":
      return <path d="M12 12a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Zm-5.5 6.25c.6-2.15 2.8-3.5 5.5-3.5s4.9 1.35 5.5 3.5" />;
    case "status":
      return <path d="M6.25 6.75h11.5M6.25 12h8M6.25 17.25h5.5M4.75 6.75h.5m-.5 5.25h.5m-.5 5.25h.5" />;
    case "releases":
      return <path d="M12 4.25c1.3 1.95 3.8 3.13 6.25 3-.2 5.4-2.72 9.76-6.25 12.5-3.53-2.74-6.05-7.1-6.25-12.5 2.45.13 4.95-1.05 6.25-3ZM12 9.5v4.25m0 0 2-2m-2 2-2-2" />;
    case "search":
      return <path d="M11 18a7 7 0 1 1 4.95-2.05L20 20" />;
    case "compose":
      return <path d="m6 18 1.5-4.5L15.75 5.25a1.6 1.6 0 1 1 2.25 2.25L9.75 15.75Zm0 0L10.75 16" />;
    case "filter":
      return <path d="M4.75 7.25h14.5M7.75 12h8.5M10.25 16.75h3.5" />;
    case "display":
      return <path d="M4.75 7h14.5M4.75 12h14.5M4.75 17h14.5M8.25 5.75v2.5m7.5 2.5v2.5m-4.5 2.5v2.5" />;
    case "link":
      return <path d="M10 8.5H8.75a3.75 3.75 0 1 0 0 7.5H10m4-7.5h1.25a3.75 3.75 0 1 1 0 7.5H14m-4 0h4" />;
    case "branch":
      return <path d="M8 6.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0v9a2.5 2.5 0 0 0 2.5 2.5h1.25M16 13.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v4.5" />;
    case "send":
      return <path d="M4.75 12 19 5.75l-3 12.5-4.5-4-3.25 2.5.75-4.75Z" />;
    case "analytics":
      return <path d="M6.5 17.5v-5m5 5v-10m5 10v-7.5M4.75 19.25h14.5" />;
    case "chevronDown":
      return <path d="m7.5 10 4.5 4.5 4.5-4.5" />;
    case "chevronRight":
      return <path d="m10 7.5 4.5 4.5-4.5 4.5" />;
    case "panelLeft":
      return <path d="M5.75 5h12.5A1.75 1.75 0 0 1 20 6.75v10.5A1.75 1.75 0 0 1 18.25 19H5.75A1.75 1.75 0 0 1 4 17.25V6.75A1.75 1.75 0 0 1 5.75 5Zm3 0v14" />;
  }
}

type BaseIconProps = {
  name: IconName;
  className?: string;
};

function SvgIcon({ name }: { name: IconName }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <IconGlyph name={name} />
    </svg>
  );
}

export function NavIcon({ name, className = "" }: BaseIconProps) {
  return (
    <span className={`nav-icon ${className}`.trim()} aria-hidden="true">
      <SvgIcon name={name} />
    </span>
  );
}

export function MiniIcon({ name, className = "" }: BaseIconProps) {
  return (
    <span className={`mini-icon ${className}`.trim()} aria-hidden="true">
      <SvgIcon name={name} />
    </span>
  );
}

export function GlyphIcon({ name, className = "" }: BaseIconProps) {
  return (
    <span className={className} aria-hidden="true">
      <SvgIcon name={name} />
    </span>
  );
}
