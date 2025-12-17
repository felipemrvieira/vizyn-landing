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
      question: "O que significa 'Early Adopters grátis'?",
      answer:
        "É acesso gratuito para os primeiros condomínios participantes do pré-lançamento. Sem pegadinha: não pedimos cartão e não existe cobrança automática.",
    },
    {
      question: "Preciso cadastrar cartão de crédito?",
      answer:
        "Não. Para entrar como Early Adopter no Vizyn, não solicitamos cartão de crédito.",
    },
    {
      question: "Por quanto tempo o acesso fica gratuito?",
      answer:
        "O acesso gratuito vale durante a fase de pré-lançamento para os primeiros adotantes. Quando o Vizyn lançar oficialmente, você será avisado com antecedência — e nada muda automaticamente sem sua decisão.",
    },
    {
      question: "O que eu ganho sendo um dos primeiros?",
      answer:
        "Acesso antecipado, onboarding assistido e um canal direto para sugerir melhorias. Você ajuda a moldar o produto e recebe prioridade nas evoluções.",
    },
    {
      question: "O Vizyn serve para síndico, administradora e moradores?",
      answer:
        "Sim. O Vizyn é pensado para centralizar comunicação e rotinas do condomínio, com permissões por perfil (síndico, conselho, portaria/funcionários e moradores).",
    },
    {
      question: "Quais recursos estão incluídos no pré-lançamento?",
      answer:
        "O foco é no essencial: comunicação centralizada (avisos/comunicados), organização de demandas/rotinas e controle por perfis. Novos módulos serão adicionados gradualmente.",
    },
    {
      question: "Como funciona privacidade e acesso às informações?",
      answer:
        "Cada usuário vê apenas o que faz sentido para seu perfil. A ideia é dar transparência para a comunidade sem expor informações sensíveis desnecessariamente.",
    },
    {
      question: "Como faço para participar?",
      answer:
        "Clique em 'Quero entrar grátis' na seção de planos e deixe um contato. Vamos falar com você para entender seu condomínio e iniciar o onboarding.",
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
            As perguntas mais comuns sobre o Vizyn, o pré-lançamento e o acesso
            gratuito para os primeiros adotantes.
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
