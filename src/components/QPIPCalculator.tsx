import React, { useState, useEffect, useMemo } from 'react';
import { QPIPCalculator as QPIPCalc } from '../utils/qpipCalculations';
import { QPIPResults, QPIPCalculation } from '../types';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useCloudQPIPHistory } from '../hooks/useCloudStorage';

export const QPIPCalculator = React.memo(function QPIPCalculator() {
  const [salary, setSalary] = useState(65000);
  const [employmentType, setEmploymentType] = useState<'employee' | 'self-employed'>('employee');
  const [plan, setPlan] = useState<'basic' | 'special'>('basic');
  const [taxRate, setTaxRate] = useState(30);
  const [results, setResults] = useState<QPIPResults | null>(null);
  const [isEligible, setIsEligible] = useState(true);

  const { error, handleError, clearError } = useErrorHandler();
  const { qpipHistory, saveQPIPCalculation, isLoading: isHistoryLoading } = useCloudQPIPHistory();

  const calculateBenefits = async () => {
    try {
      clearError();

      const calculation: QPIPCalculation = {
        salary,
        plan,
        employmentType,
        taxRate: taxRate / 100,
        timestamp: new Date().toISOString()
      };

      const benefits = QPIPCalc.calculateBenefits(calculation);

      if (benefits === null) {
        setIsEligible(false);
        setResults(null);
      } else {
        setIsEligible(true);
        setResults(benefits);

        // Save calculation to cloud storage
        try {
          await saveQPIPCalculation({
            ...calculation,
            results: benefits
          });
        } catch (saveError) {
          console.warn('Failed to save calculation to cloud storage:', saveError);
        }
      }
    } catch (err) {
      handleError(err, 'QPIP calculation');
    }
  };

  useEffect(() => {
    calculateBenefits();
  }, [salary, plan, employmentType, taxRate]);

  const formatCurrency = useMemo(() => QPIPCalc.formatCurrency, []);
  const requiredDocuments = useMemo(() =>
    QPIPCalc.getRequiredDocuments(employmentType), [employmentType]
  );

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">QPIP Benefit Calculator</h2>
        <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
          Estimate your maternity, paternity, and parental leave benefits from the Quebec Parental Insurance Plan (QPIP).
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          <p className="font-bold">Error calculating benefits</p>
          <p>{error.message}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
        {/* Inputs Column */}
        <div className="lg:col-span-2 bg-[#FDFBF8] p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-[#AF6B51] mb-3">1. Your Information</h3>
              <label htmlFor="qpip-salary" className="block text-sm font-medium text-gray-700">
                Gross Annual Salary
              </label>
              <input
                type="number"
                id="qpip-salary"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#AF6B51] focus:border-[#AF6B51] sm:text-sm"
              />
              <input
                type="range"
                id="qpip-salary-slider"
                min="2000"
                max="120000"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                aria-label="Salary slider"
              />
              <p className="text-xs text-gray-500 mt-1">Max insurable earnings for 2024 are $94,000.</p>
            </div>

            <div>
              <label htmlFor="qpip-employment-type" className="block text-sm font-medium text-gray-700">
                Employment Type
              </label>
              <select
                id="qpip-employment-type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as 'employee' | 'self-employed')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#AF6B51] focus:border-[#AF6B51] sm:text-sm rounded-md"
              >
                <option value="employee">Salaried Employee</option>
                <option value="self-employed">Self-Employed</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg text-[#AF6B51] mb-3">2. Choose Your Plan</h3>
            <fieldset className="space-y-4">
              <div className="flex items-start">
                <input
                  id="qpip-plan-basic"
                  name="qpip-plan"
                  type="radio"
                  value="basic"
                  checked={plan === 'basic'}
                  onChange={(e) => setPlan(e.target.value as 'basic' | 'special')}
                  className="focus:ring-[#AF6B51] h-4 w-4 text-[#AF6B51] border-gray-300"
                />
                <label htmlFor="qpip-plan-basic" className="ml-3 block text-sm font-medium text-gray-700">
                  <span className="font-bold">Basic Plan</span>
                  <p className="text-xs text-gray-500">Longer leave duration, lower benefit rate.</p>
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="qpip-plan-special"
                  name="qpip-plan"
                  type="radio"
                  value="special"
                  checked={plan === 'special'}
                  onChange={(e) => setPlan(e.target.value as 'basic' | 'special')}
                  className="focus:ring-[#AF6B51] h-4 w-4 text-[#AF6B51] border-gray-300"
                />
                <label htmlFor="qpip-plan-special" className="ml-3 block text-sm font-medium text-gray-700">
                  <span className="font-bold">Special Plan</span>
                  <p className="text-xs text-gray-500">Shorter leave duration, higher benefit rate.</p>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg text-[#AF6B51] mb-3">3. After-Tax Estimate</h3>
            <label htmlFor="qpip-tax-rate" className="block text-sm font-medium text-gray-700">
              Estimated Marginal Tax Rate (%)
            </label>
            <input
              type="number"
              id="qpip-tax-rate"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#AF6B51] focus:border-[#AF6B51] sm:text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Enter your combined federal/provincial rate for a net estimate.</p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {!isEligible ? (
            <div className="p-6 bg-red-50 border-l-4 border-red-400 text-red-700">
              <p className="font-bold">Eligibility Alert</p>
              <p>You must have at least $2,000 in insurable earnings to be eligible for QPIP benefits.</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Your Estimate for the {plan === 'basic' ? 'Basic' : 'Special'} Plan</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Leave</p>
                    <p className="text-2xl font-bold text-[#AF6B51]">{results.totalWeeks} weeks</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Gross Benefit</p>
                    <p className="text-2xl font-bold text-[#AF6B51]">{formatCurrency(results.totalGross)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-md text-gray-800 mb-3">Benefit Breakdown (Gross)</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="font-semibold">Maternity Benefits (Birthing Parent)</p>
                    <p className="text-sm">{QPIPCalc.getPlanDetails(plan).maternity.weeks} weeks at {QPIPCalc.getPlanDetails(plan).maternity.rate * 100}%</p>
                    <p className="text-sm font-semibold">{formatCurrency(results.maternity.weekly)}/week | Total: {formatCurrency(results.maternity.total)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="font-semibold">Paternity Benefits (Other Parent)</p>
                    <p className="text-sm">{QPIPCalc.getPlanDetails(plan).paternity.weeks} weeks at {QPIPCalc.getPlanDetails(plan).paternity.rate * 100}%</p>
                    <p className="text-sm font-semibold">{formatCurrency(results.paternity.weekly)}/week | Total: {formatCurrency(results.paternity.total)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="font-semibold">Parental Benefits (Shareable)</p>
                    {results.parental.tiers.map((tier, index) => (
                      <p key={index} className="text-sm">{tier.weeks} weeks at {tier.rate * 100}% ({formatCurrency(tier.weekly)}/week)</p>
                    ))}
                    <p className="text-sm font-semibold">Total: {formatCurrency(results.parental.total)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-md text-gray-800 mb-2">After-Tax Estimate</h4>
                <p className="text-sm text-gray-600">Based on a <strong>{taxRate}%</strong> tax rate, your estimated net benefit is:</p>
                <p className="text-xl font-bold text-[#AF6B51] mt-2">{formatCurrency(results.totalNet)}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-md text-gray-800 mb-2">Your Document Checklist</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {requiredDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        <p>
          <strong>Disclaimer:</strong> This calculator provides an estimate for informational purposes only.
          It is not a substitute for official calculations from Revenu Québec. Always consult the official{' '}
          <a href="https://www.rqap.gouv.qc.ca/en" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#AF6B51]">
            QPIP website
          </a> for precise information.
        </p>
      </div>
    </div>
  );
});
