import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PaginatedData, Project } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projecten Lijst',
        href: '/projects',
    },
];

const destroy = (id: number) => {
    if (confirm('Are you sure?')) {
        router.delete(route('projects.destroy', { id }));
    }
};

export default function Index({ projects }: { projects: PaginatedData<Project> }) {
    const handleRowClick = (id: number) => {
        router.visit(route('projects.show', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="p-4">
                <TextLink href={route('projects.create')} className="mb-6 block" tabIndex={3}>
                    Maak Project
                </TextLink>

                <Table>
                    <TableCaption>Een lijst van projectem.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Titel</TableHead>
                            <TableHead>Opdrachtgever</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects &&
                            projects.data &&
                            projects.data
                                .sort((a: Project, b: Project) => (a.id > b.id ? 1 : -1))
                                .map((project: Project) => (
                                    <TableRow
                                        key={project.id}
                                        className="hover:bg-muted/50 cursor-pointer"
                                        onClick={() => handleRowClick(project.id)}
                                    >
                                        <TableCell className="font-medium">{project.id}</TableCell>
                                        <TableCell>{project.titel}</TableCell>
                                        <TableCell>{project.opdrachtgever}</TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <TextLink href={route('projects.edit', { id: project.id })} onClick={(e) => e.stopPropagation()}>
                                                Wijzig
                                            </TextLink>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    destroy(project.id);
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
