const steps = [
  {
    number: "01",
    title: "Zgjidh eventin",
    text: "Shfleto koncerte, festivale dhe konferenca në të gjithë Shqipërinë.",
  },
  {
    number: "02",
    title: "Blej biletën",
    text: "Plotëso të dhënat dhe merr menjëherë kodin unik të biletës.",
  },
  {
    number: "03",
    title: "Hyr me QR",
    text: "Shfaq kodin QR te dera — stafi e verifikon në sekonda.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp text-center">
        Si funksionon
      </p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink tracking-wide text-center">
        Tre hapa deri te bileta jote
      </h2>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={step.number} className="relative text-center px-4">
            <span className="font-display text-6xl text-ink/10 leading-none">
              {step.number}
            </span>
            <h3 className="mt-2 font-display text-2xl tracking-wide text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-ink/60 font-body leading-relaxed">
              {step.text}
            </p>
            {i < steps.length - 1 && (
              <span className="hidden sm:block absolute top-8 -right-4 text-ink/20 font-display text-2xl">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
