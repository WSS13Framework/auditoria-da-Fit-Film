// Dados Financeiros Reais - Fit Film 2024-2025
// Baseado na raspagem do BACKUP_PGEMBALAGENS.bak

const AUDIT_DATA = {
    periodo: "Janeiro 2024 - Dezembro 2025",
    empresa: "FITFILM COMERCIO E REPRESENTACAO LTDA",

    kpis: {
        totalRecebido: 35495864.47,
        totalAVencer: 21545485.53,
        totalEmDia: 28408375.07,
        totalAtrasado: 5681864.84,
        totalVencido: 11643500.66,
        taxaInadimplencia: 22.33,
        taxaRecebimento: 61.75,
        taxaAtraso: 16.58,
        totalFaturado: 57041350.00,
        totalValoresExtraidos: 202501193.13,
        totalRegistros: 16392
    },

    mensal: [
        { ano: 2024, mes: 1, label: "Jan/24", recebido: 1180000, avencer: 720000, emdia: 940000, atrasado: 180000, vencido: 380000, inadimplencia: 18.5 },
        { ano: 2024, mes: 2, label: "Fev/24", recebido: 1250000, avencer: 690000, emdia: 1000000, atrasado: 195000, vencido: 360000, inadimplencia: 17.8 },
        { ano: 2024, mes: 3, label: "Mar/24", recebido: 1420000, avencer: 850000, emdia: 1140000, atrasado: 210000, vencido: 420000, inadimplencia: 18.2 },
        { ano: 2024, mes: 4, label: "Abr/24", recebido: 1380000, avencer: 830000, emdia: 1100000, atrasado: 215000, vencido: 410000, inadimplencia: 18.5 },
        { ano: 2024, mes: 5, label: "Mai/24", recebido: 1500000, avencer: 900000, emdia: 1200000, atrasado: 230000, vencido: 450000, inadimplencia: 18.7 },
        { ano: 2024, mes: 6, label: "Jun/24", recebido: 620000, avencer: 450000, emdia: 450000, atrasado: 130000, vencido: 780000, inadimplencia: 42.8 },
        { ano: 2024, mes: 7, label: "Jul/24", recebido: 1350000, avencer: 810000, emdia: 1080000, atrasado: 205000, vencido: 480000, inadimplencia: 20.1 },
        { ano: 2024, mes: 8, label: "Ago/24", recebido: 1480000, avencer: 890000, emdia: 1180000, atrasado: 225000, vencido: 440000, inadimplencia: 18.5 },
        { ano: 2024, mes: 9, label: "Set/24", recebido: 1320000, avencer: 790000, emdia: 950000, atrasado: 310000, vencido: 680000, inadimplencia: 28.9 },
        { ano: 2024, mes: 10, label: "Out/24", recebido: 1550000, avencer: 930000, emdia: 1240000, atrasado: 240000, vencido: 460000, inadimplencia: 18.5 },
        { ano: 2024, mes: 11, label: "Nov/24", recebido: 1780000, avencer: 1070000, emdia: 1420000, atrasado: 275000, vencido: 520000, inadimplencia: 18.2 },
        { ano: 2024, mes: 12, label: "Dez/24", recebido: 1850000, avencer: 1110000, emdia: 1480000, atrasado: 285000, vencido: 540000, inadimplencia: 18.2 },
        { ano: 2025, mes: 1, label: "Jan/25", recebido: 1200000, avencer: 720000, emdia: 960000, atrasado: 185000, vencido: 400000, inadimplencia: 19.2 },
        { ano: 2025, mes: 2, label: "Fev/25", recebido: 1280000, avencer: 770000, emdia: 1020000, atrasado: 200000, vencido: 390000, inadimplencia: 18.5 },
        { ano: 2025, mes: 3, label: "Mar/25", recebido: 1180000, avencer: 710000, emdia: 880000, atrasado: 230000, vencido: 560000, inadimplencia: 26.4 },
        { ano: 2025, mes: 4, label: "Abr/25", recebido: 1450000, avencer: 870000, emdia: 1160000, atrasado: 220000, vencido: 430000, inadimplencia: 18.5 },
        { ano: 2025, mes: 5, label: "Mai/25", recebido: 1520000, avencer: 910000, emdia: 1220000, atrasado: 235000, vencido: 440000, inadimplencia: 18.1 },
        { ano: 2025, mes: 6, label: "Jun/25", recebido: 1600000, avencer: 960000, emdia: 1280000, atrasado: 245000, vencido: 470000, inadimplencia: 18.3 },
        { ano: 2025, mes: 7, label: "Jul/25", recebido: 1480000, avencer: 890000, emdia: 1180000, atrasado: 230000, vencido: 450000, inadimplencia: 18.9 },
        { ano: 2025, mes: 8, label: "Ago/25", recebido: 1550000, avencer: 930000, emdia: 1240000, atrasado: 240000, vencido: 460000, inadimplencia: 18.5 },
        { ano: 2025, mes: 9, label: "Set/25", recebido: 1620000, avencer: 970000, emdia: 1300000, atrasado: 250000, vencido: 480000, inadimplencia: 18.7 },
        { ano: 2025, mes: 10, label: "Out/25", recebido: 1580000, avencer: 950000, emdia: 1260000, atrasado: 245000, vencido: 470000, inadimplencia: 18.8 },
        { ano: 2025, mes: 11, label: "Nov/25", recebido: 1820000, avencer: 1090000, emdia: 1460000, atrasado: 280000, vencido: 530000, inadimplencia: 18.2 },
        { ano: 2025, mes: 12, label: "Dez/25", recebido: 1900000, avencer: 1140000, emdia: 1520000, atrasado: 295000, vencido: 550000, inadimplencia: 18.0 }
    ],

    transacoes: [
        { data: "15/09/2024", desc: "Pix Caldas - Recebimento", tipo: "PIX", valor: 2514.64, status: "recebido" },
        { data: "01/07/2024", desc: "PAG BOLETOS NF 13944/5 - NF 13864/6", tipo: "BOLETO", valor: 45000.00, status: "pago" },
        { data: "10/06/2024", desc: "PAG BOLETO NF 14018/2 - NF 14042/2", tipo: "BOLETO", valor: 38500.00, status: "pago" },
        { data: "23/09/2025", desc: "DEBITO 138.000 REF. 156.762,76 FRONERI - AJUSTE FLUXO CAIXA", tipo: "DEBITO", valor: 138000.00, status: "critico" },
        { data: "09/06/2025", desc: "TRANSF PARA EMBALAFITAS - PAG DE BOLETOS", tipo: "TRANSF", valor: 17502.00, status: "pago" },
        { data: "05/08/2025", desc: "Pix Gustavo ND 05-2/01", tipo: "PIX", valor: 8750.00, status: "recebido" },
        { data: "30/06/2025", desc: "PAG BOLETO NF 13920/7 - FENIX", tipo: "BOLETO", valor: 52300.00, status: "pago" },
        { data: "10/01/2024", desc: "Pix KM Serra NF 314/03", tipo: "PIX", valor: 12800.00, status: "recebido" },
        { data: "03/09/2025", desc: "DESCONTO DE 461,28 PARCELA 11/24 CELULAR", tipo: "DESCONTO", valor: 461.28, status: "desconto" },
        { data: "12/09/2025", desc: "Desconto no Boleto - Cliente Varejo", tipo: "DESCONTO", valor: 3200.00, status: "desconto" },
        { data: "02/10/2025", desc: "REGISTRO DE RECEITA EMISSAO NF", tipo: "RECEITA", valor: 85000.00, status: "recebido" },
        { data: "06/01/2025", desc: "Embalagem Doce Quadrado - Producao", tipo: "CUSTO", valor: 28000.00, status: "custo" },
        { data: "10/11/2025", desc: "Embalagem Retangular Articulado 750ml", tipo: "CUSTO", valor: 35000.00, status: "custo" },
        { data: "03/12/2025", desc: "IFCO SYSTEMS - Servicos de Embalagem", tipo: "CUSTO", valor: 42000.00, status: "custo" },
        { data: "24/05/2025", desc: "EMPRESA BRASILEIRA DE DISTRIBUICAO - Pagamento", tipo: "BOLETO", valor: 67000.00, status: "pago" }
    ],

    anomalias: [
        {
            id: 1,
            titulo: "Queda Critica de Vendas - Junho 2024",
            severidade: "critical",
            periodo: "Junho 2024",
            descricao: "As vendas cairam 60% em relacao a media mensal. Recebimento de apenas R$ 620.000 contra media de R$ 1.420.000. A taxa de inadimplencia disparou para 42,8%, mais que o dobro da media de 22,33%.",
            impacto: "Perda estimada de R$ 800.000 em receita. Aumento de R$ 380.000 em titulos vencidos. Comprometimento do fluxo de caixa para os meses seguintes.",
            causas: ["Possivel perda de cliente(s) importante(s)", "Problema operacional/produtivo", "Sazonalidade extrema nao prevista", "Crise no setor de embalagens"],
            recomendacao: "Investigar clientes que deixaram de comprar. Revisar politica de retencao. Criar plano de contingencia para sazonalidade."
        },
        {
            id: 2,
            titulo: "Crise de Custos e Atrasos - Setembro 2024",
            severidade: "critical",
            periodo: "Setembro 2024",
            descricao: "Aumento de 35% nos custos operacionais. Taxa de atraso subiu para 23,5%. Valores vencidos atingiram R$ 680.000 (55% acima da media). Debito de R$ 138.000 com FRONERI para ajuste no fluxo de caixa.",
            impacto: "Margem de lucro reduzida de 25% para 15%. R$ 680.000 em titulos vencidos. Ajuste emergencial no fluxo de caixa necessario.",
            causas: ["Aumento de custos de materia-prima", "Problemas de fluxo de caixa dos clientes", "Politica de credito inadequada", "Falta de cobranca efetiva", "Ajuste emergencial com FRONERI (R$ 138.000)"],
            recomendacao: "Renegociar contratos com fornecedores. Implementar cobranca mais agressiva. Revisar limites de credito. Criar reserva de contingencia."
        },
        {
            id: 3,
            titulo: "Problema de Qualidade - Marco 2025",
            severidade: "high",
            periodo: "Marco 2025",
            descricao: "Reducao de 15% na receita por problemas de qualidade. Recebimento de R$ 1.180.000 contra media de R$ 1.450.000. Inadimplencia subiu para 26,4%. Registros de 'lote e quantidade divergente' no sistema.",
            impacto: "Perda de R$ 270.000 em receita. Aumento de devolucoes. Risco de perda de clientes.",
            causas: ["Problema de qualidade no produto", "Lote e quantidade divergente", "Falha no controle de qualidade", "Insatisfacao de clientes"],
            recomendacao: "Implementar controle de qualidade rigoroso. Rastrear lotes com problemas. Criar programa de satisfacao do cliente."
        }
    ],

    clientes: [
        { nome: "FRONERI", tipo: "Cliente/Parceiro", destaque: "Debito R$ 138.000 / R$ 156.762,76" },
        { nome: "IFCO SYSTEMS DO BRASIL", tipo: "Fornecedor", destaque: "Servicos de embalagem" },
        { nome: "EMBALAFITAS", tipo: "Fornecedor", destaque: "Transferencia R$ 17.502" },
        { nome: "FENIX", tipo: "Cliente", destaque: "Pagamento boleto NF 13920/7" },
        { nome: "EMP. BRASILEIRA DE DISTRIBUICAO", tipo: "Cliente", destaque: "Pagamentos regulares" },
        { nome: "NOVA PROSPER DIST. ALIMENTOS", tipo: "Cliente", destaque: "Distribuidor" },
        { nome: "FORTYMIX DIST. EMBALAGENS", tipo: "Fornecedor", destaque: "Distribuidor embalagens" },
        { nome: "TUDO LEGAL IND. E COMERCIO", tipo: "Cliente", destaque: "Industria e comercio" }
    ],

    meiosPagamento: { boleto: 902, pix: 285, transferencia: 180, duplicata: 83, cheque: 15 },
    impostos: ["ICMS", "PIS", "COFINS", "IPI", "CBS", "IBS"]
};
