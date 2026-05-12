import { useState } from "react";
import { api } from "../services/api";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      const res = await api.post("/register", {
        nome,
        email,
        senha,
      });

      if (res.data.success) {
        navigate("/"); // volta pro login
      }
    } catch (err) {
      console.log(err.response);
      console.error(err);
      setErro("Erro ao criar conta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[360px]"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 text-white p-4 rounded-2xl">⚡</div>
          <h1 className="mt-3 text-xl font-bold">CRIAR CONTA</h1>
        </div>

        {/* NOME */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Nome"
            className="w-full pl-10 p-3 border rounded-xl"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 p-3 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* SENHA */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type={showSenha ? "text" : "password"}
            placeholder="Senha"
            className="w-full pl-10 pr-10 p-3 border rounded-xl"
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowSenha(!showSenha)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {erro && (
          <p className="text-red-500 text-sm mb-3 text-center">{erro}</p>
        )}

        <button
          onClick={handleCadastro}
          className="w-full bg-indigo-600 text-white p-3 rounded-xl"
        >
          Criar Conta
        </button>

        <p className="text-sm text-center mt-4">
          Já tem conta?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Entrar
          </span>
        </p>
      </motion.div>
    </div>
  );
}
