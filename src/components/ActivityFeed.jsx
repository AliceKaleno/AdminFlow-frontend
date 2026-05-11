import { useEffect, useState } from "react";
import { api } from "../services/api";
import { io } from "socket.io-client";

export default function ActivityFeed() {

  const [logs, setLogs] = useState([]);

  // ✅ FUNÇÃO PRIMEIRO
  async function carregar() {

    try {

      const res = await api.get("/logs");

      setLogs(res.data);

    } catch (err) {

      console.error(err);

    }

  }

  // ✅ DEPOIS O useEffect
useEffect(() => {

  async function iniciar() {

    await carregar();

  }

  iniciar();

  const socket = io(window.location.origin);

  socket.on("logsUpdate", () => {

    carregar();

  });

  return () => socket.disconnect();

}, []);

  return (

    <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl shadow-xl transition-all">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold dark:text-white">
            Activity Feed
          </h2>

          <p className="text-gray-500 text-sm">
            Atividades em tempo real do sistema
          </p>
        </div>

      </div>

      <div className="space-y-4 max-h-[400px] overflow-auto">

        {logs.map((log, index) => (

          <div
            key={index}
            className="
              border border-gray-200 dark:border-white/10
              p-4 rounded-2xl
              hover:scale-[1.01]
              transition-all
              bg-gray-50 dark:bg-[#1e293b]
            "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="font-semibold dark:text-white">
                  {log.acao}
                </p>

                <p className="text-sm text-gray-500">
                  {log.usuario}
                </p>

              </div>

              <span className="text-xs text-gray-400">
                {new Date(log.data).toLocaleString()}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}
