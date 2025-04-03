import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Analysis, BreadcrumbItem, Project } from '@/types';
import { Head } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

export default function Show({ project }: { project: {data: Project} }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Projecten Lijst',
            href: route('projects.index'),
        },
        {
            title: 'Bekijk Project: ' + project.data.titel,
            href: route('projects.show', { project: project.data.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project: ${project.data.titel}`} />

            <div className="space-y-6 p-4">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold">{project.data.titel}</h2>
                            <p className="text-sm text-gray-500">Gemaakt op: {new Date(project.data.created_at).toLocaleDateString()}</p>
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Opdrachtgever</h3>
                            {project.data.opdrachtgever ? (
                                <p>{project.data.opdrachtgever}</p>
                            ) : (
                                <Alert variant="default">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Niet Beschikbaar</AlertTitle>
                                    <AlertDescription>Opdrachtgever informatie is nog niet geimplementeerd</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Locatie</h3>
                            {project.data.locatie ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <p>Latitude: {project.data.locatie.lat || 'Niet gespecificeerd'}</p>
                                    <p>Longitude: {project.data.locatie.lng || 'Not gespecificeerd'}</p>
                                </div>
                            ) : (
                                <Alert variant="default">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Niet Beschikbaar</AlertTitle>
                                    <AlertDescription>Locatie is nog niet geimplementeerd</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Analyses</h3>
                            {project.data.analyses && project.data.analyses.length > 0 ? (
                                <div className="space-y-4">
                                    {project.data.analyses.map((analysis: Analysis, index: number) => (
                                        <Card key={index} className="p-4">
                                            <h4 className="font-medium">Methode: {analysis.data.methode}</h4>
                                            <p className="text-sm text-gray-500">Gedaan op: {new Date(analysis.data.created_at).toLocaleDateString()}</p>

                                            <div className="mt-2">
                                                <h5 className="text-sm font-medium">Resultaten:</h5>
                                                {analysis.data.resultaten && analysis.data.resultaten.length > 0 ? (
                                                    <div className="mt-1 grid grid-cols-3 gap-2">
                                                        {analysis.data.resultaten.map((result: number, idx: number) => (
                                                            <Badge key={idx} variant="outline">
                                                                {result}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-500">Geen resultaten beschikbaar</p>
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Alert variant="default">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Niet Beschikbaar</AlertTitle>
                                    <AlertDescription>Analyse data is nog niet geimplementeerd</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Grond Samenstelling</h3>
                            {project.data.grond && Object.keys(project.data.grond).length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(project.data.grond).map(([type, value], index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{type}:</span>
                                            <span>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Alert variant="default">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Niet Beschikbaar</AlertTitle>
                                    <AlertDescription>Grond Samenstelling is nog niet geimplementeerd</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Toepassingen</h3>
                            {project.data.toepassingen && project.data.toepassingen.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {project.data.toepassingen.map((app: string, index: number) => (
                                        <Badge key={index}>{app}</Badge>
                                    ))}
                                </div>
                            ) : (
                                <Alert variant="default">
                                    <InfoIcon className="h-4 w-4" />
                                    <AlertTitle>Niet Beschikbaar</AlertTitle>
                                    <AlertDescription>Toepassingen data is nog niet geimplementeerd</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
