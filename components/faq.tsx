import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomBadge } from "@/components/custom/badge";
import { CustomTitle } from "@/components/custom/title";
import { CustomSubtitle } from "@/components/custom/subtitle";

import Link from "next/link";

const FAQ = () => {
  const faqs = [
    {
      question: "O que significa piloto assistido?",
      answer:
        "É uma entrada acompanhada para os primeiros condomínios selecionados. O objetivo é validar operação real, onboarding e uso recorrente do core do produto.",
    },
    {
      question: "Preciso cadastrar cartão de crédito?",
      answer:
        "Não. Para entrar como Early Adopter no Vizyn, não solicitamos cartão de crédito.",
    },
    {
      question: "Por quanto tempo o piloto fica gratuito?",
      answer:
        "O piloto gratuito vale durante a fase de validação combinada com cada condomínio. Nada muda automaticamente sem alinhamento prévio.",
    },
    {
      question: "O que eu ganho sendo um dos primeiros?",
      answer:
        "Onboarding assistido, contato próximo com a equipe e prioridade nas melhorias do core operacional. O piloto ajuda a moldar o produto para uso real.",
    },
    {
      question: "O Vizyn serve para síndico, administradora e moradores?",
      answer:
        "Sim. O Vizyn é pensado para centralizar comunicação e rotinas do condomínio, com permissões por perfil (síndico, conselho, portaria/funcionários e moradores).",
    },
    {
      question: "Quais recursos estão incluídos no pré-lançamento?",
      answer:
        "O foco está no essencial da operação diária: comunicados, ocorrências, visitantes, entregas, reservas e a base estrutural necessária para esses fluxos funcionarem bem.",
    },
    {
      question: "O Vizyn é mais forte em qual problema hoje?",
      answer:
        "Hoje o Vizyn está sendo posicionado para resolver o dia a dia operacional do condomínio: comunicação oficial, rastreabilidade de demandas, previsibilidade na portaria e organização de rotinas recorrentes.",
    },
    {
      question: "Financeiro faz parte da proposta principal agora?",
      answer:
        "Não como argumento principal de venda nesta fase. O foco comercial atual está na operação condominial. Financeiro pode evoluir como complemento, sem liderar o discurso.",
    },
    {
      question: "Como funciona privacidade e acesso às informações?",
      answer:
        "Cada usuário vê apenas o que faz sentido para seu perfil. A ideia é dar transparência para a comunidade sem expor informações sensíveis desnecessariamente.",
    },
    {
      question: "Como faço para participar?",
      answer:
        "Clique em 'Quero validar no piloto' na seção de planos e deixe um contato. A equipe vai entender sua operação e avaliar encaixe para onboarding.",
    },
  ];

  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center flex-col text-center gap-5 mb-25"
        >
          <CustomBadge>FAQ</CustomBadge>

          <CustomTitle>Dúvidas frequentes</CustomTitle>

          <CustomSubtitle>
            As perguntas mais comuns sobre o posicionamento atual do Vizyn, os
            pilotos assistidos e o foco operacional do produto.
          </CustomSubtitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-background rounded-lg border! border-border px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-start font-semibold text-foreground hover:text-indigo-600 data-[state=open]:text-indigo-600 transition-colors cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-1.5 text-center mt-12"
        >
          <span className="text-muted-foreground">
            Ainda ficou alguma dúvida?
          </span>

          <Link
            href="#contact"
            className="text-indigo-600 hover:text-indigo-700 transition-colors hover:underline"
          >
            Falar com a equipe do Vizyn
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
