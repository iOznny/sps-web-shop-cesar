'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Image from "next/image";

/* Utils */
import { authLoginValidator } from "@Utils/validators";

/* Components */
import { SnackbarAlert } from "@Components/index";

/* Services */
import { AuthService } from "@Services/index";

/* Interfaces */
import { IAuthLoginUser, IAuthMessageResponse } from "@Interfaces/IAuth";

export default function Login() {
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messageOnSubmit, setMessageOnSubmit] = useState<IAuthMessageResponse>({ message: '', severity: "success" });

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(authLoginValidator),
  });

  const onSubmit = (request: IAuthLoginUser) => {
    AuthService.login(request).then(() => {
      setMessageOnSubmit({
        message: 'Bienvenido a Eagle Wear',
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

          <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={ handleSubmit((data) => onSubmit({ ...data })) } className="space-y-6">
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
              <label htmlFor="password" className="block text-sm font-medium text-black">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={'m38rmF$'}
                {...register("password")}
                className="block w-full rounded-md px-3 py-1.5 border outline-none text-black"
              />

              { errors.password && <p className="text-red-500 text-sm">{ errors.password.message }</p> }
            </div>

            <button onClick={() => setShowSnackbar(true) } type="submit" className="w-full bg-red-500 text-white py-2 rounded-md" disabled={ isSubmitting }>
              { isSubmitting ? "Cargando..." : "Iniciar Sesión" }
            </button>
          </form>
        </div>
      </div>

      <SnackbarAlert
        open={ showSnackbar }
        message={ messageOnSubmit.message }
        severity={ messageOnSubmit.severity }
        duration={ 4000 }
        onClose={() => setShowSnackbar(false) }
      />
    </>
  );
}
