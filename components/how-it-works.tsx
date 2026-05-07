'use client';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Crea tu Cuenta',
      description: 'Regístrate con tu correo universitario y verifica tu identidad de estudiante con tu carnet.',
      icon: '📝',
    },
    {
      number: 2,
      title: 'Explora Habitaciones',
      description: 'Busca y filtra por precio, ubicación, amenidades y otras preferencias.',
      icon: '🔍',
    },
    {
      number: 3,
      title: 'Contacta Anfitrión',
      description: 'Comunícate directamente con el dueño de la habitación a través de la plataforma.',
      icon: '💬',
    },
    {
      number: 4,
      title: 'Confirma Reserva',
      description: 'Realiza el pago seguro y recibe confirmación de tu alojamiento.',
      icon: '✅',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Cómo Funciona Tecno Living
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solo 4 pasos simples para encontrar tu alojamiento ideal cerca del campus
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 border border-border text-center h-full flex flex-col">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 mt-4">{step.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{step.description}</p>
              </div>

              {/* Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
