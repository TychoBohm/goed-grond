import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Analysis } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analyses Lijst',
        href: route('analyses.index'),
    },
    {
        title: 'Analyse Details',
        href: '#',
    },
];

export default function Show({ analysis }: { analysis: {data: Analysis} }) {
    const destroy = () => {
        if (confirm('Are you sure?')) {
            router.delete(route('analyses.destroy', { id: analysis.data.id }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analyse Details" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Analyse Details</h1>
                    <div className="space-x-2">
                        <TextLink href={route('analyses.edit', { id: analysis.data.id })}>Wijzig</TextLink>
                        <Button variant="destructive" size="sm" onClick={destroy}>
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Basis Informatie</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">ID</p>
                                <p>{analysis.data.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Project</p>
                                <TextLink href={route('projects.show', { id: analysis.data.project_id })}>
                                    {analysis.data.project_name}
                                </TextLink>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Datum</p>
                                <p>{new Date(analysis.data.datum).toLocaleDateString('nl-NL', { 
                                    year: 'numeric', 
                                    month: '2-digit', 
                                    day: '2-digit' 
                                })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold">Analyse Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Methode</p>
                                <p>{analysis.data.methode}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Resultaat</p>
                                <p>{analysis.data.resultaat}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 