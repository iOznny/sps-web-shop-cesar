'use client'
import { Button } from '@headlessui/react';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

/* Utils */
import { RouteNavigatorNavbar } from '@Utils/router';

/* Hooks */
import { useCart } from '@Hooks/index';
import { SnackbarAlert } from '@/app/components';

export default function Shopping() {
  const { cart, removeFromCart, total, removeCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handlerPayment = () => {
    setShowSnackbar(true);
    removeCart();
  }

  return (
    <>
      <div className="flex w-full h-screen flex-col bg-white px-8 py-8">
        <div className="overflow-y-auto  py-8 sm:px-8">
          <div className="flex items-start justify-between">
            <h1 className="text-lg font-bold text-black">Carrito de Compras</h1>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                { cart.map((product) => (
                  <li key={ product.id } className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image 
                        alt={ product.description } 
                        src={ product.image } 
                        width={100}
                        height={100}
                        className="size-full object-contain" 
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{ product.title }</h3>
                          <p className="ml-4">${ (product.price * 1).toFixed(2) }</p>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">{ product.category }</p>
                        <p className="mt-1 text-sm text-gray-500">Puntuación: { product.rating.rate }</p>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="mt-1 text-sm text-gray-500"></p>
                        <div className="flex">
                          <button 
                            type="button" 
                            className="font-bold text-red-500 cursor-pointer"  
                            onClick={() => removeFromCart(product.id) }
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p className='font-bold'>${ total.toFixed(2) }</p>
          </div>

          <p className="mt-0.1 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>

          <div className="mt-6 flex justify-center">
            <Button 
              className="flex items-center justify-center rounded-md border 
              border-transparent px-6 py-3 text-base font-medium
              text-white shadow-xs bg-red-500 cursor-pointer"
              onClick={() => handlerPayment() }
            >
              Pagar
            </Button>
          </div>
          
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              o {' '}
              <Link href={ RouteNavigatorNavbar.home }  className="font-medium text-red-500 cursor-pointer">
                Continua Comprando
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <SnackbarAlert
        open={ showSnackbar }
        message="Articulos pagados, gracias por su compra, continue comprando..."
        severity="info"
        duration={ 4000 }
        onClose={() => setShowSnackbar(false) }
      />
    </>
    
  );
}
