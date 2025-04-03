import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects List',
        href: route('projects.index'),
    },
    {
        title: 'Create Project',
        href: route('projects.create'),
    },
];

interface ProjectForm {
    titel: string;
    opdrachtgever: string;
    locatie: { lat: number; lng: number };
    grond: Record<string, number>;
    toepassingen: string[];
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<ProjectForm>({
        titel: '',
        opdrachtgever: '',
        locatie: {} as { lat: number; lng: number },
        grond: {},
        toepassingen: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    const addApplicationItem = () => {
        setData('toepassingen', [...data.toepassingen, '']);
    };

    const updateApplicationItem = (index: number, value: string) => {
        const newApplication = [...data.toepassingen];
        newApplication[index] = value;
        setData('toepassingen', newApplication);
    };

    const removeApplicationItem = (index: number) => {
        setData(
            'toepassingen',
            data.toepassingen.filter((_, i) => i !== index),
        );
    };

    const addGroundItem = () => {
        setData('grond', { ...data.grond, '': 0 });
    };

    const updateGroundItem = (key: string, newKey: string, value: number) => {
        const newGround = { ...data.grond };
        delete newGround[key];
        newGround[newKey] = value;
        setData('grond', newGround);
    };

    const removeGroundItem = (key: string) => {
        const newGround = { ...data.grond };
        delete newGround[key];
        setData('grond', newGround);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />

            <div className="p-4">
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="titel">Titel</Label>
                            <Input
                                id="titel"
                                type="text"
                                required
                                autoFocus
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
                            <Label>Locatie</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    placeholder="Latitude"
                                    type="number"
                                    step="any"
                                    value={data.locatie.lat || ''}
                                    onChange={(e) => setData('locatie', { ...data.locatie, lat: parseFloat(e.target.value) })}
                                />
                                <Input
                                    placeholder="Longitude"
                                    type="number"
                                    step="any"
                                    value={data.locatie.lng || ''}
                                    onChange={(e) => setData('locatie', { ...data.locatie, lng: parseFloat(e.target.value) })}
                                />
                            </div>
                            <InputError message={errors.locatie} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Grond Samenstelling</Label>
                            {Object.entries(data.grond).map(([key, value], index) => (
                                <div key={index} className="flex gap-2">
                                    <Input placeholder="Type" value={key} onChange={(e) => updateGroundItem(key, e.target.value, value)} />
                                    <Input
                                        type="number"
                                        placeholder="Percentage"
                                        value={value}
                                        onChange={(e) => updateGroundItem(key, key, parseInt(e.target.value))}
                                    />
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeGroundItem(key)}>
                                        Verwijder
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addGroundItem}>
                                Voeg een grondsoort toe
                            </Button>
                            <InputError message={errors.grond} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Toepassingen</Label>
                            {data.toepassingen.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input placeholder="Application" value={item} onChange={(e) => updateApplicationItem(index, e.target.value)} />
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeApplicationItem(index)}>
                                        Verwijder
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addApplicationItem}>
                                Voeg een toepassing toe
                            </Button>
                            <InputError message={errors.toepassingen} />
                        </div>
                    </div>

                    <Button size="sm" disabled={processing}>
                        Create Project
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
