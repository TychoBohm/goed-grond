import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Project } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ProjectForm {
    titel: string;
    opdrachtgever: string;
    locatie: any; // Using any for now as Position type isn't fully defined
    grond: any; // Using any for now as List<string, number> type isn't fully defined
    toepassingen: any; // Using any for now as List<string> type isn't fully defined
}

export default function Edit({ project }: { project: Project }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Projecten Lijst',
            href: route('projects.index'),
        },
        {
            title: 'Wijzig Project: ' + project.data.titel,
            href: route('projects.edit', { project: project.data.id }),
        },
    ];

    const { data, setData, patch, processing, errors } = useForm<ProjectForm>({
        titel: project.data.titel,
        opdrachtgever: project.data.opdrachtgever,
        locatie: project.data.locatie,
        grond: project.data.grond,
        toepassingen: project.data.toepassingen,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('projects.update', { project: project.data.id }));
    };

    // Helper to show not implemented notice
    const NotImplementedField = () => (
        <div className="mt-1 flex items-center gap-2 text-sm text-yellow-600">
            <AlertCircle size={16} />
            <span>Dit veld is nog niet volledig geimplementeerd</span>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Project" />

            <div className="p-4">
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Titel</Label>
                            <Input
                                id="title"
                                type="text"
                                required
                                tabIndex={1}
                                value={data.titel}
                                onChange={(e) => setData('titel', e.target.value)}
                            />
                            <InputError message={errors.titel} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="opdrachtgever">Opdrachtgever</Label>
                            <Input
                                id="opdrachtgever"
                                type="text"
                                required
                                tabIndex={2}
                                value={data.opdrachtgever}
                                onChange={(e) => setData('opdrachtgever', e.target.value)}
                            />
                            <InputError message={errors.opdrachtgever} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Locatie</Label>
                            <Input id="location" type="text" tabIndex={3} disabled value={JSON.stringify(data.locatie)} />
                            <NotImplementedField />
                            <InputError message={errors.locatie} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ground">Grond Samenstelling</Label>
                            <Textarea id="ground" tabIndex={4} disabled value={JSON.stringify(data.grond)} />
                            <NotImplementedField />
                            <InputError message={errors.grond} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="application">Toepassingen</Label>
                            <Textarea id="application" tabIndex={5} disabled value={JSON.stringify(data.toepassingen)} />
                            <NotImplementedField />
                            <InputError message={errors.toepassingen} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button size="sm" disabled={processing} type="submit">
                            Save Project
                        </Button>
                        <span className="text-sm text-gray-500">Created at: {new Date(project.created_at).toLocaleDateString()}</span>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
