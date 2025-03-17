export interface IDashboardSortOptions {
    value: string;
    name: string;
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