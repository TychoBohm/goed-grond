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
    method: string;
    results: number[];
    project_id: number;
    datum: string;
    [key: string]: string | number | number[];
}

export default function Create({ projects }: { projects: Project[] }) {
    const { data, setData, post, processing, errors } = useForm<AnalysisForm>({
        method: '',
        results: [],
        project_id: 0,
        datum: new Date().toISOString().split('T')[0],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('analyses.store'));
    };

    const addResultItem = () => {
        setData('results', [...data.results, 0]);
    };

    const updateResultItem = (index: number, value: number) => {
        const newResults = [...data.results];
        newResults[index] = value;
        setData('results', newResults);
    };

    const removeResultItem = (index: number) => {
        setData(
            'results',
            data.results.filter((_, i) => i !== index),
        );
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
                                value={data.method}
                                onChange={(e) => setData('method', e.target.value)}
                            />
                            <InputError message={errors.method} />
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
                                {projects.map((project) => (
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
                            <Label>Resultaten</Label>
                            {data.results.map((result, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        type="number"
                                        step="any"
                                        placeholder="Resultaat"
                                        value={result}
                                        onChange={(e) => updateResultItem(index, parseFloat(e.target.value))}
                                    />
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeResultItem(index)}>
                                        Verwijder
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addResultItem}>
                                Voeg een resultaat toe
                            </Button>
                            <InputError message={errors.results} />
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