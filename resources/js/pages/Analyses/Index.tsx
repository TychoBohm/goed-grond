import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PaginatedData, Analysis } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analyses Lijst',
        href: '/analyses',
    },
];

const destroy = (id: number) => {
    if (confirm('Are you sure?')) {
        router.delete(route('analyses.destroy', { id }));
    }
};

export default function Index({ analyses }: { analyses: PaginatedData<Analysis> }) {

    const handleRowClick = (id: number) => {
        router.visit(route('analyses.show', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analyses" />

            <div className="p-4">
                <TextLink href={route('analyses.create')} className="mb-6 block" tabIndex={3}>
                    Maak Analyse
                </TextLink>

                <Table>
                    <TableCaption>Een lijst van analyses.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Methode</TableHead>
                            <TableHead>Resultaat</TableHead>
                            <TableHead>Datum</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {analyses &&
                            analyses.data &&
                            analyses.data
                                .sort((a: Analysis, b: Analysis) => (a.id > b.id ? 1 : -1))
                                .map((analysis: Analysis) => (
                                    <TableRow
                                        key={analysis.id}
                                        className="hover:bg-muted/50 cursor-pointer"
                                        onClick={() => handleRowClick(analysis.id)}
                                    >
                                        <TableCell className="font-medium">{analysis.id}</TableCell>
                                        <TableCell>{analysis.methode}</TableCell>
                                        <TableCell>{analysis.resultaat}</TableCell>
                                        <TableCell>{new Date(analysis.datum).toLocaleDateString('nl-NL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</TableCell>
                                        <TableCell>{analysis.project_name || 'N/A'}</TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <TextLink href={route('analyses.edit', { id: analysis.id })} onClick={(e) => e.stopPropagation()}>
                                                Wijzig
                                            </TextLink>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    destroy(analysis.id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
} 