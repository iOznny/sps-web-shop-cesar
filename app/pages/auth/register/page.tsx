'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Image from "next/image";

/* Utils */
import { authRegisterValidator } from "@Utils/validators";
import { RouteNavigatorNavbar } from "@/app/utils/router";

/* Interfaces */
import { IAuthMessageResponse, IAuthRegisterUser } from "@Interfaces/IAuth";

/* Services */
import { AuthService } from "@Services/index";

/* Components */
import { SnackbarAlert } from "@Components/index";

export default function Register() {
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messageOnSubmit, setMessageOnSubmit] = useState<IAuthMessageResponse>({ message: '', severity: "success" });

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(authRegisterValidator),
  });

  const onSubmit = (request: IAuthRegisterUser) => {
    AuthService.register(request).then(() => {
      setMessageOnSubmit({
        message: 'Registro exitoso, bienvenido.',
        severity: 'success'
      });

      router.push('/');
    }, (error: string) => {
      setMessageOnSubmit({
        message: error,
        severity: 'error'
      });
    });
  };

  return (
    <>
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
          <form onSubmit={ handleSubmit((data) => onSubmit({ id: 1, ...data })) } className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">Nombre de Usuario</label>
              <input
                id="username"
                type="text"
                placeholder="Usuario"
                value={'johnd'}
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
                value={'john@gmail.com'}
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
                value={'Hola2025@@'}
                {...register("password")}
                className="block w-full rounded-md px-3 py-1.5 border outline-none text-black"
              />

              { errors.password && <p className="text-red-500 text-sm">{ errors.password.message }</p> }
            </div>

            <button onClick={() => setShowSnackbar(true) } type="submit" className="w-full bg-red-500 text-white py-2 rounded-md" disabled={ isSubmitting }>
              { isSubmitting ? "Cargando..." : "Registrarse" }
            </button>
          </form>

          <p className="mt-10 text-center text-neutral-400">
            ¿Ya tienes cuenta? Inicia sesión {' '}
            <span className="text-red-400 cursor-pointer" onClick={() => router.push(RouteNavigatorNavbar.login) }>aquí</span>.
          </p>
        </div>
      </div>

      <SnackbarAlert
        open={ showSnackbar }
        message={ messageOnSubmit.message }
        severity={ messageOnSubmit.severity }
        duration={ 6000 }
        onClose={() => setShowSnackbar(false) }
      />
    </>
  );
}