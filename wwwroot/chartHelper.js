let currentChart = null;

window.renderChart = (canvasId, type, labels, values) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Уничтожаем предыдущую диаграмму, если есть
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }

    const colors = [
        'rgba(103, 80, 164, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(244, 67, 54, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(255, 235, 59, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(0, 188, 212, 0.8)'
    ];

    let chartType = type;
    let datasetConfig = {
        label: 'Значения',
        data: values,
        backgroundColor: colors,
        borderColor: 'rgba(103, 80, 164, 1)',
        borderWidth: 2
    };

    // Спецнастройки под тип
    if (type === 'line') {
        datasetConfig.backgroundColor = 'rgba(103, 80, 164, 0.2)';
        datasetConfig.fill = false;
        datasetConfig.tension = 0.3;
    } else if (type === 'area') {
        chartType = 'line';
        datasetConfig.backgroundColor = 'rgba(103, 80, 164, 0.4)';
        datasetConfig.fill = true;
        datasetConfig.tension = 0.3;
    } else if (type === 'radar') {
        datasetConfig.backgroundColor = 'rgba(103, 80, 164, 0.3)';
        datasetConfig.fill = true;
    } else if (type === 'scatter') {
        chartType = 'scatter';
        datasetConfig.data = values.map((v, i) => ({ x: i + 1, y: v }));
        datasetConfig.pointRadius = 8;
        datasetConfig.backgroundColor = 'rgba(103, 80, 164, 0.8)';
    }

    currentChart = new Chart(canvas, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [datasetConfig]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'bottom' }
            },
            scales: (type === 'pie' || type === 'doughnut' || type === 'radar') ? {} : {
                y: { beginAtZero: true }
            }
        }
    });
};