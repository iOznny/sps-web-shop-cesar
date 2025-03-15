import { 
  IDashboardFilters,
  IDashboardSortOptions, 
} from "@Interfaces/IDashboard";
  
export const dashboardSortOptions: IDashboardSortOptions[] = [
  { name: 'Mejor calificación', href: '#', current: true },
  { name: 'Precio: Bajo a alto', href: '#', current: true },
  { name: 'Precio: Alto a bajo', href: '#', current: true },
];

export const dashboardFilters: IDashboardFilters[] = [
  {
    id: 'color',
    name: 'Colores',
    options: [
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Categorias',
    options: [
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Tallas',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '40l', label: '40L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
    ],
  },
];