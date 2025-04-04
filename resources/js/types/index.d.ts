import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface PaginatedData<T> {
    data: T[];
    current_page?: number;
    from?: number;
    last_page?: number;
    per_page?: number;
    to?: number;
    total?: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Task {
    data?: {
        id: number;
        title: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Position {
    lat: number;
    lng: number;
}

export interface Project {
    data: {
        id: number;
        titel: string;
        opdrachtgever: string;
        locatie: Position;
        analyses: List<Analysis>;
        grond: Record<string, number>;
        toepassingen: List<string>;
        created_at: string;
    };
    id: number;
    titel: string;
    opdrachtgever: string;
    locatie: Position;
    analyses: List<Analysis>;
    grond: List<string, number>;
    toepassingen: List<string>;
    created_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Analysis {
    data?: {
        id: number;
        methode: string;
        resultaat: number;
        project_id: number;
        project_name: string;
        datum: string;
        created_at: string;
    };
    id: number;
    methode: string;
    resultaat: number;
    project_id: number;
    project_name: string;
    datum: string;
    created_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
