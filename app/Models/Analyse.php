<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analyse extends Model
{
    /** @use HasFactory<\Database\Factories\AnalyseFactory> */
    use HasFactory;
    protected $fillable = [
        'project_id',
        'method',
        'resultaat',
        'datum',
    ];
    
    // public function project()
    // {
    //     return $this->belongsTo(Project::class);
    // }
}
