import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";

import { useEffect, useState } from "react";
import { api } from "../services/api";

import { io } from "socket.io-client";

const socket = io(
  "https://adminflow-backend-3etp.onrender.com"
);

export default function Charts() {

  const [data, setData] = useState([]);

  useEffect(() => {

  async function carregarDashboard() {

    try {

      const res = await api.get("/dashboard");

      setData(res.data.grafico);

    } catch (err) {

      console.error(err);

    }

  }

  carregarDashboard();

  const socket = io(window.location.origin);

  socket.on("dashboardUpdate", () => {

    carregarDashboard();

  });

  return () => socket.disconnect();

}, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

      {/* 📈 GRÁFICO PRINCIPAL */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold">
              Performance de Vendas
            </h2>

            <p className="text-sm text-gray-500">
              Evolução mensal da empresa
            </p>
          </div>

          <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold">
            +12%
          </div>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="mes" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="vendas"
              stroke="#6366f1"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* 💎 GRÁFICO SECUNDÁRIO */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold">
              Receita Acumulada
            </h2>

            <p className="text-sm text-gray-500">
              Crescimento financeiro
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
            Excelente
          </div>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <AreaChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="mes" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="vendas"
              stroke="#10b981"
              fill="#10b98133"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
