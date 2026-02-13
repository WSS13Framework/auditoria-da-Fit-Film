// CRM Proprietario - Gestao de Clientes e Fornecedores
const CRM_DATA = [
    {
        nome: 'FRONERI', tipo: 'Cliente/Parceiro', risco: 'critico',
        contato: 'Departamento Financeiro', telefone: '(11) 3XXX-XXXX',
        valorTotal: 156762.76, valorPendente: 138000, ultimaTransacao: '23/09/2025',
        historico: 'Debito emergencial de R$ 138.000 para ajuste de fluxo de caixa. Referencia: R$ 156.762,76. Principal parceiro com maior exposicao financeira.',
        acoes: ['Renegociar divida', 'Definir plano de pagamento', 'Revisar contrato'],
        score: 25
    },
    {
        nome: 'IFCO SYSTEMS DO BRASIL', tipo: 'Fornecedor', risco: 'medio',
        contato: 'Comercial', telefone: '(11) 4XXX-XXXX',
        valorTotal: 42000, valorPendente: 0, ultimaTransacao: '03/12/2025',
        historico: 'Fornecedor de servicos de embalagem. Pagamentos regulares. Parceiro estrategico para operacoes.',
        acoes: ['Manter relacionamento', 'Negociar melhores condicoes'],
        score: 72
    },
    {
        nome: 'EMBALAFITAS', tipo: 'Fornecedor', risco: 'baixo',
        contato: 'Financeiro', telefone: '(21) 3XXX-XXXX',
        valorTotal: 17502, valorPendente: 0, ultimaTransacao: '09/06/2025',
        historico: 'Transferencia de R$ 17.502 para pagamento de boletos. Fornecedor regular.',
        acoes: ['Manter parceria', 'Avaliar alternativas'],
        score: 85
    },
    {
        nome: 'FENIX', tipo: 'Cliente', risco: 'baixo',
        contato: 'Compras', telefone: '(31) 3XXX-XXXX',
        valorTotal: 52300, valorPendente: 0, ultimaTransacao: '30/06/2025',
        historico: 'Pagamento de boleto NF 13920/7. Cliente com historico de pagamento pontual.',
        acoes: ['Ampliar volume de negocios', 'Oferecer novos produtos'],
        score: 90
    },
    {
        nome: 'EMP. BRASILEIRA DE DISTRIBUICAO', tipo: 'Cliente', risco: 'baixo',
        contato: 'Supply Chain', telefone: '(11) 2XXX-XXXX',
        valorTotal: 67000, valorPendente: 0, ultimaTransacao: '24/05/2025',
        historico: 'Pagamentos regulares. Grande distribuidor. Potencial para aumento de volume.',
        acoes: ['Propor contrato anual', 'Aumentar mix de produtos'],
        score: 88
    },
    {
        nome: 'NOVA PROSPER DIST. ALIMENTOS', tipo: 'Cliente', risco: 'medio',
        contato: 'Comercial', telefone: '(41) 3XXX-XXXX',
        valorTotal: 35000, valorPendente: 8500, ultimaTransacao: '15/08/2025',
        historico: 'Distribuidor de alimentos. Alguns atrasos pontuais nos pagamentos.',
        acoes: ['Monitorar pagamentos', 'Revisar limite de credito'],
        score: 62
    },
    {
        nome: 'FORTYMIX DIST. EMBALAGENS', tipo: 'Fornecedor', risco: 'baixo',
        contato: 'Vendas', telefone: '(47) 3XXX-XXXX',
        valorTotal: 28000, valorPendente: 0, ultimaTransacao: '20/10/2025',
        historico: 'Distribuidor de embalagens. Fornecimento regular e pontual.',
        acoes: ['Manter parceria', 'Negociar volume'],
        score: 82
    },
    {
        nome: 'TUDO LEGAL IND. E COMERCIO', tipo: 'Cliente', risco: 'alto',
        contato: 'Financeiro', telefone: '(19) 3XXX-XXXX',
        valorTotal: 45000, valorPendente: 22000, ultimaTransacao: '05/07/2025',
        historico: 'Industria e comercio. Atrasos frequentes. Valor pendente significativo.',
        acoes: ['Cobranca ativa', 'Reduzir limite de credito', 'Exigir garantias'],
        score: 35
    }
];

function initCRM() {
    renderCRMStats();
    renderCRMGrid(CRM_DATA);
}

