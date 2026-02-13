// App.js - Navegacao, Anomalias, Relatorio e Inicializacao
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCharts();
    renderTransactions();
    renderAnomalies();
    renderAuditReport();
    initCRM();
    setTimeout(() => initMindmap(), 500);
});

// Navegacao
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    const titles = {
        'overview': 'Visao Geral',
        'receivables': 'Recebimentos',
        'anomalies': 'Anomalias Detectadas',
        'mindmap': 'Mapa Mental',
        'audit': 'Relatorio de Auditoria',
        'crm': 'CRM Proprietario',
        'agent-master': 'Cientista de Dados Senior',
        'agent-inadimplencia': 'Agente de Inadimplencia',
        'agent-custos': 'Agente de Custos',
        'agent-qualidade': 'Agente de Qualidade',
        'agent-vendas': 'Agente de Vendas',
        'agent-planejamento': 'Agente de Planejamento'
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            sections.forEach(s => s.classList.remove('active'));
            const target = document.getElementById('section-' + section);
            if (target) target.classList.add('active');
            if (pageTitle) pageTitle.textContent = titles[section] || section;
            if (section === 'mindmap') setTimeout(() => initMindmap(), 200);
            if (window.innerWidth < 1024 && sidebar) sidebar.classList.remove('open');
        });
    });

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
}

// Transacoes
function renderTransactions() {
    const tbody = document.getElementById('transactions-body');
    if (!tbody) return;
    const txs = [
        { data: '23/09/2025', desc: 'DEBITO 138.000 REF. 156.762,76 FRONERI', tipo: 'Debito', valor: 'R$ 138.000,00', status: 'critico' },
        { data: '09/06/2025', desc: 'TRANSF PARA EMBALAFITAS - PAG BOLETOS', tipo: 'Transferencia', valor: 'R$ 17.502,00', status: 'ok' },
        { data: '30/06/2025', desc: 'PAG BOLETO NF 13920/7 FENIX', tipo: 'Boleto', valor: 'R$ 52.300,00', status: 'ok' },
        { data: '03/12/2025', desc: 'IFCO SYSTEMS - Servicos Embalagem', tipo: 'Servico', valor: 'R$ 42.000,00', status: 'ok' },
        { data: '15/08/2025', desc: 'PAG BOLETOS NF 13944/5 NF 13864/6', tipo: 'Boleto', valor: 'R$ 45.000,00', status: 'ok' },
        { data: '20/10/2025', desc: 'PAG BOLETO NF 14018/2 NF 14042/2', tipo: 'Boleto', valor: 'R$ 38.500,00', status: 'ok' },
        { data: '24/05/2025', desc: 'REGISTRO DE RECEITA EMISSAO NF', tipo: 'Receita', valor: 'R$ 85.000,00', status: 'ok' },
        { data: '05/07/2025', desc: 'TUDO LEGAL IND. COMERCIO - Pendente', tipo: 'Pendente', valor: 'R$ 22.000,00', status: 'alerta' },
        { data: '01/07/2024', desc: 'Pix Gustavo - Pagamento Parcial', tipo: 'PIX', valor: 'R$ 8.500,00', status: 'ok' },
        { data: '10/06/2024', desc: 'NOVA PROSPER DIST. ALIMENTOS', tipo: 'Boleto', valor: 'R$ 35.000,00', status: 'alerta' }
    ];
    tbody.innerHTML = txs.map(t => {
        const statusBadge = t.status === 'critico' ? '<span class="badge badge-red">CRITICO</span>' :
            t.status === 'alerta' ? '<span class="badge badge-orange">ALERTA</span>' :
            '<span class="badge badge-green">OK</span>';
        return `<tr><td>${t.data}</td><td>${t.desc}</td><td>${t.tipo}</td><td><strong>${t.valor}</strong></td><td>${statusBadge}</td></tr>`;
    }).join('');
}

