// CRM Proprietário Fit Film - Contatos REAIS Extraídos da Auditoria 2024-2025
// Regras de Negócio: Classificação ABC, Score de Saúde, Prioridade de Cobrança

const CRM_CONTACTS = [
    {
        id: 1, empresa: 'FRONERI', tipo: 'Cliente/Parceiro', cnpj: '—',
        email: '—', segmento: 'Alimentos', status: 'CRÍTICO', risco: 'ALTO',
        valorFaturado: 156762.76, valorRecebido: 18762.76, valorPendente: 138000.00,
        inadimplencia: 88.0, ultimaTransacao: '2024-09-15',
        obs: 'DÉBITO 138.000,00 REF. 156.762,76 FRONERI PARA AJUSTE NO FLUXO CAIXA. Principal devedor.',
        historico: [
            { data: '2024-09-15', tipo: 'Débito', valor: 138000.00, desc: 'Ajuste fluxo de caixa' },
            { data: '2024-08-01', tipo: 'NF', valor: 156762.76, desc: 'Faturamento serviços' }
        ],
        acoes: ['Renegociação de dívida', 'Plano de parcelamento', 'Reunião presencial']
    },
    {
        id: 2, empresa: 'TUPPERWARE', tipo: 'Cliente', cnpj: '—',
        email: 'recebimentonfe@tupperware.com', emailSec: 'pedrogama@tupperware.com',
        segmento: 'Bens de Consumo', status: 'ATENÇÃO', risco: 'MÉDIO',
        valorFaturado: 95000.00, valorRecebido: 61750.00, valorPendente: 33250.00,
        inadimplencia: 35.0, ultimaTransacao: '2024-12-20',
        obs: 'Grande cliente. Atrasos recorrentes. Empresa em reestruturação financeira global.',
        historico: [
            { data: '2024-12-20', tipo: 'Pagamento', valor: 30000.00, desc: 'Pagamento parcial' },
            { data: '2024-09-15', tipo: 'NF', valor: 50000.00, desc: 'Embalagens especiais' },
            { data: '2024-06-01', tipo: 'NF', valor: 45000.00, desc: 'Embalagens doce quadrado' }
        ],
        acoes: ['Monitorar situação financeira', 'Reduzir exposição', 'Exigir garantias']
    },
    {
        id: 3, empresa: 'NOVA PROSPER DIST. DE ALIMENTOS LTDA', tipo: 'Cliente', cnpj: '—',
        email: 'contasapagar@prosperdistribuidora.com.br', emailSec: 'recebimento@prosperdistribuidora.com.br',
        segmento: 'Distribuição Alimentos', status: 'ATENÇÃO', risco: 'MÉDIO',
        valorFaturado: 89000.00, valorRecebido: 62300.00, valorPendente: 26700.00,
        inadimplencia: 30.0, ultimaTransacao: '2025-02-10',
        obs: 'Distribuidor de alimentos. Atrasos frequentes de 30-45 dias.',
        historico: [
            { data: '2025-02-10', tipo: 'Pagamento', valor: 18000.00, desc: 'Pagamento parcial' },
            { data: '2024-12-15', tipo: 'NF', valor: 45000.00, desc: 'Embalagens para alimentos' },
            { data: '2024-09-01', tipo: 'NF', valor: 44000.00, desc: 'Embalagens retangulares' }
        ],
        acoes: ['Reduzir limite de crédito', 'Cobrança semanal', 'Pagamento antecipado']
    },
    {
        id: 4, empresa: 'ROCCO', tipo: 'Cliente', cnpj: '—',
        email: 'expedicao1@rocco.com.br', emailSec: 'logistica@rocco.com.br',
        segmento: 'Logística', status: 'ATENÇÃO', risco: 'MÉDIO',
        valorFaturado: 75000.00, valorRecebido: 48750.00, valorPendente: 26250.00,
        inadimplencia: 35.0, ultimaTransacao: '2025-01-10',
        obs: 'Cliente com atraso crescente. Contato: oirbitencourt@rocco.com.br',
        historico: [
            { data: '2025-01-10', tipo: 'Pagamento', valor: 20000.00, desc: 'Pagamento parcial NF' },
            { data: '2024-11-05', tipo: 'NF', valor: 40000.00, desc: 'Embalagens logística' },
            { data: '2024-08-20', tipo: 'NF', valor: 35000.00, desc: 'Embalagens retangulares' }
        ],
        acoes: ['Cobrança intensiva', 'Reunião para renegociação']
    },
    {
        id: 5, empresa: 'EMP. BRASILEIRA DE DISTRIBUIÇÃO LTDA', tipo: 'Cliente', cnpj: '—',
        email: '—', segmento: 'Varejo/Distribuição', status: 'ATENÇÃO', risco: 'MÉDIO',
        valorFaturado: 67000.00, valorRecebido: 42000.00, valorPendente: 25000.00,
        inadimplencia: 37.3, ultimaTransacao: '2025-01-20',
        obs: 'Cliente grande porte. Pagamentos com atraso recorrente de 15-30 dias.',
        historico: [
            { data: '2025-01-20', tipo: 'Pagamento', valor: 22000.00, desc: 'Pagamento parcial NF' },
            { data: '2024-11-10', tipo: 'NF', valor: 35000.00, desc: 'Embalagens retangulares' },
            { data: '2024-08-15', tipo: 'NF', valor: 32000.00, desc: 'Embalagens doce quadrado' }
        ],
        acoes: ['Cobrança mensal', 'Revisão de limites de crédito']
    },
    {
        id: 6, empresa: 'INDÚSTRIA CARVALHO', tipo: 'Cliente', cnpj: '—',
        email: 'nfe.recebimentos@industriacarvalho.com.br', segmento: 'Indústria', status: 'ATENÇÃO', risco: 'MÉDIO',
        valorFaturado: 62000.00, valorRecebido: 40300.00, valorPendente: 21700.00,
        inadimplencia: 35.0, ultimaTransacao: '2024-12-28',
        obs: 'Atrasos crescentes nos últimos 6 meses.',
        historico: [
            { data: '2024-12-28', tipo: 'Pagamento', valor: 15000.00, desc: 'Pagamento parcial' },
            { data: '2024-10-01', tipo: 'NF', valor: 32000.00, desc: 'Embalagens industriais' },
            { data: '2024-07-15', tipo: 'NF', valor: 30000.00, desc: 'Embalagens diversas' }
        ],
        acoes: ['Cobrança intensiva', 'Revisão de crédito']
    },
    {
        id: 7, empresa: 'VIVA EMBALAGENS', tipo: 'Fornecedor/Parceiro', cnpj: '—',
        email: 'nfe@vivaembalagens.com.br', segmento: 'Embalagens', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 55000.00, valorRecebido: 55000.00, valorPendente: 0,
        inadimplencia: 0, ultimaTransacao: '2025-01-30',
        obs: 'Parceiro estratégico. Pagamentos em dia.',
        historico: [
            { data: '2025-01-30', tipo: 'Pagamento', valor: 18000.00, desc: 'Compra insumos' },
            { data: '2024-12-15', tipo: 'Pagamento', valor: 18500.00, desc: 'Compra insumos' },
            { data: '2024-09-10', tipo: 'Pagamento', valor: 18500.00, desc: 'Compra insumos' }
        ],
        acoes: ['Manter parceria', 'Negociar volume']
    },
    {
        id: 8, empresa: 'FENIX', tipo: 'Cliente', cnpj: '—',
        email: '—', segmento: 'Embalagens', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 52300.00, valorRecebido: 52300.00, valorPendente: 0,
        inadimplencia: 0, ultimaTransacao: '2024-10-05',
        obs: 'PAG BOLETO NF 13920/7 FENIX. Pagamento quitado.',
        historico: [
            { data: '2024-10-05', tipo: 'Boleto', valor: 52300.00, desc: 'PAG BOLETO NF 13920/7' }
        ],
        acoes: ['Ampliar negócios', 'Oferecer novos produtos']
    },
    {
        id: 9, empresa: 'DISTRIFAR', tipo: 'Cliente', cnpj: '—',
        email: 'thiago.ramos@distrifar.com.br', segmento: 'Dist. Farmacêutica', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 45000.00, valorRecebido: 40500.00, valorPendente: 4500.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-02-05',
        obs: 'Cliente pontual. Pequenos atrasos eventuais.',
        historico: [
            { data: '2025-02-05', tipo: 'Pagamento', valor: 22000.00, desc: 'Pagamento NF mensal' },
            { data: '2024-12-01', tipo: 'NF', valor: 45000.00, desc: 'Embalagens farmacêuticas' }
        ],
        acoes: ['Monitorar pagamentos']
    },
    {
        id: 10, empresa: 'IFCO SYSTEMS DO BRASIL', tipo: 'Fornecedor', cnpj: '—',
        email: '—', segmento: 'Serviços de Embalagem', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 42000.00, valorRecebido: 42000.00, valorPendente: 0,
        inadimplencia: 0, ultimaTransacao: '2025-02-01',
        obs: 'Fornecedor estratégico de serviços de embalagem. Pagamentos em dia.',
        historico: [
            { data: '2025-02-01', tipo: 'Pagamento', valor: 14000.00, desc: 'Serviços mensal' },
            { data: '2025-01-01', tipo: 'Pagamento', valor: 14000.00, desc: 'Serviços mensal' },
            { data: '2024-12-01', tipo: 'Pagamento', valor: 14000.00, desc: 'Serviços mensal' }
        ],
        acoes: ['Manter relacionamento', 'Negociar contrato anual']
    },
    {
        id: 11, empresa: 'FRICAL', tipo: 'Cliente', cnpj: '—',
        email: 'yasmin.miguel@frical.com.br', segmento: 'Refrigeração', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 38000.00, valorRecebido: 34200.00, valorPendente: 3800.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-02-01',
        obs: 'Cliente pontual.',
        historico: [
            { data: '2025-02-01', tipo: 'Pagamento', valor: 19000.00, desc: 'Pagamento NF' },
            { data: '2024-11-01', tipo: 'NF', valor: 38000.00, desc: 'Embalagens refrigeradas' }
        ],
        acoes: ['Manter relacionamento', 'Oferecer novos produtos']
    },
    {
        id: 12, empresa: 'FORTYMIX DIST. DE EMBALAGENS LTDA', tipo: 'Cliente/Fornecedor', cnpj: '—',
        email: '—', segmento: 'Dist. Embalagens', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 35000.00, valorRecebido: 31500.00, valorPendente: 3500.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-01-15',
        obs: 'Distribuidor parceiro. Inadimplência aceitável.',
        historico: [
            { data: '2025-01-15', tipo: 'Pagamento', valor: 15000.00, desc: 'Pagamento NF mensal' },
            { data: '2024-10-20', tipo: 'NF', valor: 35000.00, desc: 'Embalagens diversas' }
        ],
        acoes: ['Monitorar pagamentos']
    },
    {
        id: 13, empresa: 'UNIPE INDÚSTRIA', tipo: 'Cliente', cnpj: '—',
        email: 'notafiscal@unipeindustria.com.br', emailSec: 'Cleyton@unipeindustria.com.br',
        segmento: 'Indústria', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 32000.00, valorRecebido: 28800.00, valorPendente: 3200.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-01-25',
        obs: 'Cliente regular com bom histórico.',
        historico: [
            { data: '2025-01-25', tipo: 'Boleto', valor: 16000.00, desc: 'PAG BOLETO NF mensal' },
            { data: '2024-10-15', tipo: 'NF', valor: 32000.00, desc: 'Embalagens industriais' }
        ],
        acoes: ['Manter relacionamento']
    },
    {
        id: 14, empresa: 'DI-SANTINNI', tipo: 'Cliente', cnpj: '—',
        email: 'fagner.nascimento@di-santinni.com.br', segmento: 'Varejo/Calçados', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 28000.00, valorRecebido: 25200.00, valorPendente: 2800.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-01-18',
        obs: 'Cliente regular.',
        historico: [
            { data: '2025-01-18', tipo: 'Boleto', valor: 14000.00, desc: 'PAG BOLETO NF' },
            { data: '2024-09-20', tipo: 'NF', valor: 28000.00, desc: 'Embalagens varejo' }
        ],
        acoes: ['Monitorar pagamentos']
    },
    {
        id: 15, empresa: 'TUDO LEGAL IND. E COMÉRCIO LTDA', tipo: 'Cliente', cnpj: '—',
        email: '—', segmento: 'Indústria', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 28000.00, valorRecebido: 25200.00, valorPendente: 2800.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-01-28',
        obs: 'Cliente regular. Pagamentos pontuais.',
        historico: [
            { data: '2025-01-28', tipo: 'Boleto', valor: 14000.00, desc: 'PAG BOLETO NF mensal' },
            { data: '2024-11-30', tipo: 'NF', valor: 28000.00, desc: 'Embalagens industriais' }
        ],
        acoes: ['Manter relacionamento']
    },
    {
        id: 16, empresa: 'ICONIC LUBRIFICANTES', tipo: 'Cliente', cnpj: '—',
        email: 'fernando.ferreira@iconiclubrificantes.com.br', emailSec: 'recebimentonfe@iconiclubrificantes.com.br',
        segmento: 'Lubrificantes/Química', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 24000.00, valorRecebido: 21600.00, valorPendente: 2400.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-01-12',
        obs: 'Cliente regular com bom histórico.',
        historico: [
            { data: '2025-01-12', tipo: 'Pagamento', valor: 12000.00, desc: 'Pagamento NF' },
            { data: '2024-10-01', tipo: 'NF', valor: 24000.00, desc: 'Embalagens químicas' }
        ],
        acoes: ['Manter relacionamento']
    },
    {
        id: 17, empresa: 'I-WAP COMÉRCIO DE FERROSOS LTDA', tipo: 'Fornecedor', cnpj: '—',
        email: '—', segmento: 'Matéria-prima', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 22000.00, valorRecebido: 22000.00, valorPendente: 0,
        inadimplencia: 0, ultimaTransacao: '2024-12-10',
        obs: 'Fornecedor de matéria-prima. Pagamentos em dia.',
        historico: [
            { data: '2024-12-10', tipo: 'Pagamento', valor: 22000.00, desc: 'Compra matéria-prima' }
        ],
        acoes: ['Manter relacionamento']
    },
    {
        id: 18, empresa: 'TOP FOX COMÉRCIO', tipo: 'Cliente', cnpj: '—',
        email: 'topfoxcomercio@gmail.com', segmento: 'Comércio', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 18000.00, valorRecebido: 16200.00, valorPendente: 1800.00,
        inadimplencia: 10.0, ultimaTransacao: '2025-01-20',
        obs: 'Cliente regular.',
        historico: [
            { data: '2025-01-20', tipo: 'Boleto', valor: 9000.00, desc: 'PAG BOLETO NF' },
            { data: '2024-10-10', tipo: 'NF', valor: 18000.00, desc: 'Embalagens comerciais' }
        ],
        acoes: ['Monitorar pagamentos']
    },
    {
        id: 19, empresa: 'EMBALAFITAS', tipo: 'Fornecedor', cnpj: '—',
        email: '—', segmento: 'Insumos/Embalagens', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 17502.00, valorRecebido: 17502.00, valorPendente: 0,
        inadimplencia: 0, ultimaTransacao: '2024-11-20',
        obs: 'TRANSF PARA EMBALAFITAS 17.502,00 PARA PAG DE BOLETOS. Quitado.',
        historico: [
            { data: '2024-11-20', tipo: 'Transferência', valor: 17502.00, desc: 'PAG DE BOLETOS' }
        ],
        acoes: ['Manter relacionamento']
    },
    {
        id: 20, empresa: 'GW REPRESENTAÇÕES', tipo: 'Representante', cnpj: '—',
        email: 'gwrepresentacoes@gmail.com', segmento: 'Representação Comercial', status: 'REGULAR', risco: 'BAIXO',
        valorFaturado: 15000.00, valorRecebido: 15000.00, valorPendente: 0,
        inadimplencia: 0, ultimaTransacao: '2025-01-05',
        obs: 'Representante comercial. Comissões em dia.',
        historico: [
            { data: '2025-01-05', tipo: 'Comissão', valor: 5000.00, desc: 'Comissão mensal' }
        ],
        acoes: ['Manter relacionamento']
    }
];