function renderCRMStats() {
    const stats = document.getElementById('crm-stats');
    if (!stats) return;
    const total = CRM_DATA.length;
    const clientes = CRM_DATA.filter(c => c.tipo.includes('Cliente')).length;
    const fornecedores = CRM_DATA.filter(c => c.tipo === 'Fornecedor').length;
    const criticos = CRM_DATA.filter(c => c.risco === 'critico' || c.risco === 'alto').length;
    const pendente = CRM_DATA.reduce((s, c) => s + c.valorPendente, 0);
    const scoreMedia = Math.round(CRM_DATA.reduce((s, c) => s + c.score, 0) / total);

    stats.innerHTML = `
        <div class="kpi-row">
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Cadastros</span><span class="material-icons-outlined kpi-icon blue">groups</span></div><div class="kpi-value">${total}</div><div class="kpi-sub">${clientes} clientes | ${fornecedores} fornecedores</div></div>
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Risco Critico/Alto</span><span class="material-icons-outlined kpi-icon red">warning</span></div><div class="kpi-value red">${criticos}</div><div class="kpi-sub">${((criticos/total)*100).toFixed(0)}% da carteira</div></div>
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Valor Pendente</span><span class="material-icons-outlined kpi-icon orange">payments</span></div><div class="kpi-value orange">R$ ${(pendente/1000).toFixed(0)}k</div><div class="kpi-sub">Total a receber</div></div>
            <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Score Medio</span><span class="material-icons-outlined kpi-icon green">speed</span></div><div class="kpi-value">${scoreMedia}/100</div><div class="kpi-sub">Saude da carteira</div></div>
        </div>
    `;
}

function renderCRMGrid(data) {
    const grid = document.getElementById('crm-grid');
    if (!grid) return;
    grid.innerHTML = data.map(c => {
        const riscoColors = { critico: 'var(--red)', alto: 'var(--orange)', medio: 'var(--yellow)', baixo: 'var(--green)' };
        const riscoLabels = { critico: 'CRITICO', alto: 'ALTO', medio: 'MEDIO', baixo: 'BAIXO' };
        const scoreColor = c.score >= 70 ? 'var(--green)' : c.score >= 40 ? 'var(--yellow)' : 'var(--red)';
        return `
            <div class="crm-card" style="border-left:4px solid ${riscoColors[c.risco]};">
                <div class="crm-card-header">
                    <div>
                        <h3>${c.nome}</h3>
                        <span class="badge" style="background:${riscoColors[c.risco]}20;color:${riscoColors[c.risco]};">${riscoLabels[c.risco]}</span>
                        <span class="badge badge-blue">${c.tipo}</span>
                    </div>
                    <div class="crm-score" style="border-color:${scoreColor};color:${scoreColor};">${c.score}</div>
                </div>
                <div class="crm-card-body">
                    <div class="crm-info-row"><span class="material-icons-outlined" style="font-size:16px;">person</span> ${c.contato} | ${c.telefone}</div>
                    <div class="crm-info-row"><span class="material-icons-outlined" style="font-size:16px;">event</span> Ultima transacao: ${c.ultimaTransacao}</div>
                    <div class="crm-financials">
                        <div><small>Valor Total</small><strong>R$ ${c.valorTotal.toLocaleString('pt-BR')}</strong></div>
                        <div><small>Pendente</small><strong style="color:${c.valorPendente > 0 ? 'var(--red)' : 'var(--green)'};">R$ ${c.valorPendente.toLocaleString('pt-BR')}</strong></div>
                    </div>
                    <p class="crm-historico">${c.historico}</p>
                    <div class="crm-acoes">
                        <strong>Acoes Recomendadas:</strong>
                        ${c.acoes.map(a => `<span class="crm-acao-tag">${a}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterCRM() {
    const search = document.getElementById('crm-search').value.toLowerCase();
    const tipo = document.getElementById('crm-type-filter').value;
    const risco = document.getElementById('crm-risk-filter').value;
    let filtered = CRM_DATA;
    if (search) filtered = filtered.filter(c => c.nome.toLowerCase().includes(search));
    if (tipo !== 'all') filtered = filtered.filter(c => c.tipo.includes(tipo));
    if (risco !== 'all') filtered = filtered.filter(c => c.risco === risco);
    renderCRMGrid(filtered);
}