// Anomalias
function renderAnomalies() {
    const grid = document.getElementById('anomalies-grid');
    if (!grid) return;
    const anomalies = [
        {
            titulo: 'Colapso de Vendas', periodo: 'Junho 2024', severidade: 'CRITICO', cor: 'var(--red)', icone: 'trending_down',
            impacto: 'Queda de 60% nas vendas. Receita caiu de R$ 1,42M para R$ 620k. Inadimplencia disparou para 42,8%.',
            causa: 'Concentracao excessiva em poucos clientes. Perda de cliente-chave ou cancelamento de pedidos grandes sem diversificacao de carteira.',
            perda: 'R$ 800.000',
            recomendacoes: ['Diversificar carteira de clientes (nenhum cliente > 15% da receita)', 'Criar pipeline de vendas com previsibilidade', 'Implementar seguro de credito para grandes contas', 'Estabelecer reserva de contingencia de 3 meses']
        },
        {
            titulo: 'Explosao de Custos', periodo: 'Setembro 2024', severidade: 'CRITICO', cor: 'var(--orange)', icone: 'trending_up',
            impacto: 'Custos aumentaram 35%. Debito emergencial de R$ 138.000 com FRONERI (ref. R$ 156.762,76). Margem caiu de 25% para 15%.',
            causa: 'Falta de controle de custos e planejamento orcamentario. Dependencia de fornecedor unico. Ajuste emergencial de fluxo de caixa.',
            perda: 'R$ 420.000 (margem perdida)',
            recomendacoes: ['Renegociar contrato com FRONERI - plano de pagamento parcelado', 'Implementar orcamento mensal com teto de custos', 'Diversificar base de fornecedores (minimo 3 por categoria)', 'Criar comite de aprovacao para gastos acima de R$ 50.000']
        },
        {
            titulo: 'Crise de Qualidade', periodo: 'Marco 2025', severidade: 'ALTO', cor: 'var(--yellow)', icone: 'report_problem',
            impacto: 'Receita caiu 15%. Inadimplencia subiu para 26,4%. Registros de lote e quantidade divergente. Perda de confianca dos clientes.',
            causa: 'Falha no controle de qualidade de producao. Divergencia entre lotes produzidos e faturados. Possivel problema no processo de embalagem.',
            perda: 'R$ 350.000 + dano reputacional',
            recomendacoes: ['Implementar ISO 9001 ou equivalente', 'Rastreabilidade completa de lotes (do insumo ao cliente)', 'Auditoria de qualidade mensal com relatorio ao CEO', 'Programa de recall e compensacao para clientes afetados']
        }
    ];

    grid.innerHTML = anomalies.map(a => `
        <div class="anomaly-card" style="border-left:4px solid ${a.cor};">
            <div class="anomaly-header">
                <div class="anomaly-badge" style="background:${a.cor}20;color:${a.cor};"><span class="material-icons-outlined">${a.icone}</span> ${a.severidade}</div>
                <span class="anomaly-periodo">${a.periodo}</span>
            </div>
            <h3 class="anomaly-titulo">${a.titulo}</h3>
            <div class="anomaly-section"><h4><span class="material-icons-outlined" style="font-size:16px;">flash_on</span> Impacto</h4><p>${a.impacto}</p></div>
            <div class="anomaly-section"><h4><span class="material-icons-outlined" style="font-size:16px;">search</span> Causa Provavel</h4><p>${a.causa}</p></div>
            <div class="anomaly-perda"><span class="material-icons-outlined" style="color:${a.cor};">monetization_on</span><span>Perda Estimada: <strong style="color:${a.cor};">${a.perda}</strong></span></div>
            <div class="anomaly-section"><h4><span class="material-icons-outlined" style="font-size:16px;">lightbulb</span> Recomendacoes</h4><ul>${a.recomendacoes.map(r => `<li>${r}</li>`).join('')}</ul></div>
        </div>
    `).join('');
}

