import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";

import {
  Mail,
  Shield,
  Lock,
  Camera,
  Activity,
  BadgeCheck,
} from "lucide-react";

export default function Profile() {

  const usuarioStorage = JSON.parse(localStorage.getItem("usuario") || "{}")

  const [usuario, setUsuario] =
    useState(usuarioStorage);

  const [senhaAtual, setSenhaAtual] =
    useState("");

  const [novaSenha, setNovaSenha] =
    useState("");

  const [confirmarSenha, setConfirmarSenha] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");

  const [nome, setNome] =
    useState(usuario?.nome || "");

  const [email, setEmail] =
    useState(usuario?.email || "");

  const atividades = [
    "Criou um usuário",
    "Atualizou vendas",
    "Entrou no sistema",
    "Alterou configurações",
  ];

  async function alterarSenha() {

    setMensagem("");

    if (
      !senhaAtual ||
      !novaSenha ||
      !confirmarSenha
    ) {

      setMensagem(
        "⚠️ Preencha todos os campos"
      );

      return;
    }

    if (novaSenha !== confirmarSenha) {

      setMensagem(
        "❌ As senhas não coincidem"
      );

      return;
    }

    if (novaSenha.length < 4) {

      setMensagem(
        "⚠️ A nova senha precisa ter pelo menos 4 caracteres"
      );

      return;
    }

    try {

      await api.put(
        "/alterar-senha",
        {
          email: usuario.email,
          senhaAtual,
          novaSenha
        }
      );

      setMensagem(
        "✅ Senha alterada com sucesso"
      );

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");

    } catch (err) {

      console.log(err);

      setMensagem(
        err.response?.data?.message ||
        "Erro ao alterar senha"
      );

    }
  }


  function salvarPerfil() {

    const usuarioAtualizado = {
      ...usuario,
      nome,
      email,
    };

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioAtualizado)
    );

    setUsuario(usuarioAtualizado);

    setMensagem(
      "✅ Perfil atualizado com sucesso"
    );
  }

  return (

    <div className="flex bg-gray-100 dark:bg-[#0f172a] min-h-screen transition-all">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* TOPO */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Meu Perfil
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Gerencie suas informações e segurança
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PERFIL */}
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl p-8">

            <div className="flex flex-col items-center">

              {/* AVATAR */}
              <div className="relative">

                <div className="
                  w-32 h-32 rounded-full
                  overflow-hidden
                  shadow-2xl
                  bg-gradient-to-r from-indigo-500 to-purple-600
                ">

                  {usuario?.avatar ? (

                    <img
                      src={usuario.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="
                      w-full h-full
                      flex items-center justify-center
                      text-white text-5xl font-bold
                    ">
                      {usuario?.nome?.charAt(0) || "A"}
                    </div>

                  )}

                </div>

                {/* FOTO */}
                <label
                  className="
                    absolute bottom-0 right-0
                    bg-indigo-600 text-white
                    p-3 rounded-full
                    shadow-lg hover:scale-110 transition
                    cursor-pointer
                  "
                >

                  <Camera size={18} />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"

                    onChange={(e) => {

                      const file =
                        e.target.files[0];

                      if (!file) return;

                      const reader =
                        new FileReader();

                      reader.onloadend = () => {

                        const usuarioAtualizado = {
                          ...usuario,
                          avatar: reader.result
                        };

                        localStorage.setItem(
                          "usuario",
                          JSON.stringify(
                            usuarioAtualizado
                          )
                        );

                        setUsuario(
                          usuarioAtualizado
                        );

                      };

                      reader.readAsDataURL(file);

                    }}
                  />

                </label>

              </div>

              <h2 className="mt-5 text-2xl font-bold dark:text-white">
                {usuario?.nome || "Usuário"}
              </h2>

              <p className="text-gray-500">
                {usuario?.email || "Sem email"}
              </p>

              {/* CARGO */}
              <div className="
                mt-4 px-4 py-2 rounded-full
                bg-indigo-100 text-indigo-700
                dark:bg-indigo-500/20 dark:text-indigo-300
                flex items-center gap-2
              ">

                <BadgeCheck size={16} />

                {usuario?.role || "vendedor"}

              </div>

            </div>

            {/* INFO */}
            <div className="mt-8 space-y-4">

              <div className="
                flex items-center gap-3
                bg-gray-100 dark:bg-[#1e293b]
                p-4 rounded-2xl
              ">

                <Mail className="text-indigo-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold dark:text-white">
                    {usuario?.email || "Sem email"}
                  </p>

                </div>

              </div>

              <div className="
                flex items-center gap-3
                bg-gray-100 dark:bg-[#1e293b]
                p-4 rounded-2xl
              ">

                <Shield className="text-green-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Permissão
                  </p>

                  <p className="font-semibold dark:text-white">
                    {usuario?.role || "vendedor"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* CONFIGURAÇÕES */}
          <div className="lg:col-span-2 space-y-6">

            {/* EDITAR PERFIL */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl p-8">

              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Editar Perfil
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  className="
                    p-4 rounded-2xl border
                    dark:bg-[#1e293b]
                    dark:border-white/10
                    dark:text-white
                  "
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="
                    p-4 rounded-2xl border
                    dark:bg-[#1e293b]
                    dark:border-white/10
                    dark:text-white
                  "
                />

              </div>

              <button
                onClick={salvarPerfil}
                className="
                  mt-6 bg-indigo-600
                  hover:bg-indigo-700
                  text-white px-6 py-3
                  rounded-2xl transition
                "
              >
                Salvar alterações
              </button>

            </div>

            {/* SEGURANÇA */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl p-8">

              <div className="flex items-center gap-3 mb-6">

                <Lock className="text-indigo-500" />

                <h2 className="text-2xl font-bold dark:text-white">
                  Segurança
                </h2>

              </div>

              <div className="space-y-4">

                <input
                  type="password"
                  placeholder="Senha atual"
                  value={senhaAtual}
                  onChange={(e) =>
                    setSenhaAtual(
                      e.target.value
                    )
                  }
                  className="
                    w-full p-4 rounded-2xl border
                    dark:bg-[#1e293b]
                    dark:border-white/10
                    dark:text-white
                  "
                />

                <input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) =>
                    setNovaSenha(
                      e.target.value
                    )
                  }
                  className="
                    w-full p-4 rounded-2xl border
                    dark:bg-[#1e293b]
                    dark:border-white/10
                    dark:text-white
                  "
                />

                <input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={confirmarSenha}
                  onChange={(e) =>
                    setConfirmarSenha(
                      e.target.value
                    )
                  }
                  className="
                    w-full p-4 rounded-2xl border
                    dark:bg-[#1e293b]
                    dark:border-white/10
                    dark:text-white
                  "
                />

              </div>

              <button
                onClick={alterarSenha}
                className="
                  mt-6 bg-red-500 hover:bg-red-600
                  text-white px-6 py-3 rounded-2xl transition
                "
              >
                Alterar senha
              </button>

              {mensagem && (

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                  {mensagem}
                </p>

              )}

            </div>

            {/* ATIVIDADE */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl p-8">

              <div className="flex items-center gap-3 mb-6">

                <Activity className="text-indigo-500" />

                <h2 className="text-2xl font-bold dark:text-white">
                  Atividade recente
                </h2>

              </div>

              <div className="space-y-4">

                {atividades.map((item, index) => (

                  <div
                    key={index}
                    className="
                      flex items-center justify-between
                      bg-gray-100 dark:bg-[#1e293b]
                      p-4 rounded-2xl
                    "
                  >

                    <p className="dark:text-white">
                      {item}
                    </p>

                    <span className="text-sm text-gray-500">
                      Agora
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
