import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Analysis, Project, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function LatestProjects({ projects }: { projects: { data: Project[] } }) {
    const handleProjectClick = (id: number) => {
        router.visit(route('projects.show', { id }));
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[87.5vh] overflow-hidden rounded-xl border">
            <div className="flex size-full flex-col items-center justify-between gap-4 p-4">
                <TableCaption>Een lijst van de laatste 10 projecten.</TableCaption>
                {projects && projects.data && projects.data.length > 0 ? (
                    <Table className="w-full">
                        <TableHeader>
                        <TableRow>
                            <TableHead>Titel</TableHead>
                            <TableHead>Opdrachtgever</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.data &&
                            projects.data.length > 0 &&
                            projects.data
                                .sort((a: Project, b: Project) => (a.id > b.id ? 1 : -1))
                                .map((project: Project) => (
                                    <TableRow
                                        key={project.id}
                                        className="hover:bg-muted/50 cursor-pointer"
                                        onClick={() => handleProjectClick(project.id)}
                                    >
                                        <TableCell>{project.titel}</TableCell>
                                        <TableCell>{project.opdrachtgever}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex items-center justify-center p-4">
                        <p className="text-lg text-gray-500">Geen projecten beschikbaar</p>
                    </div>
                )}
                <Link href="/projects" className="mb-6 block" tabIndex={3}>
                    Bekijk alle projecten
                </Link>
            </div>
        </div>
    );
}

function LatestAnalysis({ analyses }: { analyses: { data: Analysis[] } }) {
    const handleAnalysisClick = (id: number) => {
        router.visit(route('analyses.show', { id }));
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[87.5vh] overflow-hidden rounded-xl border">
            <div className="flex size-full flex-col items-center justify-between gap-4 p-4">
                <TableCaption>Een lijst van de laatste 20 analyses.</TableCaption>
                {analyses && analyses.data.length > 0 ? (
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Datum</TableHead>
                                <TableHead>Analyse</TableHead>
                                <TableHead>Project</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {analyses.data &&
                                analyses.data.length > 0 &&
                                analyses.data
                                    .sort((a: Analysis, b: Analysis) => (a.id > b.id ? 1 : -1))
                                    .map((analysis: Analysis) => (
                                        <TableRow
                                            key={analysis.id}
                                            className="hover:bg-muted/50 cursor-pointer"
                                            onClick={() => handleAnalysisClick(analysis.id)}
                                        >
                                            <TableCell>{new Date(analysis.datum).toLocaleDateString()}</TableCell>
                                            <TableCell>{analysis.methode}</TableCell>
                                            <TableCell>{analysis.project_name}</TableCell>
                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex items-center justify-center p-4">
                        <p className="text-lg text-gray-500">Geen analyses beschikbaar</p>
                    </div>
                )}
                <Link href="/analyses" className="mb-6 block" tabIndex={3}>
                    Bekijk alle analyses
                </Link>
            </div>
        </div>
    );
}

export default function Dashboard({ projects, analyses }: { projects: { data: Project[] }; analyses: { data: Analysis[] } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <LatestProjects projects={projects} />
                    <LatestAnalysis analyses={analyses} />
                </div>
            </div>
        </AppLayout>
    );
}
