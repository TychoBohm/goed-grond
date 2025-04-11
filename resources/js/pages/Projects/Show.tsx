import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Analysis, BreadcrumbItem, Project } from '@/types';
import { Head, router } from '@inertiajs/react';
import { InfoIcon, PlusIcon } from 'lucide-react';

export default function Show({ project, analyses }: { project: {data: Project}, analyses: {data: Analysis[]} }) {

    console.log(analyses);
    console.log(project);
    
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
                                <div className="space-y-4">
                                    <div className="flex items-center justify-begin">
                                        <div className="text-center">
                                            <div className="text-xl font-medium">
                                                {project.data.locatie.lat?.toFixed(6) || 'Niet gespecificeerd'}° N
                                            </div>
                                            <div className="text-sm text-gray-500">Breedtegraad</div>
                                        </div>
                                        <div className="mx-6 h-12 w-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <div className="text-xl font-medium">
                                                {project.data.locatie.lng?.toFixed(6) || 'Niet gespecificeerd'}° O
                                            </div>
                                            <div className="text-sm text-gray-500">Lengtegraad</div>
                                        </div>
                                    </div>
                                    <div className="text-start text-sm text-gray-500">
                                        Coördinaten in decimale graden
                                    </div>
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
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">Analyses</h3>
                                <Button
                                    onClick={() => router.visit(route('analyses.create', { project_id: project.data.id }))}
                                    variant="outline"
                                    size="sm"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Analyse Toevoegen
                                </Button>
                            </div>
                            {analyses.data && analyses.data.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-4 gap-2">
                                    {analyses.data.map((analysis: Analysis, index: number) => (
                                        <Card 
                                            key={index}
                                            className="p-4 col-span-1 hover:bg-muted/50 cursor-pointer"
                                            onClick={() => router.visit(route('analyses.show', { analysis: analysis.id }))}
                                        >
                                            <h4 className="font-medium">Methode: {analysis.methode}</h4>
                                            <h3 className="font-medium">Resultaat: {analysis.resultaat}</h3>
                                            <p className="text-sm text-gray-500">Gedaan op: {new Date(analysis.datum).toLocaleDateString()}</p>
                                        </Card>
                                        ))}
                                    </div>
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
                                <div className="space-y-2">
                                    {Object.entries(project.data.grond).map(([type, value], index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-32 font-medium">{type}</div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 rounded-full">
                                                    <div 
                                                        className="h-full bg-primary rounded-full" 
                                                        style={{width: `${value}%`}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-16 text-right">{String(value)}%</div>
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
