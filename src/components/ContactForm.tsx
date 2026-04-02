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
    // TODO: hook up to backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-[400px] rounded-xl p-8 text-center" style={{ background: '#2a2a3e' }}>
        <p className="text-white text-lg font-semibold mb-2">Tak for din besked!</p>
        <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-sm">
          Jeg vender tilbage hurtigst muligt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col gap-4">
      <input
        type="text"
        placeholder="Navn"
        maxLength={100}
        required
        value={form.navn}
        onChange={(e) => setForm({ ...form, navn: e.target.value })}
        className="w-full rounded-lg px-4 py-3 text-white text-[15px] outline-none placeholder:text-white/40 border"
        style={{ background: '#2a2a3e', borderColor: '#3a3a4e' }}
      />
      <input
        type="tel"
        placeholder="Telefon"
        maxLength={20}
        required
        value={form.telefon}
        onChange={(e) => setForm({ ...form, telefon: e.target.value })}
        className="w-full rounded-lg px-4 py-3 text-white text-[15px] outline-none placeholder:text-white/40 border"
        style={{ background: '#2a2a3e', borderColor: '#3a3a4e' }}
      />
      <textarea
        placeholder="Besked"
        rows={4}
        maxLength={1000}
        required
        value={form.besked}
        onChange={(e) => setForm({ ...form, besked: e.target.value })}
        className="w-full rounded-lg px-4 py-3 text-white text-[15px] outline-none placeholder:text-white/40 border resize-none"
        style={{ background: '#2a2a3e', borderColor: '#3a3a4e' }}
      />
      <button
        type="submit"
        className="w-full rounded-lg font-bold px-4 py-3 text-[15px] transition-all hover:brightness-90"
        style={{ background: '#e8a838', color: '#1a1a2e' }}
      >
        Send besked
      </button>
      <p style={{ color: 'rgba(255,255,255,0.4)' }} className="text-[12px] leading-snug">
        Ved at sende accepterer du at vi kontakter dig. Vi gemmer dine data i maks 1 måned.
      </p>
    </form>
  );
};

export default ContactForm;
