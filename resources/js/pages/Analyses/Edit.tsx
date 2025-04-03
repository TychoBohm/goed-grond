import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Analysis, Project } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analyses Lijst',
        href: route('analyses.index'),
    },
    {
        title: 'Wijzig Analyse',
        href: '#',
    },
];

interface AnalysisForm {
    methode: string;
    resultaten: number[];
    project_id: number;
    datum: string;
    [key: string]: string | number | number[];
}

export default function Edit({ analysis, projects }: { analysis: {data: Analysis}; projects: {data: Project[]} }) {
    const { data, setData, put, processing, errors } = useForm<AnalysisForm>({
        methode: analysis.data.methode,
        resultaten: analysis.data.resultaten,
        project_id: analysis.data.project_id,
        datum: analysis.data.datum,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('analyses.update', { id: analysis.data.id }));
    };

    const addResultItem = () => {
        setData('resultaten', [...data.resultaten, 0]);
    };

    const updateResultItem = (index: number, value: number) => {
        const newResults = [...data.resultaten];
        newResults[index] = value;
        setData('resultaten', newResults);
    };

    const removeResultItem = (index: number) => {
        setData(
            'resultaten',
            data.resultaten.filter((_, i) => i !== index),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Analysis" />

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
                                value={analysis.data.methode}
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
                            <Label>Resultaten</Label>
                            {data.resultaten.map((result, index) => (
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
                            <InputError message={errors.resultaten} />
                        </div>
                    </div>

                    <Button size="sm" disabled={processing}>
                        Update Analysis
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
} 