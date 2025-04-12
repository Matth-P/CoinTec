import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation'; // Importar o plugin de anotações
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './progress.css';

// Registrar o plugin de anotações
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, annotationPlugin);

const Progress = () => {
    const simulatedData = [
        { month: 'Jan', value: 1000 },
        { month: 'Fev', value: 1350 },
        { month: 'Mar', value: 1500 },
        { month: 'Abr', value: 1900 },
        { month: 'Mai', value: 1750 },
        { month: 'Jun', value: 1510 },
        { month: 'Jul', value: 1620 },
        { month: 'Ago', value: 1690 },
        { month: 'Set', value: 1540 },
    ];

    const [monthlyProgress, setMonthlyProgress] = useState(simulatedData);
    const goal = 1600; // Meta financeira simulada

    const exportFinancialDataToPDF = () => {
        if (monthlyProgress.length === 0) {
            alert('Nenhum dado disponível para exportar.');
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Relatório Financeiro", 10, 10);

        const tableData = monthlyProgress.map((item) => [item.month, `R$ ${item.value.toLocaleString('pt-BR')}`]);
        doc.autoTable({
            head: [['Mês', 'Economia Mensal']],
            body: tableData,
            startY: 20,
            theme: 'striped',
            headStyles: { fillColor: [22, 160, 133] },
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    const chartData = {
        labels: monthlyProgress.map((item) => item.month),
        datasets: [
            {
                label: 'Progresso',
                data: monthlyProgress.map((item) => item.value),
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#00d4ff',
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `R$ ${context.raw.toLocaleString('pt-BR')}`,
                },
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 16,
                },
            },
            annotation: {
                annotations: {
                    lineGoal: {
                        type: 'line',
                        yMin: goal, 
                        yMax: goal,
                        borderColor: 'red', 
                        borderWidth: 2, 
                        borderDash: [5, 5], 
                        label: {
                            content: `Meta: R$ ${goal.toLocaleString('pt-BR')}`, 
                            enabled: true,
                            position: 'end', 
                            backgroundColor: 'rgba(255, 0, 0, 0.8)', 
                            color: 'white', 
                            font: {
                                size: 12,
                                weight: 'bold',
                            },
                        },
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    return (
        <div className="progress-container">
            <div className="goal-section">
                <h2>Metas Financeiras</h2>

                {/* Botão para exportar o PDF */}
                <button onClick={exportFinancialDataToPDF} className="export-button">Exportar para PDF</button>
            </div>

            <div className="chart-section">
                {monthlyProgress.length > 0 && (
                    <div className="chart-container">
                        <h3>Economia Mensal</h3>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Progress;