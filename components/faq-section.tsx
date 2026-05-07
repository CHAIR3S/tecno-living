'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FAQ } from '@/lib/data';

export function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre Tecno
          </p>
        </div>

        {/* FAQ Accordion - Improved */}
        <Accordion type="single" collapsible className="space-y-3">
          {FAQ.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-200 data-[state=open]:border-primary/50 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="py-4 px-6 font-semibold text-foreground hover:text-primary transition-colors text-left">
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 px-6 pt-0">
                <div className="pl-9 border-l-2 border-primary/20">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-16 bg-primary/5 rounded-xl p-8 border border-primary/20 text-center">
          <h3 className="font-semibold text-lg text-foreground mb-2">¿No encontraste tu respuesta?</h3>
          <p className="text-muted-foreground mb-6">
            Contáctanos y nuestro equipo te ayudará en menos de 2 horas
          </p>
          <a
            href="mailto:soporte@tecno.com"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-apple-blue-dark transition-colors"
          >
            Enviar Mensaje
          </a>
        </div>
      </div>
    </section>
  );
}
