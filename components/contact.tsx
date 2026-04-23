"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { CustomBadge } from "@/components/custom/badge";
import { CustomSubtitle } from "@/components/custom/subtitle";
import { CustomTitle } from "@/components/custom/title";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Selecione seu papel"),
  unitsBand: z.string().min(1, "Selecione o porte do condomínio"),
  hasPortaria: z.string().min(1, "Selecione a situação da portaria"),
  primaryPain: z.string().min(1, "Selecione a principal dor operacional"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),

  // honeypot (campo escondido)
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      unitsBand: "",
      hasPortaria: "",
      primaryPain: "",
      subject: "",
      message: "",
      company: "", // honeypot
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          role: values.role,
          unitsBand: values.unitsBand,
          hasPortaria: values.hasPortaria,
          primaryPain: values.primaryPain,
          subject: values.subject,
          message: values.message,
          source: "vizyn-landing",
          company: values.company, // honeypot
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error ?? "failed");
      }

      toast(
        "Mensagem enviada! Obrigado. A equipe do Vizyn vai te responder em breve."
      );
      form.reset();
    } catch (e) {
      console.error(e);
      toast(
        "Não foi possível enviar sua mensagem agora. Tente novamente em instantes."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: "Email", content: "contato@vizyn.app" },
    { icon: Phone, title: "WhatsApp", content: "Em breve" },
    { icon: MapPin, title: "Atendimento", content: "Remoto (Brasil)" },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 border-b border-border/50"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center flex-col text-center gap-5 mb-25"
        >
          <CustomBadge>Contato</CustomBadge>
          <CustomTitle>Fale com o Vizyn</CustomTitle>
          <CustomSubtitle>
            Quer validar o Vizyn no seu condomínio, agendar uma demo ou discutir
            sua operação atual? Manda uma mensagem.
          </CustomSubtitle>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Vamos começar uma conversa
              </h3>
              <p className="text-muted-foreground mb-8">
                O Vizyn nasceu para organizar o dia a dia do condomínio com
                menos improviso e mais registro. Conte rapidamente seu cenário:
                quantidade de unidades, presença de portaria e principal dor em
                comunicação, ocorrências, visitantes, entregas ou reservas.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <info.icon className="size-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    {info.icon === Mail ? (
                      <Link
                        href={`mailto:${info.content}`}
                        className="text-muted-foreground hover:text-purple-500 whitespace-pre-line"
                      >
                        {info.content}
                      </Link>
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-line">
                        {info.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50">
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Honeypot anti-spam (hidden) */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              tabIndex={-1}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="seu@email.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seu papel</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              >
                                <option value="">Selecione</option>
                                <option value="sindico_profissional">
                                  Síndico profissional
                                </option>
                                <option value="sindico_morador">
                                  Síndico morador
                                </option>
                                <option value="administradora">
                                  Administradora
                                </option>
                                <option value="conselho">Conselho</option>
                                <option value="outro">Outro</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="unitsBand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Faixa de unidades</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              >
                                <option value="">Selecione</option>
                                <option value="ate_50">Até 50 unidades</option>
                                <option value="51_150">51 a 150 unidades</option>
                                <option value="151_300">
                                  151 a 300 unidades
                                </option>
                                <option value="mais_300">
                                  Mais de 300 unidades
                                </option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hasPortaria"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portaria</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              >
                                <option value="">Selecione</option>
                                <option value="sim_24h">Sim, 24h</option>
                                <option value="sim_horario">
                                  Sim, em horário comercial
                                </option>
                                <option value="nao">Não</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="primaryPain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Principal dor hoje</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              >
                                <option value="">Selecione</option>
                                <option value="comunicacao">Comunicação</option>
                                <option value="ocorrencias">Ocorrências</option>
                                <option value="visitantes">Visitantes</option>
                                <option value="entregas">Entregas</option>
                                <option value="reservas">Reservas</option>
                                <option value="outra">Outra</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex.: Quero organizar comunicação e ocorrências do condomínio"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex.: Condomínio com 80 unidades e portaria presencial. Nossa maior dor é comunicação dispersa e falta de rastreio nas ocorrências. Queremos validar o Vizyn."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      size="lg"
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Quero conversar sobre um piloto"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
