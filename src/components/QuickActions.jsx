import { useState } from "react";

import {
  Plus,
  CalendarPlus,
  FileText,
  Download,
  X
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function QuickActions() {

  const [open, setOpen] =
    useState(false);

  const navigate = useNavigate();

  // 📅 NOVO EVENTO
  function novoEvento() {

    navigate("/calendar");

  }

  // 📊 GERAR RELATÓRIO PDF
  function gerarRelatorio() {

    const doc = new jsPDF();

    // TÍTULO
    doc.setFontSize(22);

    doc.text(
      "Relatório Analytics",
      20,
      20
    );

    // DATA
    doc.setFontSize(11);

    doc.text(
      `Gerado em: ${new Date().toLocaleString()}`,
      20,
      30
    );

    // KPIs
    doc.setFontSize(16);

    doc.text(
      "Indicadores",
      20,
      50
    );

    autoTable(doc, {
      startY: 60,

      head: [["Métrica", "Valor"]],

      body: [
        ["Usuários", "1245"],
        ["Vendas", "R$ 32.400"],
        ["Crescimento", "12%"],
        ["Conversão", "8.4%"],
      ],
    });

    // INSIGHTS
    doc.setFontSize(16);

    doc.text(
      "Insights IA",
      20,
      120
    );

    doc.setFontSize(12);

    doc.text(
      "• Crescimento acima da média.",
      20,
      132
    );

    doc.text(
      "• Pico de vendas nos últimos 30 dias.",
      20,
      142
    );

    doc.text(
      "• Usuários ativos aumentaram.",
      20,
      152
    );

    // RODAPÉ
    doc.setFontSize(10);

    doc.text(
      "Dashboard Corporativo © 2026",
      20,
      285
    );

    // DOWNLOAD
    doc.save(
      "relatorio-analytics.pdf"
    );

  }

  // 📥 EXPORTAR DADOS JSON
  function exportarDados() {

    const dados = {
      usuarios: 1245,
      vendas: 32400,
      crescimento: "12%",
      data: new Date()
    };

    const blob = new Blob(
      [
        JSON.stringify(
          dados,
          null,
          2
        )
      ],
      {
        type: "application/json"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "dados-dashboard.json";

    a.click();

    URL.revokeObjectURL(url);

  }

  return (

    <div className="fixed bottom-24 right-6 z-50">

      {/* BOTÕES */}
      {open && (

        <div className="flex flex-col gap-3 mb-3 items-end">

          {/* 📅 EVENTO */}
          <button
            onClick={novoEvento}

            title="Novo Evento"

            className="
              group
              bg-purple-500
              text-white
              p-4 rounded-full
              shadow-xl
              hover:scale-110
              transition
              relative
            "
          >

            <CalendarPlus size={22} />

            <span
              className="
                absolute right-16 top-1/2
                -translate-y-1/2
                bg-black text-white
                text-sm px-3 py-1
                rounded-lg
                opacity-0
                group-hover:opacity-100
                transition
                whitespace-nowrap
              "
            >
              Novo Evento
            </span>

          </button>

          {/* 📊 RELATÓRIO */}
          <button
            onClick={gerarRelatorio}

            title="Gerar Relatório"

            className="
              group
              bg-blue-500
              text-white
              p-4 rounded-full
              shadow-xl
              hover:scale-110
              transition
              relative
            "
          >

            <FileText size={22} />

            <span
              className="
                absolute right-16 top-1/2
                -translate-y-1/2
                bg-black text-white
                text-sm px-3 py-1
                rounded-lg
                opacity-0
                group-hover:opacity-100
                transition
                whitespace-nowrap
              "
            >
              Gerar PDF
            </span>

          </button>

          {/* 📥 EXPORTAR */}
          <button
            onClick={exportarDados}

            title="Exportar Dados"

            className="
              group
              bg-green-500
              text-white
              p-4 rounded-full
              shadow-xl
              hover:scale-110
              transition
              relative
            "
          >

            <Download size={22} />

            <span
              className="
                absolute right-16 top-1/2
                -translate-y-1/2
                bg-black text-white
                text-sm px-3 py-1
                rounded-lg
                opacity-0
                group-hover:opacity-100
                transition
                whitespace-nowrap
              "
            >
              Exportar Dados
            </span>

          </button>

        </div>

      )}

      {/* BOTÃO PRINCIPAL */}
      <button
        onClick={() =>
          setOpen(!open)
        }

        className="
          bg-indigo-600
          text-white
          p-4 rounded-full
          shadow-2xl
          hover:scale-110
          hover:rotate-90
          transition-all
          duration-300
        "
      >

        {open ? <X /> : <Plus />}

      </button>

    </div>
  );
}
