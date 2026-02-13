// App.js - Navegacao, Anomalias, Relatorio Estrategico e Inicializacao
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
        'overview': 'Visão Geral Financeira',
        'receivables': 'Recebimentos',
        'anomalies': 'Onde Erramos - Anomalias Críticas',
        'mindmap': 'Mapa Mental Estratégico',
        'audit': 'Plano de Transformação',
        'crm': 'CRM Proprietário',
        'agent-master': 'Consultor Estratégico Chefe',
        'agent-inadimplencia': 'Consultor de Inadimplência',
        'agent-custos': 'Consultor de Custos',
        'agent-qualidade': 'Consultor de Qualidade',
        'agent-vendas': 'Consultor de Vendas',
        'agent-planejamento': 'Consultor de Planejamento'
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

// Transacoes Reais
function renderTransactions() {
    const tbody = document.getElementById('transactions-body');
    if (!tbody) return;
    const txs = [
        { data: '23/09/2025', desc: 'DÉBITO 138.000 REF. 156.762,76 FRONERI - AJUSTE EMERGENCIAL', tipo: 'Débito', valor: 'R$ 138.000,00', status: 'critico' },
        { data: '09/06/2025', desc: 'TRANSF PARA EMBALAFITAS - PAG BOLETOS', tipo: 'Transferência', valor: 'R$ 17.502,00', status: 'ok' },
        { data: '30/06/2025', desc: 'PAG BOLETO NF 13920/7 FENIX', tipo: 'Boleto', valor: 'R$ 52.300,00', status: 'ok' },
        { data: '03/12/2025', desc: 'IFCO SYSTEMS - Serviços Embalagem', tipo: 'Serviço', valor: 'R$ 42.000,00', status: 'ok' },
        { data: '15/08/2025', desc: 'PAG BOLETOS NF 13944/5 NF 13864/6', tipo: 'Boleto', valor: 'R$ 45.000,00', status: 'ok' },
        { data: '20/10/2025', desc: 'PAG BOLETO NF 14018/2 NF 14042/2', tipo: 'Boleto', valor: 'R$ 38.500,00', status: 'ok' },
        { data: '24/05/2025', desc: 'REGISTRO DE RECEITA EMISSÃO NF', tipo: 'Receita', valor: 'R$ 85.000,00', status: 'ok' },
        { data: '05/07/2025', desc: 'TUDO LEGAL IND. COMÉRCIO - Pendente', tipo: 'Pendente', valor: 'R$ 22.000,00', status: 'alerta' },
        { data: '01/07/2024', desc: 'Pix Gustavo - Pagamento Parcial', tipo: 'PIX', valor: 'R$ 8.500,00', status: 'ok' },
        { data: '10/06/2024', desc: 'NOVA PROSPER DIST. ALIMENTOS - Pendente', tipo: 'Boleto', valor: 'R$ 35.000,00', status: 'alerta' }
    ];
    tbody.innerHTML = txs.map(t => {
        const statusBadge = t.status === 'critico' ? '<span class="badge badge-red">CRÍTICO</span>' :
            t.status === 'alerta' ? '<span class="badge badge-orange">ALERTA</span>' :
            '<span class="badge badge-green">OK</span>';
        return `<tr><td>${t.data}</td><td>${t.desc}</td><td>${t.tipo}</td><td><strong>${t.valor}</strong></td><td>${statusBadge}</td></tr>`;
    }).join('');
}