// Relatorio de Auditoria
function renderAuditReport() {
    const report = document.getElementById('audit-report');
    if (!report) return;
    report.innerHTML = `
        <div class="report-header">
            <img src="img/logo.png" alt="Fit Film" style="height:50px;">
            <div>
                <h1>RELATORIO DE AUDITORIA FINANCEIRA</h1>
                <h2>FITFILM COMERCIO E REPRESENTACAO LTDA</h2>
                <p>Periodo: Janeiro 2024 a Dezembro 2025 | Data: ${new Date().toLocaleDateString('pt-BR')}</p>
                <p>Classificacao: <strong style="color:var(--red);">CONFIDENCIAL</strong></p>
            </div>
        </div>

        <div class="report-section">
            <h2><span class="material-icons-outlined">summarize</span> 1. SUMARIO EXECUTIVO</h2>
            <p>A auditoria financeira da Fit Film no periodo de Janeiro/2024 a Dezembro/2025 revela uma situacao financeira <strong style="color:var(--red);">CRITICA</strong> que demanda acoes imediatas da diretoria.</p>
            <div class="report-highlight red"><strong>ALERTA PRINCIPAL:</strong> A empresa opera com taxa de inadimplencia de 22,33%, que e 4,5 vezes superior ao benchmark do setor de embalagens (3-5%). Aproximadamente 40% do faturamento total de R$ 57 milhoes NAO foi convertido em caixa efetivo.</div>
            <p>Tres anomalias criticas foram identificadas no periodo: colapso de vendas (Jun/2024), explosao de custos (Set/2024) e crise de qualidade (Mar/2025). Juntas, essas anomalias representam uma perda estimada de R$ 1,57 milhao.</p>
        </div>

        <div class="report-section">
            <h2><span class="material-icons-outlined">analytics</span> 2. INDICADORES FINANCEIROS</h2>
            <table class="report-table">
                <thead><tr><th>Indicador</th><th>Valor Atual</th><th>Benchmark</th><th>Status</th><th>Gap</th></tr></thead>
                <tbody>
                    <tr><td>Faturamento Total</td><td>R$ 57.041.350</td><td>-</td><td class="status-ok">Referencia</td><td>-</td></tr>
                    <tr><td>Total Recebido</td><td>R$ 35.495.864</td><td>85-92%</td><td class="status-critico">CRITICO</td><td>-23,25pp</td></tr>
                    <tr><td>Taxa de Inadimplencia</td><td>22,33%</td><td>3-5%</td><td class="status-critico">CRITICO</td><td>+17,33pp</td></tr>
                    <tr><td>Eficiencia de Recebimento</td><td>61,75%</td><td>85-92%</td><td class="status-critico">CRITICO</td><td>-23,25pp</td></tr>
                    <tr><td>Taxa de Atraso</td><td>16,58%</td><td>5-8%</td><td class="status-alerta">ALERTA</td><td>+8,58pp</td></tr>
                    <tr><td>Total Vencido</td><td>R$ 11.643.500</td><td>&lt;5%</td><td class="status-critico">CRITICO</td><td>+15,4pp</td></tr>
                    <tr><td>Margem de Lucro</td><td>15-25%</td><td>20-30%</td><td class="status-alerta">ALERTA</td><td>-5pp</td></tr>
                </tbody>
            </table>
        </div>

        <div class="report-section">
            <h2><span class="material-icons-outlined">warning</span> 3. ACHADOS CRITICOS</h2>
            <h3>3.1 Colapso de Vendas - Junho 2024</h3>
            <p>As vendas cairam 60% em um unico mes, de R$ 1,42M para R$ 620k. A taxa de inadimplencia disparou para 42,8%, indicando que alem de vender menos, a empresa tambem nao conseguiu receber o que vendeu. Perda estimada: R$ 800.000.</p>
            <h3>3.2 Explosao de Custos - Setembro 2024</h3>
            <p>Os custos operacionais aumentaram 35% sem aumento proporcional de receita. Debito emergencial de R$ 138.000 com FRONERI (ref. R$ 156.762,76). Margem de lucro caiu de 25% para 15%.</p>
            <h3>3.3 Crise de Qualidade - Marco 2025</h3>
            <p>Problemas com "lote e quantidade divergente" resultaram em queda de 15% na receita e aumento da inadimplencia para 26,4%. Dano reputacional com impacto de longo prazo.</p>
            <p><strong>Impacto acumulado estimado:</strong> <span style="color:var(--red);font-weight:700">R$ 1.570.000 em perdas diretas.</span></p>
        </div>

        <div class="report-section">
            <h2><span class="material-icons-outlined">account_balance</span> 4. ANALISE DE FLUXO DE CAIXA</h2>
            <div class="report-highlight orange"><strong>PROBLEMA CENTRAL:</strong> O gap entre faturamento e recebimento efetivo e de R$ 21,5 milhoes (37,8% do faturado). A empresa fatura mas nao recebe, criando uma ilusao de receita que nao se materializa em caixa.</div>
            <ul>
                <li><strong>Em Dia:</strong> R$ 28,4M (49,8%)</li>
                <li><strong>Atrasado:</strong> R$ 5,7M (10%) - Acima do aceitavel</li>
                <li><strong>Vencido:</strong> R$ 11,6M (20,4%) - CRITICO</li>
                <li><strong>A Vencer:</strong> R$ 21,5M (37,8%) - Risco de conversao</li>
            </ul>
        </div>

        <div class="report-section">
            <h2><span class="material-icons-outlined">lightbulb</span> 5. RECOMENDACOES ESTRATEGICAS</h2>
            <div class="recommendation-card"><h3>R1. Reestruturacao da Politica de Credito (URGENTE - 30 dias)</h3><p>Implementar scoring de credito. Nenhum cliente > 15% da receita. Limite baseado em historico.</p><p><strong>Custo:</strong> R$ 15.000 + R$ 5.000/mes | <strong>ROI:</strong> R$ 5,8M recuperados em 12 meses</p></div>
            <div class="recommendation-card"><h3>R2. Programa de Cobranca Ativa (URGENTE - 15 dias)</h3><p>Equipe dedicada. Priorizar R$ 11,6M vencidos. Descontos para pagamento antecipado (2-5%).</p><p><strong>Custo:</strong> R$ 8.000/mes | <strong>ROI:</strong> R$ 3,5M a R$ 5,8M recuperados</p></div>
            <div class="recommendation-card"><h3>R3. Controle de Qualidade (60 dias)</h3><p>Rastreabilidade de lotes. Auditoria mensal. Certificacao ISO 9001.</p><p><strong>Custo:</strong> R$ 50.000 + R$ 10.000/mes | <strong>ROI:</strong> Prevencao de R$ 350.000+ em perdas</p></div>
            <div class="recommendation-card"><h3>R4. Diversificacao de Receita (90 dias)</h3><p>Expandir carteira. Nenhum cliente > 15%. Novos segmentos de embalagem.</p><p><strong>Custo:</strong> R$ 20.000/mes | <strong>ROI:</strong> Reducao de risco de concentracao</p></div>
            <div class="recommendation-card"><h3>R5. Reserva de Contingencia (Imediato)</h3><p>Reserva de 3 meses de custos fixos. 5% da receita mensal para fundo de emergencia.</p><p><strong>Custo:</strong> ~R$ 70.000/mes | <strong>ROI:</strong> Protecao contra crises futuras</p></div>
        </div>

        <div class="report-section">
            <h2><span class="material-icons-outlined">gavel</span> 6. CONCLUSAO</h2>
            <p>A Fit Film enfrenta situacao financeira que exige acoes <strong>imediatas e estruturais</strong>. A taxa de inadimplencia de 22,33% e insustentavel.</p>
            <div class="report-highlight green"><strong>CENARIO OTIMISTA (com acoes):</strong> Recuperar R$ 5M-10M em 12 meses, reduzir inadimplencia para 8-10%, restaurar margem para 22-25%.</div>
            <div class="report-highlight red"><strong>CENARIO PESSIMISTA (sem acoes):</strong> Inadimplencia 30%+, fluxo de caixa insuficiente em 6 meses, risco real de insolvencia.</div>
            <p style="margin-top:24px;text-align:center;color:var(--text-muted);font-size:12px;"><em>Relatorio elaborado com base em dados reais extraidos dos sistemas financeiros da Fit Film.<br>Auditoria conduzida por sistema de IA com supervisao humana. | Confidencial - Uso exclusivo da diretoria.</em></p>
        </div>
    `;
}
