
import { CaseStudyData } from "@/types/portfolio";

export const getCaseStudies = (dynamicVideos: any[]): CaseStudyData[] => [
  {
    title: "Automação de Atendimento ao Cliente",
    client: "Setor de Varejo",
    description: "Implementamos um sistema de chatbot com IA para uma grande rede de varejo, automatizando atendimentos e reduzindo o tempo de resposta.",
    videos: [
      ...dynamicVideos,
      { id: "1pYaBWyY4Xl3L7DPOm3h3qY12NRpYWBJS", title: "Demo do Chatbot IA" },
      { id: "1Lw6t2t_U4QiIQFarGKguCYuNgNt7Kico", title: "Resultados do Cliente" },
      { id: "1S9bXiVwkL7URfrFWMuzLo_afP-gYFXzi", title: "Análise de Casos" },
      { id: "1Lqv6jhv1TciieAeYfmGGwTUZ1DjEuFsA", title: "Benefícios do Sistema" }
    ],
    results: [
      { label: "Redução no tempo de resposta", value: "78%" },
      { label: "Aumento na satisfação do cliente", value: "42%" },
      { label: "Redução de custos operacionais", value: "35%" },
      { label: "Escalabilidade de atendimentos", value: "3x" }
    ]
  },
  {
    title: "Análise Preditiva para Manutenção",
    client: "Setor Industrial",
    description: "Desenvolvemos um sistema de manutenção preditiva utilizando IA para uma indústria, prevendo falhas em equipamentos antes que ocorressem.",
    videos: [
      { id: "1pYaBWyY4Xl3L7DPOm3h3qY12NRpYWBJS", title: "Sistema em Ação" },
      { id: "1Lw6t2t_U4QiIQFarGKguCYuNgNt7Kico", title: "Análise de Dados" },
      { id: "1S9bXiVwkL7URfrFWMuzLo_afP-gYFXzi", title: "Economia Gerada" }
    ],
    results: [
      { label: "Redução em tempo de inatividade", value: "63%" },
      { label: "Economia em custos de manutenção", value: "R$1.2M" },
      { label: "Aumento na vida útil dos equipamentos", value: "28%" },
      { label: "ROI do projeto", value: "356%" }
    ]
  },
  {
    title: "Sistema de Recomendação Inteligente",
    client: "E-commerce",
    description: "Criamos um sistema de recomendação personalizada para uma plataforma de e-commerce, aumentando significativamente as vendas cruzadas.",
    videos: [
      { id: "1pYaBWyY4Xl3L7DPOm3h3qY12NRpYWBJS", title: "Interface do Sistema" },
      { id: "1Lw6t2t_U4QiIQFarGKguCYuNgNt7Kico", title: "Performance de Vendas" }
    ],
    results: [
      { label: "Aumento em vendas cruzadas", value: "47%" },
      { label: "Melhoria na retenção de usuários", value: "32%" },
      { label: "Aumento no valor médio de pedidos", value: "23%" },
      { label: "Crescimento em receita anual", value: "18%" }
    ]
  }
];
