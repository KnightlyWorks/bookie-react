import { Link } from "react-router";
import projectLogo from "@assets/Logo.svg";
import githubLogo from "@assets/GitHub_Invertocat_Black.svg";
import ExternalLink from "@components/ui/Links/ExternalLink";

export function Footer() {
  return (
    <footer className="bg-surface border-border mt-auto w-full border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* logo */}
          <div className="space-y-2">
            <img src={projectLogo} />
            <p className="text-text-secondary text-md max-w-xs">
              Search millions of books on the Google Books. Save your targets, log what you read.
            </p>
            {/*Need changes when adds Open lib */}
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">Navigation</h3>
            <nav className="text-text-secondary flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">
                Search
              </Link>

              <Link to="/favorite" className="hover:text-primary transition-colors">
                Favorites
              </Link>
            </nav>{" "}
            {/*When more pages add glob-like pattern */}
          </div>

          {/* Attribution & Credits */}
          <div className="space-y-6">
            <section aria-label="Data source">
              <h3 className="text-text-primary *:text-text-secondary text-sm font-semibold tracking-wider uppercase *:mt-2 *:italic">
                Powered by
              </h3>
              <span>Google Books API</span>
            </section>
            <section>
              <h3 className="text-text-primary text-xs font-semibold tracking-widest uppercase opacity-70">
                Author
              </h3>
              <div className="text-text-secondary mt-2 flex flex-col gap-3">
                <ExternalLink
                  src={githubLogo}
                  alt={"GitHub"}
                  href={"https://github.com/KnightlyWorks"}
                  text={"KnightlyWorks"}
                />
              </div>
            </section>
          </div>
        </div>

        <div className="border-border/50 mt-12 border-t pt-6 text-center">
          <p className="text-text-secondary text-xs opacity-60">
            © {new Date().getFullYear()} LuminaBookie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
