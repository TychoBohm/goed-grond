<?php

namespace App\Http\Controllers;

use App\Models\Analyse;
use App\Http\Requests\StoreAnalyseRequest;
use App\Http\Requests\UpdateAnalyseRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Analyses/Index', [
            'analyses' => Analyse::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Analyses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnalyseRequest $request)
    {
        Analyse::create($request->validated());

        return to_route('analyses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Analyse $analyse)
    {
        return Inertia::render('Analyses/Show', [
            'analyse' => $analyse,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Analyse $analyse)
    {
        return Inertia::render('Analyses/Edit', [
            'analyse' => $analyse,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnalyseRequest $request, Analyse $analyse)
    {
        $analyse->update($request->validated());

        return to_route('analyses.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Analyse $analyse)
    {
        $analyse->delete();

        return to_route('analyses.index');
    }
}
