<?php

namespace App\Http\Controllers\Customer;

use App\Actions\AiMatch\RunAiMatch;
use App\Data\AiMatchRequestData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\AiMatchRequest;
use App\Models\AiMatchSession;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AiMatchController extends Controller
{
    public function start(AiMatchRequest $request, RunAiMatch $action): RedirectResponse
    {
        $data = AiMatchRequestData::from($request->validated());
        $session = $action->execute($request->user(), $data);

        return redirect()->route('customer.ai-match.results', $session->session_token)
            ->with('success', __('customer.ai_match_completed', ['count' => $session->results_count]));
    }

    public function results(AiMatchSession $session): Response
    {
        $this->authorize('view', $session);

        $session->load([
            'results' => fn ($q) => $q->orderBy('rank_position'),
            'results.product:id,name,slug,price,primary_color,primary_color_hex',
            'results.product.primaryImage',
            'results.product.vendor:id,store_name,slug,city',
            'eventType:id,name',
            'stylePreference:id,name',
        ]);

        return Inertia::render('Customer/AiMatch/Results', [
            'session' => $session,
        ]);
    }
}