// Anomalias - ONDE ERRAMOS
function renderAnomalies() {
    const grid = document.getElementById('anomalies-grid');
    if (!grid) return;
    const anomalies = [
        {
            titulo: 'ERRO #1: Colapso de Vendas',
            subtitulo: 'A empresa perdeu R$ 800 mil em um único mês',
            periodo: 'Junho 2024',
            severidade: 'CRÍTICO',
            cor: 'var(--red)',
            icone: 'trending_down',
            dados_mostram: [
                'Receita caiu de R$ 1,42M para R$ 620k = QUEDA DE 57%',
                'Inadimplência disparou de 18,5% para 42,8% = SUBIU 131%',
                'Vencido saltou de R$ 430k para R$ 780k = SUBIU 81%',
                'Perda real estimada: R$ 800.000'
            ],
            onde_errou: 'Concentração excessiva em poucos clientes grandes. Quando um cliente-chave parou de comprar, a empresa perdeu mais da metade da receita. Empresa de 25 anos sem diversificação de carteira.',
            metodo_antigo: 'Vendas baseadas em relacionamento pessoal, sem pipeline, sem CRM, sem previsibilidade. Método de empresa dos anos 2000.',
            caminho: [
                'IMEDIATO: Nenhum cliente pode representar mais de 15% da receita',
                '30 DIAS: Criar pipeline de vendas com 3 canais de aquisição',
                '60 DIAS: Implementar CRM com scoring de clientes',
                '90 DIAS: Programa de diversificação com meta de 50+ clientes ativos'
            ],
            perda: 'R$ 800.000'
        },
        {
            titulo: 'ERRO #2: Explosão de Custos',
            subtitulo: 'A margem despencou 40% e precisou de ajuste emergencial',
            periodo: 'Setembro 2024',
            severidade: 'CRÍTICO',
            cor: 'var(--orange)',
            icone: 'trending_up',
            dados_mostram: [
                'Custos subiram 35% sem aumento proporcional de receita',
                'Débito emergencial R$ 138.000 com FRONERI (ref. R$ 156.762,76)',
                'Margem caiu de 25% para 15% = PERDA DE 40% DA RENTABILIDADE',
                'Atrasados: R$ 310k (média R$ 215k = SUBIU 44%)',
                'Vencido: R$ 680k (média R$ 430k = SUBIU 58%)'
            ],
            onde_errou: 'Sem orçamento mensal com teto de gastos. Sem controle de custos. Dependência de fornecedor único. Ajuste de fluxo de caixa feito na emergência.',
            metodo_antigo: 'Gestão financeira reativa: só percebe o problema quando o dinheiro acaba. Sem planejamento orçamentário, sem comitê de aprovação de gastos.',
            caminho: [
                'IMEDIATO: Renegociar dívida FRONERI - parcelamento em 6x',
                '15 DIAS: Implementar orçamento mensal com teto por departamento',
                '30 DIAS: Diversificar fornecedores (mínimo 3 por categoria)',
                '60 DIAS: Comitê de aprovação para gastos acima de R$ 50.000',
                '90 DIAS: Migrar 80% dos pagamentos para PIX (economia de taxas)'
            ],
            perda: 'R$ 420.000 (margem perdida)'
        },
        {
            titulo: 'ERRO #3: Crise de Qualidade',
            subtitulo: 'Lotes divergentes custaram receita e reputação',
            periodo: 'Março 2025',
            severidade: 'ALTO',
            cor: 'var(--yellow)',
            icone: 'report_problem',
            dados_mostram: [
                'Receita caiu 15% por problema de qualidade',
                'Inadimplência subiu de 18,5% para 26,4% = SUBIU 43%',
                'Vencido: R$ 560k (acima da média de R$ 430k)',
                'Registros de "lote e quantidade divergente" no sistema',
                'Clientes insatisfeitos = não pagam + não voltam'
            ],
            onde_errou: 'Empresa de 25 anos no setor de embalagens SEM certificação ISO, SEM rastreabilidade de lotes, SEM auditoria de processo. Controle de qualidade informal.',
            metodo_antigo: 'Qualidade baseada em "confiança" e "experiência", não em processos documentados. Sem indicadores, sem métricas, sem rastreabilidade.',
            caminho: [
                'IMEDIATO: Rastreabilidade completa de lotes (do insumo ao cliente)',
                '30 DIAS: Auditoria de qualidade mensal com relatório ao CEO',
                '60 DIAS: Programa de recall e compensação para clientes afetados',
                '90 DIAS: Iniciar processo de certificação ISO 9001',
                '180 DIAS: Certificação ISO 9001 completa'
            ],
            perda: 'R$ 350.000 + dano reputacional'
        }
    ];

    grid.innerHTML = anomalies.map(a => `
        <div class="anomaly-card" style="border-left:4px solid ${a.cor};">
            <div class="anomaly-header">
                <div class="anomaly-badge" style="background:${a.cor}20;color:${a.cor};"><span class="material-icons-outlined">${a.icone}</span> ${a.severidade}</div>
                <span class="anomaly-periodo">${a.periodo}</span>
            </div>
            <h3 class="anomaly-titulo">${a.titulo}</h3>
            <p style="color:var(--text-muted);font-size:13px;margin:-4px 0 12px;">${a.subtitulo}</p>
            
            <div class="anomaly-section">
                <h4><span class="material-icons-outlined" style="font-size:16px;">bar_chart</span> O QUE OS DADOS MOSTRAM</h4>
                <ul style="list-style:none;padding:0;">${a.dados_mostram.map(d => `<li style="padding:3px 0;font-size:13px;"><span style="color:${a.cor};margin-right:6px;">▸</span>${d}</li>`).join('')}</ul>
            </div>
            
            <div class="anomaly-section">
                <h4><span class="material-icons-outlined" style="font-size:16px;">error_outline</span> ONDE ERROU</h4>
                <p>${a.onde_errou}</p>
            </div>
            
            <div class="anomaly-section" style="background:#ff980010;border-radius:8px;padding:12px;">
                <h4 style="color:var(--orange);"><span class="material-icons-outlined" style="font-size:16px;">history</span> MÉTODO ANTIGO (O PROBLEMA)</h4>
                <p style="font-style:italic;">${a.metodo_antigo}</p>
            </div>
            
            <div class="anomaly-perda"><span class="material-icons-outlined" style="color:${a.cor};">monetization_on</span><span>Perda Estimada: <strong style="color:${a.cor};">${a.perda}</strong></span></div>
            
            <div class="anomaly-section" style="background:#4caf5010;border-radius:8px;padding:12px;">
                <h4 style="color:var(--green);"><span class="material-icons-outlined" style="font-size:16px;">rocket_launch</span> O CAMINHO (SOLUÇÃO)</h4>
                <ul style="list-style:none;padding:0;">${a.caminho.map(c => `<li style="padding:4px 0;font-size:13px;"><span style="color:var(--green);margin-right:6px;font-weight:700;">→</span>${c}</li>`).join('')}</ul>
            </div>
        </div>
    `).join('');
}

