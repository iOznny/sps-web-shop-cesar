export interface IDashboardSortOptions {
    name: string;
    href: string;
    current: boolean;
}

export interface IDashboardFilters {
    id: string;
    name: string;
    options: IDashboardFilterOptions[];
}

export interface IDashboardFilterOptions {
    value: string;
    label: string;
    checked: boolean;
}