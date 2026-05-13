'use client';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function InteractiveChart() {
  const [rate, setRate] = useState(0.60);
  const [capital, setCapital] = useState(100000);
  const [timeRange, setTimeRange] = useState(10);

  const labels = Array.from({ length: timeRange + 1 }, (_, i) => i);
  
  const simpleData = labels.map(n => capital * (1 + rate * n));
  const compoundData = labels.map(n => capital * Math.pow(1 + rate, n));

  const data = {
    labels,
    datasets: [
      {
        label: 'Monto Simple (M = C(1+jn))',
        data: simpleData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Monto Compuesto (M = C(1+i)^n)',
        data: compoundData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'var(--foreground)' }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: { color: 'var(--card-border)' },
        ticks: { color: 'var(--foreground)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'var(--foreground)' }
      }
    }
  };

  return (
    <div className="glass-card">
      <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Simulador de Crecimiento</h3>
      
      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            Tasa Nominal Anual (TNA): {(rate * 100).toFixed(0)}%
          </label>
          <input 
            type="range" 
            min="0.01" 
            max="2.0" 
            step="0.01" 
            value={rate} 
            onChange={(e) => setRate(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            Plazo (Períodos): {timeRange}
          </label>
          <input 
            type="range" 
            min="1" 
            max="30" 
            step="1" 
            value={timeRange} 
            onChange={(e) => setTimeRange(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>
      </div>

      <div style={{ height: '400px' }}>
        <Line options={options} data={data} />
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>
        Nota: Observa cómo a partir de n=1, el interés compuesto supera exponencialmente al simple.
      </p>
    </div>
  );
}
