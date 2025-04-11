import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Project } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analyses Lijst',
        href: route('analyses.index'),
    },
    {
        title: 'Maak Analyse',
        href: route('analyses.create'),
    },
];

interface AnalysisForm {
    methode: string;
    resultaat: number;
    project_id: number;
    datum: string;
    [key: string]: string | number;
}

export default function Create({ projects, project_id }: { projects: {data: Project[]}, project_id?: number }) {
    const { data, setData, post, processing, errors } = useForm<AnalysisForm>({
        methode: '',
        resultaat: 0,
        project_id: project_id || 0,
        datum: new Date().toISOString().split('T')[0],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('analyses.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Analysis" />

            <div className="p-4">
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="method">Methode</Label>
                            <Input
                                id="method"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.methode}
                                onChange={(e) => setData('methode', e.target.value)}
                            />
                            <InputError message={errors.methode} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="project_id">Project</Label>
                            <select
                                id="project_id"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                value={data.project_id}
                                onChange={(e) => setData('project_id', parseInt(e.target.value))}
                            >
                                <option value="">Selecteer een project</option>
                                {projects.data.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.titel}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.project_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="datum">Datum</Label>
                            <Input
                                id="datum"
                                type="date"
                                required
                                value={data.datum}
                                onChange={(e) => setData('datum', e.target.value)}
                            />
                            <InputError message={errors.datum} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="resultaat">Resultaat</Label>
                            <Input
                                id="resultaat"
                                type="number"
                                step="any"
                                required
                                value={data.resultaat}
                                onChange={(e) => setData('resultaat', parseFloat(e.target.value))}
                            />
                            <InputError message={errors.resultaat} />
                        </div>
                    </div>

                    <Button size="sm" disabled={processing}>
                        Create Analysis
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}