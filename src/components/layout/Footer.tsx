import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { site, socials } from "@/lib/site";

const links = [
  { key: "github", href: socials.github, label: "GitHub", Icon: Github },
  { key: "linkedin", href: socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { key: "twitter", href: socials.twitter, label: "Twitter", Icon: Twitter },
].filter((l) => l.href);

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          {links.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-fg"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-fg"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
