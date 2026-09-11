import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-[720px] flex-col items-start justify-center px-5 pt-20 md:px-8">
      <p className="font-mono text-[13px] text-accent-ink">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tighter md:text-6xl">
        Seite nicht gefunden.
      </h1>
      <p className="mt-4 text-[16px] text-muted">
        Die angeforderte Seite existiert nicht oder wurde verschoben. / This page does not exist.
      </p>
      <Link
        href="/de"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-7 text-[15px] font-semibold text-foreground hover:bg-[#e07f00]"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
