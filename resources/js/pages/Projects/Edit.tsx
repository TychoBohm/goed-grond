import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Position, Project } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ProjectForm {
    titel: string;
    opdrachtgever: string;
    locatie: Position;
    grond: Record<string, number>;
    toepassingen: string[];
    [key: string]: string | { lat: number, lng: number } | Record<string, number> | string[];
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
                            {data.locatie ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="lat">Breedtegraad</Label>
                                        <Input
                                            id="lat"
                                            type="number"
                                            step="0.000001"
                                            tabIndex={3}
                                            value={data.locatie.lat}
                                            onChange={(e) => setData('locatie', {...data.locatie, lat: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lng">Lengtegraad</Label>
                                        <Input
                                            id="lng"
                                            type="number"
                                            step="0.000001"
                                            tabIndex={4}
                                            value={data.locatie.lng}
                                            onChange={(e) => setData('locatie', {...data.locatie, lng: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Input id="location" type="text" disabled />
                                    <NotImplementedField />
                                </>
                            )}
                            <InputError message={errors.locatie} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ground">Grond Samenstelling</Label>
                            {data.grond ? (
                                <div className="space-y-4">
                                    {Object.entries(data.grond).map(([type, value], index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-1/3">
                                                <Input
                                                    id={`grond-type-${index}`}
                                                    type="text"
                                                    placeholder="Type grond"
                                                    value={type}
                                                    onChange={(e) => {
                                                        const newGrond = {...data.grond};
                                                        const oldValue = newGrond[type];
                                                        delete newGrond[type];
                                                        newGrond[e.target.value] = oldValue;
                                                        setData('grond', newGrond);
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    id={`grond-value-${index}`}
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={value as number}
                                                    onChange={(e) => {
                                                        const newGrond = {...data.grond};
                                                        newGrond[type] = parseInt(e.target.value);
                                                        setData('grond', newGrond);
                                                    }}
                                                />
                                            </div>
                                            <div className="w-16 text-left">%</div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    const newGrond = {...data.grond};
                                                    delete newGrond[type];
                                                    setData('grond', newGrond);
                                                }}
                                            >
                                                Verwijder
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const newGrond = {...data.grond};
                                            newGrond['Nieuw Type'] = 0;
                                            setData('grond', newGrond);
                                        }}
                                    >
                                        Voeg Type Toe
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Textarea id="ground" disabled />
                                    <NotImplementedField />
                                </>
                            )}
                            <InputError message={errors.grond} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="application">Toepassingen</Label>
                            {data.toepassingen ? (
                                <div className="space-y-4">
                                    {data.toepassingen.map((toepassing: string, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <Input
                                                    value={toepassing}
                                                    onChange={(e) => {
                                                        const newToepassingen = [...data.toepassingen];
                                                        newToepassingen[index] = e.target.value;
                                                        setData('toepassingen', newToepassingen);
                                                    }}
                                                />
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    const newToepassingen = [...data.toepassingen];
                                                    newToepassingen.splice(index, 1);
                                                    setData('toepassingen', newToepassingen);
                                                }}
                                            >
                                                Verwijder
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const newToepassingen = [...data.toepassingen];
                                            newToepassingen.push('');
                                            setData('toepassingen', newToepassingen);
                                        }}
                                    >
                                        Voeg Toepassing Toe
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Textarea id="application" disabled />
                                    <NotImplementedField />
                                </>
                            )}
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
