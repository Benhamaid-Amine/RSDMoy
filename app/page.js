"use client";

import { useState, useEffect } from "react";

const initialModules = [
  { name: "Réseaux et Protocoles", tp: "", exam: "", coef: "3" },
  { name: "Algo. Av", td: "", exam: "", coef: "3" },
  { name: "Sys MultiAg Biomorphique", tp: "", exam: "", coef: "3" },
  { name: "Méthodologies de Dével", td: "", exam: "", coef: "2" },
  { name: "Base de Données Av", td: "", exam: "", coef: "2" },
  { name: "Option 1", td: "", exam: "", coef: "2" },
  { name: "Techn. Des Applications", td: "", exam: "", coef: "2" },
  { name: "Anglais", exam: "", coef: "1" },
];

export default function Home() {
  const [modules, setModules] = useState(initialModules);
  const [average, setAverage] = useState(0);

  const handleChange = (index, field, value) => {
    const sanitizedValue = Math.min(Math.max(value, 0), 20) || "";
    const newModules = [...modules];
    newModules[index][field] = sanitizedValue;
    setModules(newModules);
  };

  const calculateModuleAverage = ({ td, tp, exam }) => {
    const tdNum = parseFloat(td) || 0;
    const tpNum = parseFloat(tp) || 0;
    const examNum = parseFloat(exam) || 0;

    // if (td !== undefined && tp === undefined) return tdNum * 0.4 + examNum * 0.6; // TD + Examen
    // if (tp !== undefined && td === undefined) return tpNum * 0.4 + examNum * 0.6; // TP + Examen
    if (td !== undefined && tp === undefined) return tdNum * 0.5 + examNum * 0.5; // TD + Examen
    if (tp !== undefined && td === undefined) return tpNum * 0.5 + examNum * 0.5; // TP + Examen
    return examNum; // Seulement Examen
  };

  useEffect(() => {
    let totalWeightedSum = 0;
    let totalCoef = 0;

    modules.forEach((mod) => {
      const moduleAvg = calculateModuleAverage(mod);
      const coefNum = parseFloat(mod.coef) || 0;

      totalWeightedSum += moduleAvg * coefNum;
      totalCoef += coefNum;
    });

    setAverage(totalCoef ? (totalWeightedSum / totalCoef).toFixed(2) : 0);
  }, [modules]);

  const resetNotes = () => {
    setModules(
      initialModules.map((mod) => ({
        ...mod,
        td: mod.td !== undefined ? "" : undefined,
        tp: mod.tp !== undefined ? "" : undefined,
        exam: mod.exam !== undefined ? "" : undefined,
      }))
    );
  };

  return (
    <>
    
      <p className="text-center mt-2 text-3xl">
        M1 RSD Moyenne
      </p>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">S1 (50% 50%) </h1>

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className=" text-white">
                <th className="border border-gray-400 p-2">Module</th>
                <th className="border border-gray-400 p-2">Note TD</th>
                <th className="border border-gray-400 p-2">Note TP</th>
                <th className="border border-gray-400 p-2">Note Examen</th>
                <th className="border border-gray-400 p-2">Coefficient</th>
                <th className="border border-gray-400 p-2">Moyenne Module</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{module.name}</td>

                  {/* Affichage conditionnel TD */}
                  <td className="border border-gray-400 p-2">
                    {module.td !== undefined ? (
                      <input
                        placeholder="TD"
                        type="number"
                        value={module.td}
                        onChange={(e) => handleChange(index, "td", e.target.value)}
                        onWheel={(e) => e.target.blur()}
                        className="w-full sm:w-24 bg-[#0A0A0A] text-white p-1 rounded appearance-none"
                        min="0"
                        max="20"
                        step="0.1"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Affichage conditionnel TP */}
                  <td className="border border-gray-400 p-2">
                    {module.tp !== undefined ? (
                      <input
                        placeholder="TP"
                        type="number"
                        value={module.tp}
                        onChange={(e) => handleChange(index, "tp", e.target.value)}
                        onWheel={(e) => e.target.blur()}
                        className="w-full sm:w-24 bg-[#0A0A0A] text-white p-1 rounded appearance-none"
                        min="0"
                        max="20"
                        step="0.1"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Examen */}
                  <td className="border border-gray-400 p-2">
                    <input
                      placeholder="EXAM"
                      type="number"
                      value={module.exam}
                      onChange={(e) => handleChange(index, "exam", e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      className="w-full sm:w-24 bg-[#0A0A0A] text-white p-1 rounded appearance-none"
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </td>

                  <td className="border border-gray-400 p-2">{module.coef}</td>
                  <td className="border border-gray-400 p-2">{calculateModuleAverage(module).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Average Display */}
        <p className="text-xl mt-4">Moyenne du semestre : {average}</p>

        {/* Reset Button */}
        <button
          onClick={resetNotes}
          className="mt-4 p-3 bg-red-500 text-white rounded-lg w-48 text-center"
        >
          Réinitialiser
        </button>
        
      </div>
      <p className="text-center mt-4 border-t-2 border-gray-400 p-2">
        Developed by AmineBnh
      </p>
    </>
  );
}
