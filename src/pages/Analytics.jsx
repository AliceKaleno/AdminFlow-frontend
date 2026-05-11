import Sidebar from "../components/Sidebar";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const vendasMensais = [
  { mes: "Jan", vendas: 4000 },
  { mes: "Fev", vendas: 3000 },
  { mes: "Mar", vendas: 5000 },
  { mes: "Abr", vendas: 4780 },
  { mes: "Mai", vendas: 5890 },
  { mes: "Jun", vendas: 6390 },
];

const clientes = [
  { name: "Ativos", value: 400 },
  { name: "Inativos", value: 120 },
];

const COLORS = ["#6366f1", "#e5e7eb"];

export default function Analytics() {

  return (
<div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 dark:bg-[#0f172a] min-h-screen p-8 transition-all duration-300">

        {/* TOPO */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Analytics
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Métricas e desempenho da empresa
          </p>

        </div>

                <div
        id="analytics-report"
        className="space-y-6"
        ></div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">
              Receita Total
            </p>

            <h2 className="text-3xl font-bold mt-2 dark:text-white">
              R$ 32.400
            </h2>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">
              Crescimento
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-500">
              +18%
            </h2>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">
              Clientes
            </p>

            <h2 className="text-3xl font-bold mt-2 dark:text-white">
              520
            </h2>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">
              Meta mensal
            </p>

            <h2 className="text-3xl font-bold mt-2 text-indigo-500">
              82%
            </h2>
          </div>

        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ÁREA */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-lg">

            <h2 className="font-bold text-lg mb-4 dark:text-white">
              Receita Mensal
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={vendasMensais}>

                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke="#6366f1"
                  fill="#818cf8"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>

          {/* PIZZA */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-lg">

            <h2 className="font-bold text-lg mb-4 dark:text-white">
              Clientes
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={clientes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >

                  {clientes.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}
