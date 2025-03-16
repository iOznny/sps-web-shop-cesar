'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Image from "next/image";

/* Utils */
import { authSchemaValidator } from "@Utils/validators";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authSchemaValidator),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    router.push("/");
    /* try {
      const response = await fetch("https://api.example.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Error en el registro");
      
      router.push("/");
    } catch (error) {
      alert(error.message);
    } */
  };

  return (
    <div className="w-full h-screen bg-white flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex-1 overflow-y-auto sm:px-8">
        <Image 
          src="/assets/eagle-wear.png" 
          alt="Eagle Wear" 
          width={300} 
          height={300} 
          className="mx-auto" 
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">Regístrate</h2>
      </div>
      
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">Nombre de Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              {...register("username")}
              className="block w-full rounded-md px-3 py-1.5 border outline-none text-black"
            />
            { errors.username && <p className="text-red-500 text-sm">{ errors.username.message }</p> }
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="a@b.c"
              autoComplete="email"
              {...register("email")}
              className="block w-full rounded-md px-3 py-1.5 border outline-none text-black"
            />
            { errors.email && <p className="text-red-500 text-sm">{ errors.email.message }</p> }
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              {...register("password")}
              className="block w-full rounded-md px-3 py-1.5 border outline-none text-black"
            />
            { errors.password && <p className="text-red-500 text-sm">{ errors.password.message }</p> }
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md"
            disabled={ isSubmitting }
          >
            {isSubmitting ? "Cargando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}