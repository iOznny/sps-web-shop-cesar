'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Image from "next/image";

/* Utils */
import { authSchemaValidator } from "@Utils/validators";

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
    resolver: zodResolver(authSchemaValidator),
  });

  const onSubmit = (request: any) => {
    console.log(request)
    
  };

  return (
    <>
      <div className="w-full h-screen bg-white flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image 
            src="/assets/eagle-wear.png" 
            alt="Eagle Wear" 
            width={300} 
            height={300} 
            className="mx-auto" 
          />
          
          <h2 className="mt-10 text-center text-2xl font-bold text-black">Inicia sesión en tu cuenta</h2>
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={ handleSubmit((data) => onSubmit('awdawdaw')) } className="space-y-6">
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
                value={'Password1@'}
                {...register("password")}
                className="block w-full rounded-md px-3 py-1.5 border outline-none text-black"
              />

              { errors.password && <p className="text-red-500 text-sm">{ errors.password.message }</p> }
            </div>

            <button onClick={() => setShowSnackbar(true) } type="submit" className="w-full bg-red-500 text-white py-2 rounded-md" >
              { isSubmitting ? "Cargando..." : "Iniciar Sesión" }
            </button>
          </form>
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
