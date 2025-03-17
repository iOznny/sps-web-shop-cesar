import { 
  IDashboardFilters,
  IDashboardSortOptions, 
} from "@Interfaces/IDashboard";
  
export const dashboardSortOptions: IDashboardSortOptions[] = [
  { value: 'best-rating', name: 'Mejor Calificación' },
  { value: 'low-to-high', name: 'Precio: Bajo a Alto' },
  { value: 'high-to-low', name: 'Precio: Alto a Bajo' },
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
  {
    id: 'gender',
    name: 'Género',
    options: [
      { value: 'H', label: 'Hombres', checked: false },
      { value: 'M', label: 'Mujeres', checked: false },
      { value: 'NN', label: 'Niños', checked: false },
      { value: 'NA', label: 'Niñas', checked: false },
      { value: 'BB', label: 'Bebes', checked: false },
      { value: 'UX', label: 'Unisex', checked: false },
    ],
  },
  {
    id: 'brands',
    name: 'Marcas',
    options: [
      { value: 'LA', label: 'Lacoste', checked: false },
      { value: 'NK', label: 'Nike', checked: false },
      { value: 'CL', label: 'Columba', checked: false },
      { value: 'NF', label: 'The North Face', checked: false },
      { value: 'PM', label: 'Puma', checked: false },
      { value: 'CH', label: 'Channel', checked: false },
    ],
  },
  {
    id: 'sesion',
    name: 'Temporada de Moda',
    options: [
      { value: 'OI', label: 'Otoño-Invirno', checked: false },
      { value: 'PV', label: 'Primavera-Verano', checked: false },
    ],
  },
  {
    id: 'new',
    name: 'Lo más nuevo',
    options: [
      { value: '30', label: 'Últimos 30 Días', checked: false },
      { value: '90', label: 'Últimos 90 Días', checked: false },
    ],
  },
];