// RELATÓRIO DE TRANSFORMAÇÃO: DE ONDE VIEMOS → ONDE ESTAMOS → PARA ONDE VAMOS
function renderAuditReport() {
    const report = document.getElementById('audit-report');
    if (!report) return;
    report.innerHTML = `
        <div class="report-header">
            <img src="img/logo.png" alt="Fit Film" style="height:50px;">
            <div>
                <h1>PLANO DE TRANSFORMAÇÃO EMPRESARIAL</h1>
                <h2>FITFILM COMÉRCIO E REPRESENTAÇÃO LTDA</h2>
                <p>Baseado em Dados Reais | Janeiro 2024 a Dezembro 2025</p>
                <p>Data: ${new Date().toLocaleDateString('pt-BR')} | <strong style="color:var(--red);">CONFIDENCIAL</strong></p>
            </div>
        </div>

        <!-- REGRA IMUTÁVEL -->
        <div class="report-section" style="background:linear-gradient(135deg, #e91e8c15, #00bcd415);border:1px solid #e91e8c30;border-radius:12px;padding:24px;margin-bottom:24px;">
            <h2 style="text-align:center;color:#e91e8c;margin-bottom:16px;">REGRA IMUTÁVEL: OS DADOS DIZEM TUDO</h2>
            <p style="text-align:center;font-size:15px;color:var(--text-primary);">Este plano não é baseado em opiniões. Cada diagnóstico, cada erro identificado e cada solução proposta vem diretamente dos dados financeiros reais da Fit Film. Os números não mentem.</p>
        </div>

        <!-- PARTE 1: DE ONDE VIEMOS -->
        <div class="report-section">
            <h2 style="color:#e91e8c;"><span class="material-icons-outlined">history</span> PARTE 1: DE ONDE VIEMOS</h2>
            <p>A Fit Film é uma empresa de <strong>25 anos</strong> no setor de embalagens (Packing & Storage Solutions). Ao longo desse tempo, construiu uma base de clientes sólida e um faturamento expressivo de <strong>R$ 57 milhões em 24 meses</strong>.</p>
            <div class="report-highlight orange">
                <strong>MAS OS DADOS MOSTRAM O PROBLEMA:</strong><br>
                A empresa cresceu em faturamento mas NÃO modernizou seus processos. Em 25 anos, os métodos de gestão financeira, comercial e de qualidade permaneceram os mesmos. O resultado: uma empresa que FATURA muito mas RECEBE pouco.
            </div>
            <h3>Evidências dos Métodos Antigos (dados reais):</h3>
            <table class="report-table">
                <thead><tr><th>Método Antigo</th><th>Evidência nos Dados</th><th>Impacto</th></tr></thead>
                <tbody>
                    <tr><td>Ainda usa CHEQUE</td><td>15 transações com cheque em 2024-2025</td><td>Risco de fraude, custo alto, lentidão</td></tr>
                    <tr><td>Ainda usa DUPLICATA</td><td>83 transações com duplicata</td><td>Método ultrapassado, custo de desconto</td></tr>
                    <tr><td>Boleto como método principal</td><td>902 transações (61,7% do total)</td><td>Custo bancário alto, inadimplência facilitada</td></tr>
                    <tr><td>PIX subutilizado</td><td>Apenas 285 transações (19,5%)</td><td>Não aproveita recebimento instantâneo</td></tr>
                    <tr><td>Sem scoring de crédito</td><td>Inadimplência de 22,33% (setor: 3-5%)</td><td>Dá crédito sem critério = não recebe</td></tr>
                    <tr><td>Sem controle de qualidade</td><td>"Lote e quantidade divergente"</td><td>Perda de clientes e receita</td></tr>
                    <tr><td>Sem diversificação</td><td>Queda de 57% quando 1 cliente saiu</td><td>Risco fatal de concentração</td></tr>
                    <tr><td>Gestão reativa</td><td>Débito emergencial R$ 138k FRONERI</td><td>Apaga incêndio em vez de planejar</td></tr>
                </tbody>
            </table>
        </div>

        <!-- PARTE 2: ONDE ESTAMOS -->
        <div class="report-section">
            <h2 style="color:#00bcd4;"><span class="material-icons-outlined">location_on</span> PARTE 2: ONDE ESTAMOS AGORA</h2>
            <p>Os dados de 24 meses (Jan/2024 a Dez/2025) mostram com precisão a situação atual:</p>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:20px 0;">
                <div style="background:#f4433615;border:1px solid #f4433630;border-radius:10px;padding:16px;">
                    <h4 style="color:#f44336;margin:0 0 8px;">O DINHEIRO QUE NÃO ENTRA</h4>
                    <p style="font-size:28px;font-weight:800;color:#f44336;margin:0;">R$ 21,5M</p>
                    <p style="font-size:12px;color:var(--text-muted);margin:4px 0 0;">37,8% do faturado NÃO foi recebido</p>
                </div>
                <div style="background:#ff980015;border:1px solid #ff980030;border-radius:10px;padding:16px;">
                    <h4 style="color:#ff9800;margin:0 0 8px;">INADIMPLÊNCIA CRÔNICA</h4>
                    <p style="font-size:28px;font-weight:800;color:#ff9800;margin:0;">22,33%</p>
                    <p style="font-size:12px;color:var(--text-muted);margin:4px 0 0;">4,5x acima do aceitável (setor: 3-5%)</p>
                </div>
                <div style="background:#fdd83515;border:1px solid #fdd83530;border-radius:10px;padding:16px;">
                    <h4 style="color:#fdd835;margin:0 0 8px;">PERDAS EM 18 MESES</h4>
                    <p style="font-size:28px;font-weight:800;color:#fdd835;margin:0;">R$ 1,57M</p>
                    <p style="font-size:12px;color:var(--text-muted);margin:4px 0 0;">3 crises: Jun/24, Set/24, Mar/25</p>
                </div>
                <div style="background:#4caf5015;border:1px solid #4caf5030;border-radius:10px;padding:16px;">
                    <h4 style="color:#4caf50;margin:0 0 8px;">O QUE FUNCIONA</h4>
                    <p style="font-size:28px;font-weight:800;color:#4caf50;margin:0;">R$ 35,5M</p>
                    <p style="font-size:12px;color:var(--text-muted);margin:4px 0 0;">Recebido efetivamente (base sólida)</p>
                </div>
            </div>

            <h3>Diagnóstico por Área:</h3>
            <table class="report-table">
                <thead><tr><th>Área</th><th>Situação Atual (Dados)</th><th>Benchmark Setor</th><th>Gap</th><th>Diagnóstico</th></tr></thead>
                <tbody>
                    <tr><td><strong>Recebimento</strong></td><td>61,75%</td><td>85-92%</td><td style="color:#f44336;font-weight:700;">-23pp</td><td style="color:#f44336;">CRÍTICO</td></tr>
                    <tr><td><strong>Inadimplência</strong></td><td>22,33%</td><td>3-5%</td><td style="color:#f44336;font-weight:700;">+17pp</td><td style="color:#f44336;">CRÍTICO</td></tr>
                    <tr><td><strong>Atrasos</strong></td><td>16,58%</td><td>5-8%</td><td style="color:#ff9800;font-weight:700;">+9pp</td><td style="color:#ff9800;">ALERTA</td></tr>
                    <tr><td><strong>Margem</strong></td><td>15-25%</td><td>20-30%</td><td style="color:#ff9800;font-weight:700;">-5pp</td><td style="color:#ff9800;">ALERTA</td></tr>
                    <tr><td><strong>Concentração</strong></td><td>Top 5 = 70%+ receita</td><td>Top 5 < 40%</td><td style="color:#f44336;font-weight:700;">+30pp</td><td style="color:#f44336;">CRÍTICO</td></tr>
                    <tr><td><strong>Qualidade</strong></td><td>Sem ISO, lotes divergentes</td><td>ISO 9001</td><td style="color:#f44336;font-weight:700;">Total</td><td style="color:#f44336;">CRÍTICO</td></tr>
                    <tr><td><strong>Tecnologia</strong></td><td>Cheque, duplicata, boleto</td><td>PIX, automação</td><td style="color:#ff9800;font-weight:700;">Alto</td><td style="color:#ff9800;">ALERTA</td></tr>
                </tbody>
            </table>

            <div class="report-highlight red">
                <strong>DIAGNÓSTICO CENTRAL:</strong><br>
                O erro do planejamento foi planejar com base em FATURAMENTO (R$ 57M) e não em RECEBIMENTO REAL (R$ 35,5M). É como planejar uma viagem de 1.000km com combustível para 620km. O dinheiro que a empresa contava NÃO EXISTIA.
            </div>
        </div>

        <!-- PARTE 3: PARA ONDE VAMOS -->
        <div class="report-section">
            <h2 style="color:#4caf50;"><span class="material-icons-outlined">rocket_launch</span> PARTE 3: PARA ONDE VAMOS</h2>
            <p>Baseado nos dados, este é o plano de transformação em 4 fases para elevar a Fit Film:</p>

            <div style="margin:20px 0;">
                <div class="recommendation-card" style="border-left:4px solid #f44336;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                        <h3 style="color:#f44336;margin:0;">FASE 1: ESTANCAR A HEMORRAGIA (0-30 dias)</h3>
                        <span style="background:#f4433620;color:#f44336;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;">URGENTE</span>
                    </div>
                    <p style="margin:12px 0 8px;"><strong>Objetivo:</strong> Parar de perder dinheiro AGORA</p>
                    <ul style="list-style:none;padding:0;">
                        <li style="padding:4px 0;"><span style="color:#f44336;margin-right:8px;">1.</span><strong>Programa de cobrança ativa</strong> - Priorizar R$ 11,6M vencidos. Começar pelos maiores: FRONERI (R$ 156k), TUPPERWARE (R$ 95k), NOVA PROSPER (R$ 89k)</li>
                        <li style="padding:4px 0;"><span style="color:#f44336;margin-right:8px;">2.</span><strong>Congelar crédito</strong> para clientes com inadimplência acima de 30% até regularização</li>
                        <li style="padding:4px 0;"><span style="color:#f44336;margin-right:8px;">3.</span><strong>Renegociar dívida FRONERI</strong> - Parcelamento do débito de R$ 156.762,76 em 6x</li>
                        <li style="padding:4px 0;"><span style="color:#f44336;margin-right:8px;">4.</span><strong>Desconto para pagamento antecipado</strong> - 3% para quitação em 15 dias</li>
                    </ul>
                    <p style="margin:8px 0 0;font-size:13px;"><strong>Custo:</strong> R$ 8.000/mês | <strong>Meta:</strong> Recuperar R$ 3-5M em 30 dias | <strong>ROI:</strong> 375x a 625x</p>
                </div>

                <div class="recommendation-card" style="border-left:4px solid #ff9800;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                        <h3 style="color:#ff9800;margin:0;">FASE 2: MODERNIZAR PROCESSOS (30-90 dias)</h3>
                        <span style="background:#ff980020;color:#ff9800;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;">PRIORITÁRIO</span>
                    </div>
                    <p style="margin:12px 0 8px;"><strong>Objetivo:</strong> Sair dos métodos antigos</p>
                    <ul style="list-style:none;padding:0;">
                        <li style="padding:4px 0;"><span style="color:#ff9800;margin-right:8px;">1.</span><strong>Scoring de crédito</strong> - Classificar clientes por risco (A/B/C). Limite de crédito baseado em histórico</li>
                        <li style="padding:4px 0;"><span style="color:#ff9800;margin-right:8px;">2.</span><strong>Migrar para PIX</strong> - Meta: 60% das transações via PIX (hoje: 19,5%). Eliminar cheque e duplicata</li>
                        <li style="padding:4px 0;"><span style="color:#ff9800;margin-right:8px;">3.</span><strong>Orçamento mensal</strong> - Teto de gastos por departamento. Comitê de aprovação para >R$ 50k</li>
                        <li style="padding:4px 0;"><span style="color:#ff9800;margin-right:8px;">4.</span><strong>Controle de qualidade</strong> - Rastreabilidade de lotes. Auditoria mensal. Iniciar ISO 9001</li>
                        <li style="padding:4px 0;"><span style="color:#ff9800;margin-right:8px;">5.</span><strong>CRM implementado</strong> - Pipeline de vendas, scoring de clientes, alertas automáticos</li>
                    </ul>
                    <p style="margin:8px 0 0;font-size:13px;"><strong>Custo:</strong> R$ 45.000/mês | <strong>Meta:</strong> Inadimplência < 12% | <strong>ROI:</strong> R$ 5,8M/ano recuperados</p>
                </div>

                <div class="recommendation-card" style="border-left:4px solid #00bcd4;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                        <h3 style="color:#00bcd4;margin:0;">FASE 3: DIVERSIFICAR E CRESCER (90-180 dias)</h3>
                        <span style="background:#00bcd420;color:#00bcd4;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;">ESTRATÉGICO</span>
                    </div>
                    <p style="margin:12px 0 8px;"><strong>Objetivo:</strong> Eliminar risco de concentração e crescer com segurança</p>
                    <ul style="list-style:none;padding:0;">
                        <li style="padding:4px 0;"><span style="color:#00bcd4;margin-right:8px;">1.</span><strong>Diversificação de carteira</strong> - Nenhum cliente > 15% da receita. Meta: 50+ clientes ativos</li>
                        <li style="padding:4px 0;"><span style="color:#00bcd4;margin-right:8px;">2.</span><strong>Novos segmentos</strong> - Embalagens sustentáveis, e-commerce, food service</li>
                        <li style="padding:4px 0;"><span style="color:#00bcd4;margin-right:8px;">3.</span><strong>Diversificar fornecedores</strong> - Mínimo 3 por categoria (reduzir dependência FRONERI/IFCO)</li>
                        <li style="padding:4px 0;"><span style="color:#00bcd4;margin-right:8px;">4.</span><strong>Certificação ISO 9001</strong> - Diferencial competitivo + confiança dos clientes</li>
                    </ul>
                    <p style="margin:8px 0 0;font-size:13px;"><strong>Custo:</strong> R$ 60.000/mês | <strong>Meta:</strong> +20% receita com risco distribuído</p>
                </div>

                <div class="recommendation-card" style="border-left:4px solid #4caf50;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                        <h3 style="color:#4caf50;margin:0;">FASE 4: EMPRESA DO FUTURO (180-365 dias)</h3>
                        <span style="background:#4caf5020;color:#4caf50;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;">VISÃO</span>
                    </div>
                    <p style="margin:12px 0 8px;"><strong>Objetivo:</strong> Transformar a Fit Film em referência do setor</p>
                    <ul style="list-style:none;padding:0;">
                        <li style="padding:4px 0;"><span style="color:#4caf50;margin-right:8px;">1.</span><strong>Automação completa</strong> - Cobrança automática, alertas de inadimplência, relatórios em tempo real</li>
                        <li style="padding:4px 0;"><span style="color:#4caf50;margin-right:8px;">2.</span><strong>BI integrado</strong> - Dashboard em tempo real para CEO e diretoria (como este, mas com dados ao vivo)</li>
                        <li style="padding:4px 0;"><span style="color:#4caf50;margin-right:8px;">3.</span><strong>Planejamento baseado em RECEBIMENTO</strong> - Nunca mais planejar sobre faturamento</li>
                        <li style="padding:4px 0;"><span style="color:#4caf50;margin-right:8px;">4.</span><strong>Reserva de contingência</strong> - 3 meses de custos fixos em reserva</li>
                        <li style="padding:4px 0;"><span style="color:#4caf50;margin-right:8px;">5.</span><strong>Expansão sustentável</strong> - Crescer 30% com inadimplência < 5%</li>
                    </ul>
                    <p style="margin:8px 0 0;font-size:13px;"><strong>Meta Final:</strong> Faturamento R$ 40M/ano com recebimento > 90% = R$ 36M efetivos</p>
                </div>
            </div>
        </div>

        <!-- CENÁRIOS -->
        <div class="report-section">
            <h2><span class="material-icons-outlined">compare_arrows</span> CENÁRIOS BASEADOS NOS DADOS</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:16px 0;">
                <div style="background:#f4433615;border:1px solid #f4433630;border-radius:10px;padding:20px;">
                    <h3 style="color:#f44336;margin:0 0 12px;">SEM AÇÃO (Cenário Atual)</h3>
                    <ul style="list-style:none;padding:0;font-size:13px;">
                        <li style="padding:3px 0;">▸ Inadimplência sobe para 30%+</li>
                        <li style="padding:3px 0;">▸ Fluxo de caixa insuficiente em 6 meses</li>
                        <li style="padding:3px 0;">▸ Mais ajustes emergenciais</li>
                        <li style="padding:3px 0;">▸ Perda de clientes por qualidade</li>
                        <li style="padding:3px 0;">▸ <strong>Risco real de insolvência em 12-18 meses</strong></li>
                    </ul>
                </div>
                <div style="background:#ff980015;border:1px solid #ff980030;border-radius:10px;padding:20px;">
                    <h3 style="color:#ff9800;margin:0 0 12px;">AÇÃO PARCIAL (Fases 1-2)</h3>
                    <ul style="list-style:none;padding:0;font-size:13px;">
                        <li style="padding:3px 0;">▸ Recuperar R$ 3-5M em vencidos</li>
                        <li style="padding:3px 0;">▸ Inadimplência cai para 12-15%</li>
                        <li style="padding:3px 0;">▸ Margem volta para 20-22%</li>
                        <li style="padding:3px 0;">▸ Fluxo de caixa estabilizado</li>
                        <li style="padding:3px 0;">▸ <strong>Empresa sobrevive mas não cresce</strong></li>
                    </ul>
                </div>
                <div style="background:#4caf5015;border:1px solid #4caf5030;border-radius:10px;padding:20px;">
                    <h3 style="color:#4caf50;margin:0 0 12px;">TRANSFORMAÇÃO COMPLETA (4 Fases)</h3>
                    <ul style="list-style:none;padding:0;font-size:13px;">
                        <li style="padding:3px 0;">▸ Recuperar R$ 5-10M em vencidos</li>
                        <li style="padding:3px 0;">▸ Inadimplência < 5% (benchmark)</li>
                        <li style="padding:3px 0;">▸ Margem 25-30%</li>
                        <li style="padding:3px 0;">▸ 50+ clientes diversificados</li>
                        <li style="padding:3px 0;">▸ ISO 9001 certificada</li>
                        <li style="padding:3px 0;">▸ <strong>Empresa referência do setor em 12 meses</strong></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- CONCLUSÃO -->
        <div class="report-section" style="background:linear-gradient(135deg, #e91e8c10, #00bcd410);border-radius:12px;padding:24px;">
            <h2 style="text-align:center;"><span class="material-icons-outlined">flag</span> CONCLUSÃO</h2>
            <p style="text-align:center;font-size:15px;">A Fit Film tem 25 anos de experiência e R$ 57M de faturamento. A base é sólida.<br>O problema não é o mercado. <strong>O problema é o método.</strong></p>
            <p style="text-align:center;font-size:15px;">Os dados mostram claramente: a empresa precisa <strong>modernizar seus processos</strong> para transformar faturamento em recebimento real.</p>
            <div style="text-align:center;margin:20px 0;padding:16px;background:#0a0e1a;border-radius:10px;">
                <p style="font-size:18px;font-weight:700;color:#e91e8c;margin:0;">DE ONDE VIEMOS:</p>
                <p style="font-size:14px;color:var(--text-muted);margin:4px 0 16px;">Empresa de 25 anos com métodos antigos. Fatura R$ 57M, recebe R$ 35,5M.</p>
                <p style="font-size:18px;font-weight:700;color:#00bcd4;margin:0;">ONDE ESTAMOS:</p>
                <p style="font-size:14px;color:var(--text-muted);margin:4px 0 16px;">Inadimplência 22,33%. R$ 21,5M não recebidos. 3 crises em 18 meses.</p>
                <p style="font-size:18px;font-weight:700;color:#4caf50;margin:0;">PARA ONDE VAMOS:</p>
                <p style="font-size:14px;color:var(--text-muted);margin:4px 0 0;">Inadimplência < 5%. Recebimento > 90%. ISO 9001. Empresa referência.</p>
            </div>
            <p style="text-align:center;font-size:12px;color:var(--text-muted);margin-top:16px;"><em>Plano elaborado com base em dados reais extraídos dos sistemas financeiros da Fit Film.<br>Auditoria conduzida por sistema de IA com supervisão humana. | Confidencial - Uso exclusivo da diretoria.</em></p>
        </div>
    `;
}
