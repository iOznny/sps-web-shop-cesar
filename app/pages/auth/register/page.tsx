import Image from "next/image";

export default function Register() {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex-1 overflow-y-auto sm:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image 
            src="/assets/eagle-wear.png"
            alt="Eagle Wear"
            width={300}
            height={300}
            className="mx-auto h-auto w-auto"
          />

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Registro
          </h2>
        </div>

        
      </div>
    </div>
  );
}
