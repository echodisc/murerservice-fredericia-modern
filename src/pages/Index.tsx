const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-card py-10 lg:py-20 px-6 lg:px-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Side — 60% */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            <h1
              className="font-semibold text-foreground leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Din murer i Kolding, Vejle &amp; Fredericia
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Murerarbejde, flisearbejde og badeværelser — udført med omhu siden 1999
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-8 py-4 text-base transition-colors hover:brightness-90"
              >
                Få et gratis tilbud
              </a>
              <a
                href="tel:20329095"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary text-primary font-medium px-8 py-4 text-base transition-colors hover:bg-primary/10"
              >
                Ring 20 32 90 95
              </a>
            </div>
          </div>

          {/* Image Side — 40% */}
          <div className="w-full lg:w-[40%]">
            <div
              className="w-full min-h-[320px] lg:min-h-[400px] rounded-2xl"
              style={{ backgroundColor: '#e8e8e8' }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
