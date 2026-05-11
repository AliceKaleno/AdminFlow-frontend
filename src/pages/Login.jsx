import { useState } from "react";
import { api } from "../services/api";
import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async () => {

    setErro("");

    if (!email || !senha) {

      setErro("Preencha todos os campos");

      return;
    }

    try {

      const res = await api.post(
        "/login",
        {
          email,
          senha
        }
      );

      console.log("LOGIN:", res.data);

      if (res.data.success) {

        // ✅ SALVA TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // ✅ SALVA USUÁRIO
        localStorage.setItem(
          "usuario",
          JSON.stringify(
            res.data.usuario
          )
        );

        // ✅ CHAMA APP
        if (onLogin) {

          onLogin(
            res.data.token,
            res.data.usuario
          );

        }

        // 🚀 REDIRECIONA
        navigate("/dashboard");
      }

    } catch (err) {

      console.log(err);

      setErro(
        err.response?.data?.message ||
        "Email ou senha inválidos"
      );

    }

  };

  return (

    <div className="
      min-h-screen
      flex items-center justify-center
      bg-gradient-to-br
      from-indigo-500
      via-purple-500
      to-pink-500
    ">

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6
        }}

        className="
          bg-white/80
          backdrop-blur-xl
          p-8 rounded-3xl
          shadow-2xl
          w-[360px]
        "
      >

        {/* LOGO */}
        <div className="
          flex flex-col items-center
          mb-6
        ">

          <div className="
            bg-indigo-600
            text-white
            p-4 rounded-2xl
          ">
            ⚡
          </div>

          <h1 className="
            mt-3 text-xl font-bold
          ">
            ADMIN FLOW
          </h1>

          <p className="
            text-gray-500
            text-sm text-center mt-2
          ">
            Bem-vindo(a) de volta! 👋
            <br />
            Acesse sua conta aqui
          </p>

        </div>

        {/* EMAIL */}
        <div className="relative mb-4">

          <Mail
            className="
              absolute left-3 top-3
              text-gray-400
            "
            size={18}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="
              w-full pl-10 p-3
              border rounded-xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />

        </div>

        {/* SENHA */}
        <div className="relative mb-4">

          <Lock
            className="
              absolute left-3 top-3
              text-gray-400
            "
            size={18}
          />

          <input
            type={
              showSenha
                ? "text"
                : "password"
            }

            placeholder="Senha"

            value={senha}

            onChange={(e) =>
              setSenha(e.target.value)
            }

            className="
              w-full pl-10 pr-10 p-3
              border rounded-xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />

          <button
            type="button"

            onClick={() =>
              setShowSenha(!showSenha)
            }

            className="
              absolute right-3 top-3
              text-gray-400
            "
          >

            {showSenha
              ? <EyeOff size={18} />
              : <Eye size={18} />
            }

          </button>

        </div>

        {/* ERRO */}
        {erro && (

          <p className="
            text-red-500
            text-sm mb-3 text-center
          ">
            {erro}
          </p>

        )}

        {/* BOTÃO */}
        <button

          type="button"

          onClick={handleLogin}

          className="
            w-full
            bg-indigo-600
            hover:bg-indigo-700
            transition
            text-white
            p-3 rounded-xl
            font-semibold
          "
        >
          Entrar
        </button>

        {/* CADASTRO */}
        <p className="
          text-sm text-center mt-5
        ">

          Não tem conta?{" "}

          <span

            className="
              text-indigo-600
              font-semibold
              cursor-pointer
              hover:underline
            "

            onClick={() =>
              navigate("/cadastro")
            }
          >
            Criar conta
          </span>

        </p>

      </motion.div>

    </div>

  );

}