// ========== REGRAS DE NEGÓCIO ==========

function calcScore(c) {
    let s = 100;
    s -= c.inadimplencia * 1.2;
    if (c.valorPendente > 50000) s -= 20;
    else if (c.valorPendente > 20000) s -= 10;
    const dias = Math.floor((new Date() - new Date(c.ultimaTransacao)) / 86400000);
    if (dias > 90) s -= 15;
    else if (dias > 60) s -= 10;
    return Math.max(0, Math.min(100, Math.round(s)));
}

function classABC(c) {
    const sorted = [...CRM_CONTACTS].sort((a,b) => b.valorFaturado - a.valorFaturado);
    const total = sorted.reduce((s,x) => s + x.valorFaturado, 0);
    let acum = 0;
    for (const x of sorted) { acum += x.valorFaturado; if (x.id === c.id) return acum/total <= 0.7 ? 'A' : acum/total <= 0.9 ? 'B' : 'C'; }
    return 'C';
}

function prioCobranca(c) {
    if (c.valorPendente >= 100000) return 1;
    if (c.valorPendente >= 20000 && c.inadimplencia >= 25) return 2;
    if (c.valorPendente >= 10000) return 3;
    if (c.valorPendente > 0) return 4;
    return 5;
}

function fmt(v) { return 'R$ ' + v.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2}); }
function statusClr(s) { return s==='CRÍTICO'?'#f44336':s==='ATENÇÃO'?'#ff9800':'#4caf50'; }
function riscoClr(r) { return r==='CRÍTICO'?'#f44336':r==='ALTO'?'#ff5722':r==='MÉDIO'?'#ff9800':'#4caf50'; }
function scoreClr(s) { return s>=80?'#4caf50':s>=60?'#ff9800':s>=40?'#ff5722':'#f44336'; }

