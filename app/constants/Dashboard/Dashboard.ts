import { 
  IDashboardFilters,
  IDashboardSortOptions, 
} from "@Interfaces/IDashboard";
  
export const dashboardSortOptions: IDashboardSortOptions[] = [
  { value: 'best-rating', name: 'Mejor calificación' },
  { value: 'low-to-high', name: 'Precio: Bajo a alto' },
  { value: 'high-to-low', name: 'Precio: Alto a bajo' },
];

export const dashboardFilters: IDashboardFilters[] = [
  {
    id: 'color',
    name: 'Colores',
    options: [
      { value: 'blue', label: 'Azul', checked: false },
      { value: 'white', label: 'Blanco', checked: false },
      { value: 'brown', label: 'Cafe', checked: false },
      { value: 'green', label: 'Verde', checked: false },
      { value: 'purple', label: 'Morado', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Tallas',
    options: [
      { value: 'SX', label: 'SM', checked: false },
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'G', label: 'G', checked: false },
    ],
  },
];