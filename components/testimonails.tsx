import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import { CustomBadge } from "@/components/custom/badge";
import { CustomTitle } from "@/components/custom/title";
import { CustomSubtitle } from "@/components/custom/subtitle";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Morador (fórum público)",
      role: "Grupo de WhatsApp do condomínio",
      content:
        "“Arquiva e silencia o grupo. Abre de vez em quando só pra ver se tem algo importante.”",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Morador (fórum público)",
      role: "Ruído e retrabalho na comunicação",
      content:
        "“Grande parte das mensagens poderia ser resolvida falando direto com a pessoa certa — em vez de virar ‘junkmail’ no grupo.”",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Morador (fórum público)",
      role: "Convivência e conflitos",
      content:
        "“O grupo começou com boa intenção e virou um painel de reclamações sobre crianças, pets e visitas.”",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Conselho/Síndico (fórum público)",
      role: "Governança e respeito",
      content:
        "“Grupo pode ser útil, mas não dá pra tratar moradores assim. Tem diferença entre comunicação funcional e humilhação pública.”",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Conselho (fórum público)",
      role: "Canais oficiais vs. risco",
      content:
        "“Não façam canal social oficial. Advogados pedem pra vocês não fazerem.”",
      avatar:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Morador (fórum público)",
      role: "Estratégia de comunicação",
      content:
        "“Separe: 1) canal oficial pra avisos/documentos; 2) social (se existir) como algo não afiliado.”",
      avatar:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Conselho (fórum público)",
      role: "Risco jurídico",
      content:
        "“Já vi post ‘oficial’ em rede social virar parte de um processo caro. Melhor ter governança e limite.”",
      avatar:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Morador (fórum público)",
      role: "Moderação e regras claras",
      content:
        "“Grupo ‘não-oficial’, fechado, com convite e moderação rígida — funcionou muito melhor.”",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Morador (fórum público)",
      role: "Comunidade saudável",
      content:
        "“Criaram um grupo não afiliado ao condomínio: serve pra achados e perdidos, recomendações e encontros — preencheu um vazio.”",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Conselho (fórum público)",
      role: "Software de gestão",
      content:
        "“Comunicação + portal de taxas não dá conta em 2025. Falta experiência, clareza e rotina bem resolvida.”",
      avatar:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const TestimonialCard = ({
    testimonial,
  }: {
    testimonial: (typeof testimonials)[0];
  }) => (
    <div className="flex-shrink-0 w-[350px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/15 dark:to-indigo-900/15 rounded-xl p-6 border border-border/50 shadow-sm mx-1.5">
      <p className="text-muted-foreground mb-4 font-medium">
        {testimonial.content}
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-foreground">
            {testimonial.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );

  const firstColumn = testimonials.slice(0, 5);
  const secondColumn = testimonials.slice(5, 10);

  return (
    <section className="py-24 bg-background overflow-hidden border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center flex-col text-center gap-5 mb-16"
        >
          <CustomBadge>Vozes da comunidade</CustomBadge>

          <CustomTitle>O que moradores e síndicos dizem por aí</CustomTitle>

          <CustomSubtitle>
            Comentários públicos sobre desafios reais de comunicação e gestão em
            condomínios.
          </CustomSubtitle>
        </motion.div>
      </div>

      <div className="w-full mx-auto px-6">
        <motion.div
          className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-1.5 mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Marquee pauseOnHover className="[--duration:40s] grow">
            {firstColumn.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s] grow">
            {secondColumn.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 start-0 w-1/12 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 end-0 w-1/12 bg-gradient-to-l from-background"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
