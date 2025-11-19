import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { TrimesterData, ChartData } from '../types';
import { useErrorHandler } from '../hooks/useErrorHandler';

// Register Chart.js components
Chart.register(...registerables);

import { timelineData, chartData } from '../data/timelineData';

export const Timeline = React.memo(function Timeline() {
  const [activeMonth, setActiveMonth] = useState('1');
  const [activeTrimester, setActiveTrimester] = useState('1');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { error, handleError, clearError } = useErrorHandler();

  const createChart = (trimester: string) => {
    try {
      clearError();

      if (!chartRef.current) {
        throw new Error('Chart canvas element not found');
      }

      // Destroy existing chart
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const data = chartData[trimester];
      if (!data) {
        throw new Error(`No chart data found for trimester: ${trimester}`);
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) {
        throw new Error('Unable to get 2D context from canvas');
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Fetal Length',
              data: data.growth,
              borderColor: '#D5A08C',
              backgroundColor: '#D5A08C',
              tension: 0.3,
              yAxisID: 'y',
            },
            {
              label: 'Symptom Intensity',
              data: data.symptoms,
              borderColor: '#818ed9',
              backgroundColor: '#818ed9',
              tension: 0.3,
              yAxisID: 'y1',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Fetal Length (cm)',
                color: '#AF6B51'
              },
              grid: {
                drawOnChartArea: false
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              min: 0,
              max: 10,
              title: {
                display: true,
                text: 'Symptom Intensity (1-10)',
                color: '#5A67D8'
              },
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.dataset.yAxisID === 'y') {
                    label += context.parsed.y + ' cm';
                  } else {
                    label += context.parsed.y + '/10';
                  }
                  return label;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          },
          animation: {
            duration: 800
          }
        }
      });
    } catch (err) {
      handleError(err, 'Chart creation');
    }
  };

  useEffect(() => {
    createChart(activeTrimester);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [activeTrimester]);

  const activeMonthData = timelineData[activeMonth];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Your 9-Month Journey</h2>
        <p className="mt-2 text-gray-600">Explore the key milestones and changes for you and your baby, month by month.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          <p className="font-bold">Error loading chart</p>
          <p>{error.message}</p>
        </div>
      )}

      <div className="mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex justify-center space-x-2">
          {Object.keys(timelineData).map((month) => (
            <button
              key={month}
              className={`timeline-month rounded-full px-4 py-2 text-sm font-semibold transition ${activeMonth === month ? 'active' : ''
                }`}
              onClick={() => setActiveMonth(month)}
            >
              Month {month}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#FDFBF8] p-6 rounded-lg min-h-[200px]">
        {activeMonthData && (
          <div>
            <h3 className="font-bold text-lg text-[#AF6B51] mb-3">{activeMonthData.title}</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Baby's Development</h4>
                <p className="text-gray-600">{activeMonthData.baby}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Changes for You</h4>
                <p className="text-gray-600">{activeMonthData.you}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Your To-Do List</h4>
                <p className="text-gray-600">{activeMonthData.todo}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Trimester Overview: Growth & Symptoms</h3>
          <p className="mt-1 text-gray-600">See how fetal growth correlates with common maternal symptoms across trimesters.</p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          {Object.keys(chartData).map((trimester) => (
            <button
              key={trimester}
              className={`trimester-btn px-4 py-2 rounded-lg font-semibold ${activeTrimester === trimester ? 'active' : 'bg-gray-200 text-gray-700'
                }`}
              onClick={() => setActiveTrimester(trimester)}
            >
              {trimester === '1' ? 'First Trimester' : trimester === '2' ? 'Second Trimester' : 'Third Trimester'}
            </button>
          ))}
        </div>
        <div className="chart-container">
          <canvas ref={chartRef} role="img" aria-label="Chart showing fetal growth and symptom intensity over time"></canvas>
        </div>
      </div>
    </div>
  );
});