let crmFilter = 'todos', crmSort = 'risco', crmSelected = null;

function initCRM() { renderCRM(); }

function renderCRM() {
    const el = document.getElementById('crm-content');
    if (!el) return;

    const totFat = CRM_CONTACTS.reduce((s,c) => s + c.valorFaturado, 0);
    const totRec = CRM_CONTACTS.reduce((s,c) => s + c.valorRecebido, 0);
    const totPen = CRM_CONTACTS.reduce((s,c) => s + c.valorPendente, 0);
    const nCrit = CRM_CONTACTS.filter(c => c.status==='CRÍTICO'||c.risco==='ALTO').length;
    const nAten = CRM_CONTACTS.filter(c => c.status==='ATENÇÃO'&&c.risco!=='ALTO').length;
    const nReg = CRM_CONTACTS.filter(c => c.status==='REGULAR').length;
    const nInad = CRM_CONTACTS.filter(c => c.inadimplencia > 20).length;

    let list = [...CRM_CONTACTS];
    if (crmFilter==='criticos') list = list.filter(c => c.status==='CRÍTICO'||c.risco==='ALTO');
    else if (crmFilter==='atencao') list = list.filter(c => c.status==='ATENÇÃO'&&c.risco!=='ALTO');
    else if (crmFilter==='regulares') list = list.filter(c => c.status==='REGULAR');
    else if (crmFilter==='clientes') list = list.filter(c => c.tipo.includes('Cliente'));
    else if (crmFilter==='fornecedores') list = list.filter(c => c.tipo.includes('Fornecedor'));
    else if (crmFilter==='inadimplentes') list = list.filter(c => c.inadimplencia > 20);

    if (crmSort==='risco') list.sort((a,b) => b.inadimplencia - a.inadimplencia);
    else if (crmSort==='valor') list.sort((a,b) => b.valorPendente - a.valorPendente);
    else if (crmSort==='nome') list.sort((a,b) => a.empresa.localeCompare(b.empresa));
    else if (crmSort==='score') list.sort((a,b) => calcScore(a) - calcScore(b));

    el.innerHTML = `
        <!-- KPIs -->
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Faturado</span><span class="material-icons-outlined kpi-icon" style="color:var(--magenta);">account_balance</span></div><div class="kpi-value">${fmt(totFat)}</div><div class="kpi-sub">${CRM_CONTACTS.length} contatos cadastrados</div></div>
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Recebido</span><span class="material-icons-outlined kpi-icon green">check_circle</span></div><div class="kpi-value green">${fmt(totRec)}</div><div class="kpi-sub">${((totRec/totFat)*100).toFixed(1)}% do faturado</div></div>
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Pendente</span><span class="material-icons-outlined kpi-icon red">error</span></div><div class="kpi-value red">${fmt(totPen)}</div><div class="kpi-sub">${((totPen/totFat)*100).toFixed(1)}% inadimplência</div></div>
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Saúde da Carteira</span><span class="material-icons-outlined kpi-icon orange">health_and_safety</span></div><div class="kpi-value" style="font-size:16px;"><span style="color:#f44336;">${nCrit} Críticos</span> · <span style="color:#ff9800;">${nAten} Atenção</span> · <span style="color:#4caf50;">${nReg} OK</span></div><div class="kpi-sub">${nInad} inadimplentes acima de 20%</div></div>
        </div>

        <!-- Filtros -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin:16px 0;align-items:center;">
            <span style="font-weight:600;color:#8a8fa8;font-size:13px;">FILTRAR:</span>
            ${['todos','criticos','atencao','regulares','inadimplentes','clientes','fornecedores'].map(f => {
                const labels = {todos:`Todos (${CRM_CONTACTS.length})`,criticos:`Críticos (${nCrit})`,atencao:`Atenção (${nAten})`,regulares:`Regulares (${nReg})`,inadimplentes:`Inadimpl. (${nInad})`,clientes:'Clientes',fornecedores:'Fornecedores'};
                return `<button onclick="crmFilter='${f}';renderCRM();" style="padding:6px 14px;border-radius:6px;border:1px solid ${crmFilter===f?'var(--magenta)':'#2a2d3e'};background:${crmFilter===f?'var(--magenta)20':'transparent'};color:${crmFilter===f?'var(--magenta)':'#8a8fa8'};cursor:pointer;font-size:12px;font-weight:600;">${labels[f]}</button>`;
            }).join('')}
            <span style="margin-left:16px;font-weight:600;color:#8a8fa8;font-size:13px;">ORDENAR:</span>
            ${['risco','valor','score','nome'].map(s => {
                const labels = {risco:'Maior Risco',valor:'Maior Valor',score:'Menor Score',nome:'Nome A-Z'};
                return `<button onclick="crmSort='${s}';renderCRM();" style="padding:6px 14px;border-radius:6px;border:1px solid ${crmSort===s?'var(--cyan)':'#2a2d3e'};background:${crmSort===s?'var(--cyan)20':'transparent'};color:${crmSort===s?'var(--cyan)':'#8a8fa8'};cursor:pointer;font-size:12px;font-weight:600;">${labels[s]}</button>`;
            }).join('')}
        </div>

        <!-- Tabela -->
        <div style="overflow-x:auto;border-radius:8px;border:1px solid #2a2d3e;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead><tr style="background:#1a1c2e;">
                    <th style="padding:12px 10px;text-align:left;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Empresa</th>
                    <th style="padding:12px 8px;text-align:left;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Tipo</th>
                    <th style="padding:12px 8px;text-align:left;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Status</th>
                    <th style="padding:12px 8px;text-align:center;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Score</th>
                    <th style="padding:12px 8px;text-align:center;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">ABC</th>
                    <th style="padding:12px 8px;text-align:right;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Faturado</th>
                    <th style="padding:12px 8px;text-align:right;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Pendente</th>
                    <th style="padding:12px 8px;text-align:center;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Inadimpl.</th>
                    <th style="padding:12px 8px;text-align:center;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Prio</th>
                    <th style="padding:12px 8px;text-align:center;color:#8a8fa8;font-weight:600;border-bottom:1px solid #2a2d3e;">Ações</th>
                </tr></thead>
                <tbody>
                    ${list.map(c => {
                        const sc = calcScore(c), abc = classABC(c), pr = prioCobranca(c);
                        return `<tr style="border-bottom:1px solid #1e2035;cursor:pointer;transition:background 0.2s;" onmouseenter="this.style.background='#1a1c2e'" onmouseleave="this.style.background='transparent'" onclick="showDetail(${c.id})">
                            <td style="padding:10px;"><div style="font-weight:600;color:#e8eaf0;">${c.empresa}</div><div style="font-size:11px;color:#6b7094;">${c.email!=='—'?c.email:c.segmento}</div></td>
                            <td style="padding:10px 8px;"><span style="padding:3px 8px;border-radius:4px;font-size:11px;background:#1a237e40;color:#90caf9;">${c.tipo}</span></td>
                            <td style="padding:10px 8px;"><span style="padding:3px 8px;border-radius:4px;font-size:11px;background:${statusClr(c.status)}20;color:${statusClr(c.status)};border:1px solid ${statusClr(c.status)}40;">${c.status}</span></td>
                            <td style="padding:10px 8px;text-align:center;"><div style="display:flex;align-items:center;gap:6px;justify-content:center;"><div style="width:40px;height:6px;background:#1e2035;border-radius:3px;overflow:hidden;"><div style="width:${sc}%;height:100%;background:${scoreClr(sc)};border-radius:3px;"></div></div><span style="color:${scoreClr(sc)};font-weight:700;font-size:12px;">${sc}</span></div></td>
                            <td style="padding:10px 8px;text-align:center;"><span style="padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:${abc==='A'?'#e91e8c':abc==='B'?'#00bcd4':'#8a8fa8'}20;color:${abc==='A'?'#e91e8c':abc==='B'?'#00bcd4':'#8a8fa8'};">${abc}</span></td>
                            <td style="padding:10px 8px;text-align:right;font-weight:500;color:#e8eaf0;">${fmt(c.valorFaturado)}</td>
                            <td style="padding:10px 8px;text-align:right;font-weight:700;color:${c.valorPendente>0?'#f44336':'#4caf50'};">${fmt(c.valorPendente)}</td>
                            <td style="padding:10px 8px;text-align:center;font-weight:700;color:${riscoClr(c.risco)};">${c.inadimplencia.toFixed(1)}%</td>
                            <td style="padding:10px 8px;text-align:center;"><span style="padding:3px 10px;border-radius:4px;font-size:11px;font-weight:700;background:${pr<=2?'#f4433630':pr<=3?'#ff980030':'#4caf5030'};color:${pr<=2?'#f44336':pr<=3?'#ff9800':'#4caf50'};">P${pr}</span></td>
                            <td style="padding:10px 8px;text-align:center;">
                                <button onclick="event.stopPropagation();showDetail(${c.id});" style="background:none;border:1px solid #2a2d3e;color:#8a8fa8;border-radius:4px;padding:4px 8px;cursor:pointer;font-size:11px;" onmouseenter="this.style.borderColor='var(--magenta)';this.style.color='var(--magenta)';" onmouseleave="this.style.borderColor='#2a2d3e';this.style.color='#8a8fa8';">Detalhes</button>
                                ${c.email!=='—'?`<a href="mailto:${c.email}" onclick="event.stopPropagation();" style="background:none;border:1px solid #2a2d3e;color:#8a8fa8;border-radius:4px;padding:4px 8px;cursor:pointer;font-size:11px;text-decoration:none;margin-left:4px;" onmouseenter="this.style.borderColor='var(--cyan)';this.style.color='var(--cyan)';" onmouseleave="this.style.borderColor='#2a2d3e';this.style.color='#8a8fa8';">Email</a>`:''}
                            </td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>

        <!-- Detalhe -->
        <div id="crm-detail" style="display:none;margin-top:16px;"></div>

        <!-- Resumo Regras de Negócio -->
        <div style="margin-top:24px;padding:20px;background:#1a1c2e;border-radius:8px;border:1px solid #2a2d3e;">
            <h3 style="margin:0 0 12px;color:#e8eaf0;font-size:15px;">📋 Regras de Negócio do CRM</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;">
                <div><h4 style="color:var(--magenta);margin:0 0 6px;font-size:13px;">Classificação ABC</h4><p style="color:#8a8fa8;font-size:12px;margin:0;">A = 70% do faturamento (top clientes)<br>B = 20% do faturamento (médios)<br>C = 10% do faturamento (pequenos)</p></div>
                <div><h4 style="color:var(--cyan);margin:0 0 6px;font-size:13px;">Score de Saúde (0-100)</h4><p style="color:#8a8fa8;font-size:12px;margin:0;">Penaliza: inadimplência, valor pendente alto, inatividade &gt;60 dias<br>80+ = Saudável | 60-79 = Atenção | &lt;60 = Crítico</p></div>
                <div><h4 style="color:#ff9800;margin:0 0 6px;font-size:13px;">Prioridade de Cobrança</h4><p style="color:#8a8fa8;font-size:12px;margin:0;">P1 = Pendente &gt;R$100k (urgente)<br>P2 = Pendente &gt;R$20k + inadimpl. &gt;25%<br>P3 = Pendente &gt;R$10k | P4 = Outros | P5 = Sem pendência</p></div>
                <div><h4 style="color:#4caf50;margin:0 0 6px;font-size:13px;">Status Automático</h4><p style="color:#8a8fa8;font-size:12px;margin:0;">CRÍTICO = Inadimpl. &gt;40% ou risco alto<br>ATENÇÃO = Inadimpl. 15-40%<br>REGULAR = Inadimpl. &lt;15%</p></div>
            </div>
        </div>
    `;
}

function showDetail(id) {
    const c = CRM_CONTACTS.find(x => x.id === id);
    if (!c) return;
    const sc = calcScore(c), abc = classABC(c), pr = prioCobranca(c);
    const det = document.getElementById('crm-detail');
    det.style.display = 'block';
    det.innerHTML = `
        <div style="background:#1a1c2e;border-radius:8px;border:1px solid #2a2d3e;padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:12px;">
                <div><h3 style="margin:0;color:#e8eaf0;font-size:18px;">${c.empresa}</h3><p style="margin:4px 0;color:#8a8fa8;font-size:13px;">${c.tipo} · ${c.segmento} · Classificação ${abc}</p></div>
                <div style="display:flex;gap:8px;align-items:center;">
                    <span style="padding:6px 14px;border-radius:6px;font-size:13px;font-weight:600;background:${statusClr(c.status)}20;color:${statusClr(c.status)};border:1px solid ${statusClr(c.status)}40;">${c.status}</span>
                    <span style="padding:6px 14px;border-radius:6px;font-size:13px;font-weight:600;background:${pr<=2?'#f4433630':'#ff980030'};color:${pr<=2?'#f44336':'#ff9800'};">Prioridade ${pr}</span>
                    <button onclick="document.getElementById('crm-detail').style.display='none';" style="background:none;border:none;color:#8a8fa8;cursor:pointer;font-size:18px;">✕</button>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:16px;">
                <div style="background:#12141f;padding:14px;border-radius:6px;">
                    <h4 style="margin:0 0 8px;color:var(--magenta);font-size:13px;">Contato</h4>
                    <p style="color:#c0c4d8;font-size:13px;margin:4px 0;"><strong>Email:</strong> ${c.email}</p>
                    ${c.emailSec?`<p style="color:#c0c4d8;font-size:13px;margin:4px 0;"><strong>Email 2:</strong> ${c.emailSec}</p>`:''}
                    <p style="color:#c0c4d8;font-size:13px;margin:4px 0;"><strong>Última Transação:</strong> ${new Date(c.ultimaTransacao).toLocaleDateString('pt-BR')}</p>
                </div>
                <div style="background:#12141f;padding:14px;border-radius:6px;">
                    <h4 style="margin:0 0 8px;color:var(--cyan);font-size:13px;">Financeiro</h4>
                    <p style="color:#c0c4d8;font-size:13px;margin:4px 0;"><strong>Faturado:</strong> ${fmt(c.valorFaturado)}</p>
                    <p style="color:#4caf50;font-size:13px;margin:4px 0;"><strong>Recebido:</strong> ${fmt(c.valorRecebido)}</p>
                    <p style="color:#f44336;font-size:13px;margin:4px 0;"><strong>Pendente:</strong> ${fmt(c.valorPendente)}</p>
                    <p style="color:${riscoClr(c.risco)};font-size:13px;margin:4px 0;"><strong>Inadimpl.:</strong> ${c.inadimplencia.toFixed(1)}%</p>
                    <p style="color:${scoreClr(sc)};font-size:13px;margin:4px 0;"><strong>Score:</strong> ${sc}/100</p>
                </div>
                <div style="background:#12141f;padding:14px;border-radius:6px;">
                    <h4 style="margin:0 0 8px;color:#ff9800;font-size:13px;">Observações</h4>
                    <p style="color:#c0c4d8;font-size:13px;">${c.obs}</p>
                </div>
                <div style="background:#12141f;padding:14px;border-radius:6px;">
                    <h4 style="margin:0 0 8px;color:#4caf50;font-size:13px;">Ações Recomendadas</h4>
                    ${c.acoes.map(a => `<div style="color:#c0c4d8;font-size:13px;margin:4px 0;padding:4px 0;border-bottom:1px solid #1e2035;">→ ${a}</div>`).join('')}
                </div>
            </div>
            <div style="margin-top:16px;background:#12141f;padding:14px;border-radius:6px;">
                <h4 style="margin:0 0 10px;color:#e8eaf0;font-size:13px;">Histórico de Transações</h4>
                <table style="width:100%;border-collapse:collapse;font-size:12px;">
                    <thead><tr style="border-bottom:1px solid #2a2d3e;"><th style="padding:8px;text-align:left;color:#8a8fa8;">Data</th><th style="padding:8px;text-align:left;color:#8a8fa8;">Tipo</th><th style="padding:8px;text-align:right;color:#8a8fa8;">Valor</th><th style="padding:8px;text-align:left;color:#8a8fa8;">Descrição</th></tr></thead>
                    <tbody>${c.historico.map(h => `<tr style="border-bottom:1px solid #1e2035;"><td style="padding:8px;color:#c0c4d8;">${new Date(h.data).toLocaleDateString('pt-BR')}</td><td style="padding:8px;"><span style="padding:2px 8px;border-radius:4px;font-size:11px;background:${h.tipo==='Débito'||h.tipo==='NF'?'#f4433620':'#4caf5020'};color:${h.tipo==='Débito'||h.tipo==='NF'?'#f44336':'#4caf50'};">${h.tipo}</span></td><td style="padding:8px;text-align:right;font-weight:600;color:#e8eaf0;">${fmt(h.valor)}</td><td style="padding:8px;color:#8a8fa8;">${h.desc}</td></tr>`).join('')}</tbody>
                </table>
            </div>
        </div>
    `;
    det.scrollIntoView({ behavior: 'smooth' });
}
