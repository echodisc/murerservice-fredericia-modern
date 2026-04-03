import { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ navn: '', telefon: '', besked: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = {
      navn: form.navn.trim(),
      telefon: form.telefon.trim(),
      besked: form.besked.trim(),
    };
    if (!trimmed.navn || !trimmed.telefon || !trimmed.besked) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-[440px] rounded-2xl p-10 text-center bg-card border border-border">
        <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'hsl(var(--red-accent) / 0.1)' }}>
          <span className="text-xl" style={{ color: 'hsl(var(--red-accent))' }}>✓</span>
        </div>
        <p className="text-foreground text-lg font-semibold mb-2">Tak for din besked!</p>
        <p className="text-muted-foreground text-sm">
          Jeg vender tilbage hurtigst muligt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[440px] flex flex-col gap-5 bg-card rounded-2xl p-8 border border-border">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Navn</label>
        <input
          type="text"
          placeholder="Dit fulde navn"
          maxLength={100}
          required
          value={form.navn}
          onChange={(e) => setForm({ ...form, navn: e.target.value })}
          className="w-full rounded-lg px-4 py-3 text-foreground text-[15px] bg-background outline-none placeholder:text-muted-foreground/50 border border-border focus:border-[hsl(var(--red-accent))] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Telefon</label>
        <input
          type="tel"
          placeholder="Dit telefonnummer"
          maxLength={20}
          required
          value={form.telefon}
          onChange={(e) => setForm({ ...form, telefon: e.target.value })}
          className="w-full rounded-lg px-4 py-3 text-foreground text-[15px] bg-background outline-none placeholder:text-muted-foreground/50 border border-border focus:border-[hsl(var(--red-accent))] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Besked</label>
        <textarea
          placeholder="Fortæl os om dit projekt..."
          rows={4}
          maxLength={1000}
          required
          value={form.besked}
          onChange={(e) => setForm({ ...form, besked: e.target.value })}
          className="w-full rounded-lg px-4 py-3 text-foreground text-[15px] bg-background outline-none placeholder:text-muted-foreground/50 border border-border focus:border-[hsl(var(--red-accent))] resize-none transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg font-bold px-4 py-3.5 text-[15px] transition-all text-white mt-1"
        style={{ background: 'hsl(var(--red-accent))' }}
      >
        Send besked
      </button>
      <p className="text-muted-foreground text-[11px] leading-snug text-center">
        Ved at sende accepterer du at vi kontakter dig. Vi gemmer dine data i maks 1 måned.
      </p>
    </form>
  );
};

export default ContactForm;
