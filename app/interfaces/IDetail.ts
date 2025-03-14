export interface IDetailBreadcrumb {
    id: number;
    name: string;
    href: string;
}

export interface IDetailImages {
    src: string;
    alt: string;
}

export interface IDetailColors {
    name: string;
    class: string;
    selectedClass: string;
}

export interface IDetailSizes {
    name: string;
    inStock: boolean;
}

export interface IDetailProduct {
    name: string;
    price: string;
    href: string;
    breadcrumbs: IDetailBreadcrumb[];
    images: IDetailImages[];
    colors: IDetailColors[];
    sizes: IDetailSizes[];
    description: string;
    highlights: string[];
    details: string;
}

export interface IDetailProductReview {
    href: string;
    average: number;
    totalCount: number;
}