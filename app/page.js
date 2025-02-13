"use client";

import { useState, useEffect } from "react";

const S1 = [
  { name: "Réseaux et Protocoles", tp: "", exam: "", coef: "3" },
  { name: "Algo. Av", td: "", exam: "", coef: "3" },
  { name: "Sys MultiAg Biomorphique", tp: "", exam: "", coef: "3" },
  { name: "Méthodologies de Dével", td: "", exam: "", coef: "2" },
  { name: "Base de Données Av", td: "", exam: "", coef: "2" },
  { name: "Option 1", td: "", exam: "", coef: "2" },
  { name: "Techn. Des Applications", td: "", exam: "", coef: "2" },
  { name: "Anglais", exam: "", coef: "1" },
];
const S2 = [
  { name: "Sécurité des systèmes informatiques", tp: "", exam: "", coef: "3" },
  { name: "Génie des systèmes interactifs", td: "", exam: "", coef: "3" },
  { name: "Systèmes distribués", td: "", tp: "", exam: "", coef: "3" },
  { name: "Techniques d’optimisation et méthodes heuristique", tp: "", exam: "", coef: "2" },
  { name: "Paradigmes des langages de programmation", tp: "", exam: "", coef: "2" },
  { name: "Techniques de transmission avancées", td: "", exam: "", coef: "2" },
  { name: "Option 2", td: "", exam: "", coef: "2" },
  { name: "Anglais", exam: "", coef: "1" },
];

export default function Home() {
  const [modulesS1, setModulesS1] = useState(S1);
  const [modulesS2, setModulesS2] = useState(S2);
  const [averageS1, setAverageS1] = useState(0);
  const [averageS2, setAverageS2] = useState(0);
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const handleChange = (setModules) => (index, field, value) => {
    const sanitizedValue = Math.min(Math.max(value, 0), 20) || "";
    setModules((prevModules) => {
      const newModules = [...prevModules];
      newModules[index][field] = sanitizedValue;
      return newModules;
    });
  };

  const calculateModuleAverage = ({ td, tp, exam }) => {
    const tdNum = parseFloat(td) || 0;
    const tpNum = parseFloat(tp) || 0;
    const examNum = parseFloat(exam) || 0;
    if (td !== undefined && tp === undefined) return tdNum * 0.5 + examNum * 0.5;
    if (tp !== undefined && td === undefined) return tpNum * 0.5 + examNum * 0.5;
    if (td !== undefined && tp !== undefined) return ((tdNum + tpNum) / 2) * 0.5 + examNum * 0.5;
    return examNum;
  };

  useEffect(() => {
    const calculateAverage = (modules, setAverage) => {
      let totalWeightedSum = 0;
      let totalCoef = 0;
      let allFilled = true;
      modules.forEach((mod) => {
        const moduleAvg = calculateModuleAverage(mod);
        const coefNum = parseFloat(mod.coef) || 0;
        totalWeightedSum += moduleAvg * coefNum;
        totalCoef += coefNum;
        if ((mod.td !== undefined && mod.td === "") ||
            (mod.tp !== undefined && mod.tp === "") ||
            (mod.exam !== undefined && mod.exam === "")) {
          allFilled = false;
        }
      });
      setAverage(totalCoef ? (totalWeightedSum / totalCoef).toFixed(2) : 0);
      setAllInputsFilled(allFilled);
    };
    calculateAverage(modulesS1, setAverageS1);
    calculateAverage(modulesS2, setAverageS2);
  }, [modulesS1, modulesS2]);

  const resetNotes = (setModules, semesterData) => {
    setModules(semesterData.map((mod) => ({
      ...mod,
      td: mod.td !== undefined ? "" : undefined,
      tp: mod.tp !== undefined ? "" : undefined,
      exam: mod.exam !== undefined ? "" : undefined,
    })));
  };

  const totalAverage = ((parseFloat(averageS1) + parseFloat(averageS2)) / 2).toFixed(2);

  return (
    <>
      
      <p className="text-center mt-4 text-2xl font-bold border rounded-lg border-gray-400 p-2">M1 RSD Moyenne</p>
      <div className="min-h-screen flex flex-col items-center p-4">
        {[{ title: "Semestre 1", modules: modulesS1, setModules: setModulesS1, average: averageS1, data: S1 },
          { title: "Semestre 2", modules: modulesS2, setModules: setModulesS2, average: averageS2, data: S2 }].map(({ title, modules, setModules, average, data }) => (
          <div key={title} className="mb-8 w-full">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-xl ">{title} (50% 50%)</h1>
              <button onClick={() => resetNotes(setModules, data)} className="ml-2 text-2xl">🔄</button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full border border-gray-400">
                <thead>
                  <tr className="text-white  ">
                    <th>Module</th><th>Note TD</th><th>Note TP</th><th>Note Examen</th><th>Coefficient</th><th>Moyenne Module</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module, index) => (
                    <tr key={index}>
                      <td className="border p-1">{module.name}</td>
                      {["td", "tp", "exam"].map((field) => (
                        <td key={field} className="border p-1">
                          {module[field] !== undefined ? (
                            <input placeholder={field}  type="number" value={module[field]} onChange={(e) => handleChange(setModules)(index, field, e.target.value)}
                              className="uppercase w-full bg-[#0A0A0A] text-white p-1 rounded appearance-none" min="0" max="20" step="0.1" />
                          ) : "-"}
                        </td>
                      ))}
                      <td className="border p-2">{module.coef}</td>
                      <td className="border p-2">{calculateModuleAverage(module).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-900 bg-opacity-50">
                    <td className="border p-2">Moyenne {title}</td>
                    <td colSpan="4"></td>
                    <td className="border p-2  font-bold ">{average}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="bg-black border  border-gray-400 w-full p-4 rounded-lg ">
          <p className={allInputsFilled ? (averageS1 >= 10 ? "text-green-500" : "text-red-500") : ""}>Moyenne Semestre 1: {averageS1}</p>
          <p className={allInputsFilled ? (averageS2 >= 10 ? "text-green-500" : "text-red-500") : ""}>Moyenne Semestre 2: {averageS2}</p>
          <p className={allInputsFilled ? (totalAverage >= 10 ? "text-green-500" : "text-red-500") : ""}>Moyenne Générale: {totalAverage}</p>
        </div>
        
      </div>
      <p className="text-center mt-4 border rounded-lg border-gray-400 p-2">Developed by AmineBnh</p>
    </>
  );
}
