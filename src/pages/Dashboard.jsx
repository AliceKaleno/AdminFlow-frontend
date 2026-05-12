import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Charts from "../components/Charts";
import Notifications from "../components/Notifications";
import AIAssistant from "../components/AIAssistant";
import ActivityFeed from "../components/ActivityFeed";
import QuickActions from "../components/QuickActions";


import { UserCircle2 } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {

  const [perfilAberto, setPerfilAberto] =
    useState(false);

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "{}"
  );

  function gerarInsights(dados) {

    if (dados.vendas < 5000)
      return "⚠️ Vendas baixas";

    if (dados.crescimento > 10)
      return "🚀 Crescimento alto";

    return "📊 Estável";
  }

  return (

    <div className="flex">

      <Sidebar />

      <div className="
        flex-1
        bg-gray-100
        dark:bg-[#0f172a]
        min-h-screen
        p-8
        transition-all
        duration-300
      ">

        {/* TOPO */}
        <div className="
          flex justify-between
          items-center
          mb-6
        ">

          <h1 className="
            text-3xl font-bold
            text-gray-800
            dark:text-white
          ">
            Dashboard
          </h1>

          <div className="
            flex items-center gap-4
          ">

            <Notifications />

            {/* PERFIL */}
            <div className="relative">

              <button
                onClick={() =>
                  setPerfilAberto(!perfilAberto)
                }

                className="
                  bg-white
                  dark:bg-[#1e293b]
                  p-2
                  rounded-full
                  shadow
                  hover:scale-105
                  transition
                "
              >

                <UserCircle2
                  size={36}
                  className="text-indigo-600"
                />

              </button>

              {perfilAberto && (

                <div className="
                  absolute right-0 mt-3
                  w-72
                  bg-white
                  dark:bg-[#111827]
                  rounded-2xl
                  shadow-2xl
                  p-5
                  z-50
                ">

                  <div className="
                    flex items-center
                    gap-3
                    mb-4
                  ">

                    <div className="
                      w-14 h-14
                      rounded-full
                      bg-indigo-600
                      text-white
                      flex items-center
                      justify-center
                      text-xl
                      font-bold
                    ">

                      {usuario?.nome?.charAt(0) || "A"}

                    </div>

                    <div>

                      <p className="
                        font-bold
                        text-lg
                        dark:text-white
                      ">
                        {usuario?.nome || "Usuário"}
                      </p>

                      <p className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      ">
                        {usuario?.email || "Sem email"}
                      </p>

                    </div>

                  </div>

                  <div className="
                    border-t
                    border-gray-200
                    dark:border-white/10
                    pt-3
                  ">

                    <p className="
                      text-sm
                      mb-2
                      text-gray-700
                      dark:text-white
                    ">
                      💼 Cargo:
                      {" "}

                      <span className="font-semibold">
                        {usuario?.role || "vendedor"}
                      </span>

                    </p>

                    <button
                      onClick={() => {

                        localStorage.removeItem(
                          "token"
                        );

                        localStorage.removeItem(
                          "usuario"
                        );

                        window.location.href = "/";

                      }}

                      className="
                        w-full
                        bg-red-500
                        hover:bg-red-600
                        transition
                        text-white
                        py-2
                        rounded-xl
                        mt-3
                      "
                    >
                      Sair
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* IA */}
        <div className="
          bg-white
          dark:bg-[#111827]
          rounded-2xl
          shadow
          p-5
          mb-6
        ">

          <h2 className="
            text-xl
            font-bold
            mb-2
            text-gray-800
            dark:text-white
          ">
            Insights Inteligentes
          </h2>

          <p className="
            text-gray-700
            dark:text-gray-300
          ">
            {gerarInsights({
              vendas: 3000,
              crescimento: 12
            })}
          </p>

        </div>

        <Cards />

        <Charts />

        <ActivityFeed />

        <AIAssistant />

        <QuickActions />

      </div>

    </div>

  );
}
