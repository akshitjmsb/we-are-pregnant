import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { TrimesterData, ChartData } from '../types';
import { useErrorHandler } from '../hooks/useErrorHandler';

// Register Chart.js components
Chart.register(...registerables);

const timelineData: { [key: string]: TrimesterData } = {
  "1": {
    title: "Month 1 (Weeks 1-4)",
    baby: "The fertilized egg implants in the uterus and begins to grow. The amniotic sac and placenta start to form. Baby is a tiny embryo.",
    you: "You may not even know you're pregnant yet, but might experience fatigue, tender breasts, or mild spotting. This is a crucial time for development.",
    todo: "Start taking prenatal vitamins with folic acid. Avoid alcohol and smoking."
  },
  "2": {
    title: "Month 2 (Weeks 5-8)",
    baby: "The heart begins to beat. Major organs like the brain, lungs, and liver are forming. Facial features start to develop. Baby is about the size of a raspberry.",
    you: "Morning sickness, fatigue, and frequent urination are common. Your first prenatal visit is usually scheduled during this month.",
    todo: "Find a healthcare provider (doctor or midwife). Schedule your first appointment."
  },
  "3": {
    title: "Month 3 (Weeks 9-12)",
    baby: "The embryo is now a fetus. All essential organs have formed. Fingers and toes are distinct. The fetus can open and close its fists and mouth. Size of a lime.",
    you: "Morning sickness may start to subside by the end of this month. You might start to feel a bit more energetic. You'll likely have your dating ultrasound.",
    todo: "Have your first prenatal appointment and dating ultrasound. Consider when you'll share your news."
  },
  "4": {
    title: "Month 4 (Weeks 13-16)",
    baby: "The fetus can now suck its thumb, yawn, and make facial expressions. The nervous system is starting to function. You might be able to hear the heartbeat at your check-up. Size of an avocado.",
    you: "Welcome to the second trimester! Energy levels often return, and you may start to show a small baby bump. Morning sickness usually fades.",
    todo: "Start thinking about prenatal classes. Look into maternity leave (QPIP)."
  },
  "5": {
    title: "Month 5 (Weeks 17-20)",
    baby: "Hair, eyebrows, and eyelashes appear. The fetus becomes more active, and you might start to feel the first flutters of movement ('quickening'). Size of a banana.",
    you: "Your baby bump is more noticeable. You'll have your detailed anatomy scan ultrasound around week 20 to check on the baby's development.",
    todo: "Schedule and attend your anatomy scan. Start shopping for maternity clothes."
  },
  "6": {
    title: "Month 6 (Weeks 21-24)",
    baby: "The fetus's skin is reddish and wrinkled, and fingerprints and footprints are formed. The baby responds to sounds from outside the womb. Size of an ear of corn.",
    you: "You're likely feeling the baby move regularly now. You may experience backaches or swelling in your ankles as your uterus expands.",
    todo: "Register for prenatal and infant CPR classes. Continue with healthy eating and moderate exercise."
  },
  "7": {
    title: "Month 7 (Weeks 25-28)",
    baby: "The baby can now open and close its eyes and may be able to sense changes in light. Lungs are developing, but not yet mature. Size of an eggplant.",
    you: "You're in the third trimester. You might feel more tired and find it harder to get comfortable. You'll have your glucose screening test for gestational diabetes.",
    todo: "Take your glucose screening test. Start thinking about your birth plan."
  },
  "8": {
    title: "Month 8 (Weeks 29-32)",
    baby: "The baby is gaining weight rapidly. Bones are fully developed but still soft. The baby is likely in a head-down position now. Size of a pineapple.",
    you: "You may experience Braxton Hicks contractions. Appointments will become more frequent (every two weeks). Shortness of breath is common.",
    todo: "Pack your hospital bag. Finish setting up the nursery. Finalize your QPIP application."
  },
  "9": {
    title: "Month 9 (Weeks 33-40+)",
    baby: "The lungs are maturing, and the baby continues to gain fat. The baby 'drops' lower into your pelvis in preparation for birth. Average size of a small pumpkin.",
    you: "Appointments are now weekly. You may feel a mix of excitement and impatience. Rest as much as possible as you wait for labour to begin.",
    todo: "Install the car seat. Rest, rest, rest! Watch for signs of labour."
  }
};

const chartData: { [key: string]: ChartData } = {
  "1": {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    growth: [0.2, 2.5, 7.5],
    symptoms: [3, 8, 6]
  },
  "2": {
    labels: ['Month 4', 'Month 5', 'Month 6'],
    growth: [13, 27, 30],
    symptoms: [4, 5, 6]
  },
  "3": {
    labels: ['Month 7', 'Month 8', 'Month 9'],
    growth: [36, 43, 51],
    symptoms: [7, 8, 9]
  }
};

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
              label: function(context: any) {
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
              className={`timeline-month rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeMonth === month ? 'active' : ''
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
              className={`trimester-btn px-4 py-2 rounded-lg font-semibold ${
                activeTrimester === trimester ? 'active' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTrimester(trimester)}
            >
              {trimester === '1' ? 'First Trimester' : trimester === '2' ? 'Second Trimester' : 'Third Trimester'}
            </button>
          ))}
        </div>
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
});
